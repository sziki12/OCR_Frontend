/** @type {import('tailwindcss').Config}
 *
 * npx tailwindcss -i ./src/css/index.css -o ./src/css/output.css --watch
 *
 * */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

