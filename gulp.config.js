var pkg = require("./package.json");

module.exports = {
  jsFileName: "mo.js",
  cssFileName: "mo.css",
  dist: "dist",

  //js-home-file
  jsFiles: [
      "node_modules/fullpage.js/vendors/scrolloverflow.min.js",
      "node_modules/fullpage.js/dist/fullpage.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      "node_modules/sweetalert2/dist/sweetalert2.all.js",
      "assets/js/**/*.js",
      
  ],

  //sass-home-file
  sassFiles: ["assets/sass/main.scss"],

  // html files
  htmlFiles: ["./*.html"],
  allSassFiles: ["./**/*.scss"],

  versionData: {
    version: pkg.version
  }
};
