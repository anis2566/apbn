import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <img
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
            />
        </Link>
    )
}