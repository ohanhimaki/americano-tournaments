const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    tailwindcss("./src/tailwindcss/tailwind.css"),
    require("postcss-import"),
    require("autoprefixer")
  ]
};
