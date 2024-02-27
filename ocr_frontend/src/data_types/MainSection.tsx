import MainToolbar from "@/data_types/Toolbar";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from "react";

export default function MainSection({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <MainToolbar/>
            <div className="p-24">
                {children}
            </div>
        </main>)
}