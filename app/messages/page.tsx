import Navbar from "@/components/Navbar";

const messages = [
  ["tenant", "Hello, is the Lekki apartment still available?"],
  ["landlord", "Yes, it is available. You can inspect tomorrow from 11am."],
  ["tenant", "Great. Please confirm if there are any agent fees."],
  ["landlord", "No agent fees. You are speaking directly with the landlord."],
];

export default function MessagesPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-[#111827]">Messages</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Property-linked tenant and landlord conversations.
        </p>

        <section className="mt-8 grid min-h-[620px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:grid-cols-[320px_1fr]">
          <aside className="border-b border-gray-200 lg:border-b-0 lg:border-r">
            <div className="border-b border-gray-200 p-4">
              <p className="text-sm font-black text-gray-500">Conversations</p>
            </div>
            <button className="w-full bg-green-50 p-4 text-left">
              <p className="font-black text-[#111827]">Lekki 2 Bedroom Apartment</p>
              <p className="mt-1 text-sm text-gray-600">Tola Adeyemi</p>
            </button>
            <button className="w-full border-t border-gray-100 p-4 text-left">
              <p className="font-black text-[#111827]">Yaba Mini Flat</p>
              <p className="mt-1 text-sm text-gray-600">Musa Ibrahim</p>
            </button>
          </aside>

          <div className="flex flex-col">
            <div className="border-b border-gray-200 p-4">
              <p className="font-black text-[#111827]">Lekki 2 Bedroom Apartment</p>
              <p className="text-sm text-gray-600">Direct chat with landlord</p>
            </div>
            <div className="flex-1 space-y-4 bg-[#F9FAFB] p-5">
              {messages.map(([sender, text]) => (
                <div
                  key={text}
                  className={`flex ${sender === "tenant" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[75%] rounded-lg px-4 py-3 text-sm leading-6 ${
                      sender === "tenant"
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-gray-700 shadow-sm"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <form className="flex gap-3 border-t border-gray-200 p-4">
              <input
                placeholder="Type your message"
                className="min-h-12 flex-1 rounded-md border border-gray-200 px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
              <button className="rounded-md bg-[#16A34A] px-5 text-sm font-black text-white hover:bg-green-700">
                Send
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
