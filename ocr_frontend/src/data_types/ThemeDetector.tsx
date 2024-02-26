import {useEffect, useState} from "react";

function isDarkTheme()
{
    return window.matchMedia("(prefers-color-scheme: dark)");
}