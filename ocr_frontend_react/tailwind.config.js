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

    //Components

          //Utils
          "./src/components/utils/Toolbar.jsx",
          "./src/components/utils/MainSection.jsx",

          //AllReceipts
          "./src/components/receipts/AllReceipts.jsx",
          "./src/components/receipts/SingleReceipt.jsx",

          //Items
          "./src/components/items/Item.jsx",
          "./src/components/items/EditableItem.jsx",

          //Map
          "./src/components/maps/GoogleMap.jsx",

          //Avatar
          "./src/components/avatars/ProfileAvatar.jsx",

    //Pages

        //AllReceipts
        "./src/pages/receipts/ReceiptsPage.jsx",
        "./src/pages/receipts/SingleReceiptPage.jsx",
        "./src/pages/receipts/AddReceipt.jsx",
        "./src/pages/receipts/DeleteReceipt.jsx",
        "./src/pages/receipts/ItemDataGrid.jsx",


        //Items
        "./src/pages/receipts/items/AddItem.jsx",
        "./src/pages/receipts/items/DeleteItemPage.jsx",

        //Image
        "./src/pages/image/UploadImage.jsx",
        "./src/pages/image/ReceiptFromImage.jsx",

        //Auth
        "./src/pages/auth/LoginPage.jsx"


  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

