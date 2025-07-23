"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-header shadow-sm bg-neutral-100">
      <div className="mx-auto max-w-screen-xl px-6 flex items-center justify-between h-16">
        <h1 className="text-xl font-bold text-zinc-900">
          <Link href="/">Car Catalog </Link>
        </h1>
      </div>
    </header>
  );
}