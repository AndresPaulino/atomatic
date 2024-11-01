import LayoutProvider from "@/providers/layout.provider";
import LayoutContentProvider from "@/providers/content.provider";
import Sidebar from '@/components/partials/sidebar'
import Footer from '@/components/partials/footer'
import Header from '@/components/partials/header'
const layout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <LayoutProvider >
            <Header />
            <Sidebar />
            <LayoutContentProvider>
                {children}
            </LayoutContentProvider>
            <Footer />
        </LayoutProvider>
    )


};

export default layout;
