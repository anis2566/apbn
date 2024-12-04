"use client"

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button"

export const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: "/scout"
        });
    };

    return (
        <Button variant="default" onClick={handleSignOut}>
            Dashboard
        </Button>
    )
}