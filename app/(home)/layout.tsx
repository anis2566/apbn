import { Notice } from "./_components/notice";
import { Header } from "./_components/header";
import { Navbar } from "./_components/navbar";
import { FloatingNav } from "@/components/aceternity/floating-navbar";
import { Footer } from "./_components/footer";

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