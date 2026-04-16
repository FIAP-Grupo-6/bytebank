'use client';

import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-sidebar-background w-screen p-3 md:hidden flex items-center">
      <button className="flex items-center gap-2 cursor-pointer">
        <Menu />
      </button>
      <span className="text-white text-lg font-bold ml-auto">ByteBank</span>
    </header>
  );
}
