import MainToolbar from "./Toolbar";
import React from "react";

export default function MainSection({children}) {
    return (
        <main>
            <MainToolbar/>
            <div className="p-10">
                {children}
            </div>
        </main>
    )
}