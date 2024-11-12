import LayoutProvider from '@/providers/layout.provider';
import LayoutContentProvider from '@/providers/content.provider';
import Sidebar from '@/components/partials/sidebar';
import Footer from '@/components/partials/footer';
import Header from '@/components/partials/header';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <LayoutProvider>
        <Header />
        <Sidebar />
        <LayoutContentProvider>{children}</LayoutContentProvider>
        <Footer />
      </LayoutProvider>
    </ProtectedRoute>
  );
}
