import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import PageLoader from '@/components/common/PageLoader';
import { Menu, X } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-sidebar border-b border-sidebar-border sticky top-0 z-40 w-full shrink-0">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-foreground hover:text-primary transition-colors p-1"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-foreground text-sm tracking-wide">VendorVerse</span>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
          A
        </div>
      </div>

      {/* Sidebar Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive overlay */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Close menu button on mobile sidebar overlay */}
      {isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed top-6 right-6 z-50 p-2 rounded-full bg-sidebar-border/30 text-foreground hover:text-destructive transition-colors shadow"
          aria-label="Close sidebar menu"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen w-full transition-all duration-300 md:pl-64 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
