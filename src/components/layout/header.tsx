import Link from 'next/link';
import { SidebarTrigger } from '../ui/sidebar';
import { Logo } from './logo';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 p-4 border-b md:hidden bg-background">
      <SidebarTrigger className="cursor-pointer" />
      <Link href="/dashboard" aria-label="Home">
        <Logo />
      </Link>
    </header>
  );
}
