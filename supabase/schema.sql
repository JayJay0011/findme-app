create type public.user_role as enum ('tenant', 'landlord', 'admin');
create type public.listing_status as enum ('pending', 'approved', 'rejected');
create type public.verification_status as enum ('pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'tenant',
  created_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  price numeric(12, 2) not null check (price >= 0),
  location text not null,
  property_type text not null,
  description text not null,
  status public.listing_status not null default 'pending',
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  sort_order integer not null default 0
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid not null references public.profiles(id) on delete cascade,
  landlord_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (property_id, tenant_id, landlord_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.landlord_verifications (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid not null references public.profiles(id) on delete cascade,
  document_path text,
  status public.verification_status not null default 'pending',
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  property_id uuid references public.properties(id) on delete set null,
  reason text not null,
  created_at timestamptz not null default now()
);

create index properties_status_location_price_idx on public.properties (status, location, price);
create index properties_landlord_id_idx on public.properties (landlord_id);
create index property_images_property_id_idx on public.property_images (property_id);
create index conversations_tenant_id_idx on public.conversations (tenant_id);
create index conversations_landlord_id_idx on public.conversations (landlord_id);
create index messages_conversation_id_created_at_idx on public.messages (conversation_id, created_at);
create index landlord_verifications_landlord_id_idx on public.landlord_verifications (landlord_id);
create index reports_reporter_id_idx on public.reports (reporter_id);
create index reports_property_id_idx on public.reports (property_id);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.landlord_verifications enable row level security;
alter table public.reports enable row level security;

create policy profiles_read_own_or_admin on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy properties_read_approved on public.properties
  for select to authenticated, anon
  using (status = 'approved' or landlord_id = auth.uid() or public.is_admin());

create policy properties_landlord_insert on public.properties
  for insert to authenticated
  with check (landlord_id = auth.uid());

create policy properties_landlord_update_pending on public.properties
  for update to authenticated
  using (landlord_id = auth.uid() or public.is_admin())
  with check (landlord_id = auth.uid() or public.is_admin());

create policy property_images_read_approved on public.property_images
  for select to authenticated, anon
  using (
    exists (
      select 1 from public.properties
      where properties.id = property_images.property_id
        and (properties.status = 'approved' or properties.landlord_id = auth.uid() or public.is_admin())
    )
  );

create policy conversations_participants on public.conversations
  for all to authenticated
  using (tenant_id = auth.uid() or landlord_id = auth.uid() or public.is_admin())
  with check (tenant_id = auth.uid() or landlord_id = auth.uid() or public.is_admin());

create policy messages_participants on public.messages
  for all to authenticated
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and (conversations.tenant_id = auth.uid() or conversations.landlord_id = auth.uid() or public.is_admin())
    )
  )
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and (conversations.tenant_id = auth.uid() or conversations.landlord_id = auth.uid() or public.is_admin())
    )
  );

create policy landlord_verifications_owner_admin on public.landlord_verifications
  for all to authenticated
  using (landlord_id = auth.uid() or public.is_admin())
  with check (landlord_id = auth.uid() or public.is_admin());

create policy reports_insert_own on public.reports
  for insert to authenticated
  with check (reporter_id = auth.uid());

create policy reports_admin_read on public.reports
  for select to authenticated
  using (public.is_admin());
