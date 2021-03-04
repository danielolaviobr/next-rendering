import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="mb-8 text-2xl font-bold">Renderizações no Next.js</h1>
      <div className="flex flex-col items-center">
        <Link href="/CSR">
          <a>
            <div className="px-6 py-1 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600">
              CSR
            </div>
          </a>
        </Link>
        <Link href="/SSR">
          <a>
            <div className="px-6 py-1 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600">
              SSR
            </div>
          </a>
        </Link>
        <Link href="/SSG">
          <a>
            <div className="px-6 py-1 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600">
              SSG
            </div>
          </a>
        </Link>
      </div>
    </main>
  );
}
