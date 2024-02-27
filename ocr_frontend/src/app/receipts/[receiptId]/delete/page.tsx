'use client'
import MainSection from "@/data_types/MainSection";

import AddReceipt from "@/app/receipts/AddReceipt";
import * as React from "react";
import {useRouter} from "next/navigation";

export default function DeleteReceiptPage() {

    const router = useRouter()

    router.push("/receipts")
    router.refresh()
}