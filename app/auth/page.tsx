"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [message, setMessage] = useState("");
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  async function handleSubmit(formData: FormData) {
    setMessage("");

    if (!supabase) {
      setMessage("Supabase env keys are missing. Add them before live auth.");
      return;
    }

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { role },
            },
          });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(mode === "login" ? "Logged in successfully." : "Account created. Check your email if confirmation is enabled.");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <section className="flex flex-col justify-center">
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-[#111827]">
            One FindMe account for tenants, landlords, and future products.
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-gray-600">
            The role selected here becomes the base access layer for apartment
            listings now and future FindMe product lines later.
          </p>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 rounded-md bg-gray-100 p-1">
            {(["register", "login"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-md px-3 py-2 text-sm font-black capitalize ${
                  mode === item ? "bg-white text-[#111827] shadow-sm" : "text-gray-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form action={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" ? (
              <div>
                <label className="text-sm font-black text-gray-800">Role</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["tenant", "landlord"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRole(item)}
                      className={`rounded-md border px-3 py-3 text-sm font-black capitalize ${
                        role === item
                          ? "border-[#16A34A] bg-green-50 text-[#16A34A]"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <label className="text-sm font-black text-gray-800" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-sm font-black text-gray-800" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2.5 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button className="w-full rounded-md bg-[#16A34A] px-4 py-3 text-sm font-black text-white hover:bg-green-700">
              {mode === "login" ? "Login" : "Create Account"}
            </button>
            {message ? (
              <p className="rounded-md bg-blue-50 px-3 py-2 text-sm font-bold text-[#2563EB]">
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </main>
    </>
  );
}
