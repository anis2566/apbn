import { FloatingNav } from "@/components/aceternity/floating-navbar";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Navbar } from "@/components/home/navbar";
import { Notice } from "@/components/home/notice";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative">
            <Notice />
            <Header />
            <Navbar />
            <FloatingNav />
            {children}
            <Footer />
        </main>
    )
}

export default HomeLayout;