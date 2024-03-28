import MainToolbar from "./Toolbar";
import React from "react";
import MainHandler from "../handlers/MainHandler";

export default function MainSection({children}) {
    return (
        <MainHandler>
            <main>
                <MainToolbar/>
                <div className="p-24">
                    {children}
                </div>
            </main>
        </MainHandler>)
}