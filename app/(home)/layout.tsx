import { FloatingNav } from "@/components/aceternity/floating-navbar";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Navbar } from "@/components/home/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative">
            <Header />
            <Navbar />
            <FloatingNav />
            {children}
            <Footer />
        </main>
    )
}

export default HomeLayout;