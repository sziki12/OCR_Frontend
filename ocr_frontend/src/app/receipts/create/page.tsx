import MainSection from "@/data_types/MainSection";

import AddReceipt from "@/app/receipts/AddReceipt";
import * as React from "react";

export default async function AddReceiptPage() {

    return (
        <MainSection>
            <p>Add Receipt</p>
            <AddReceipt/>
        </MainSection>
    );
}