/** @type {import('tailwindcss').Config}
 *
 * npx tailwindcss -i ./src/css/index.css -o ./src/css/output.css --watch
 *
 * */
module.exports = {
  content: [
    "./src/pages/ErrorPage.jsx",
    "./src/pages/Root.jsx",

    "./src/pages/utils/Toolbar.jsx",
    "./src/pages/utils/MainSection.jsx",

    "./src/pages/receipts/ReceiptsPage.jsx",
    "./src/pages/receipts/AddReceipt.jsx",
    "./src/pages/receipts/ReceiptsPage.jsx",

    "./src/pages/receipts/items/AddItem.jsx",


  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

