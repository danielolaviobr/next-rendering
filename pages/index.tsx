import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <Link href="/CSR">
          <a>
            <div className="px-6 py-1 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow">
              CSR
            </div>
          </a>
        </Link>
        <Link href="/SSR">
          <a>
            <div className="px-6 py-1 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow">
              SSR
            </div>
          </a>
        </Link>
        <Link href="/SSG">
          <a>
            <div className="px-6 py-1 mb-4 text-lg font-bold text-white bg-blue-500 rounded shadow">
              SSG
            </div>
          </a>
        </Link>
      </div>
    </main>
  );
}
