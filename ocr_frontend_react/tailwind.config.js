/** @type {import('tailwindcss').Config}
 *
 * npx tailwindcss -i ./src/css/index.css -o ./src/css/output.css --watch
 *
 * */
module.exports = {
  content: [
      //Root
    "./src/pages/ErrorPage.jsx",
    "./src/pages/Root.jsx",

      //Utils
    "./src/pages/utils/Toolbar.jsx",
    "./src/pages/utils/MainSection.jsx",

      //Receipts
    "./src/pages/receipts/Receipt.jsx",
    "./src/pages/receipts/EditableReceipt.jsx",
    "./src/pages/receipts/ReceiptsPage.jsx",
    "./src/pages/receipts/SingleReceiptPage.jsx",
    "./src/pages/receipts/AddReceipt.jsx",
    "./src/pages/receipts/UpdateReceipt.jsx",
    "./src/pages/receipts/DeleteReceipt.jsx",


      //Items
    "./src/pages/receipts/items/Item.jsx",
    "./src/pages/receipts/items/EditableItem.jsx",
    "./src/pages/receipts/items/AddItem.jsx",
    "./src/pages/receipts/items/UpdateItemPage.jsx",
    "./src/pages/receipts/items/DeleteItemPage.jsx",

      //Image
    "./src/pages/receipts/image/UploadImage.jsx",
    "./src/pages/receipts/image/ReceiptFromImage.jsx",


  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

