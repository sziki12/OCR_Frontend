import MainToolbar from "./Toolbar";
import React from "react";
import LoginHandler from  "../../handlers/LoginHandler"

export default function MainSection({children}) {
    return (
        <main>
            <MainToolbar/>
            <div className="p-24">
                {children}
            </div>
        </main>
    )
}