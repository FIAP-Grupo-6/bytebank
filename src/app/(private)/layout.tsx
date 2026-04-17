import { Header } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-15 md:px-6 md:py-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
