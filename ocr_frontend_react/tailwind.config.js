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
    "./src/pages/receipts/SingleReceiptPage.jsx",
    "./src/pages/receipts/AddReceipt.jsx",
    "./src/pages/receipts/ReceiptsPage.jsx",

      //Items
    "./src/pages/receipts/items/Item.jsx",
    "./src/pages/receipts/items/AddItem.jsx",


  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

