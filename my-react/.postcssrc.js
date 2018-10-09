module.exports = {
  "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      "autoprefixer": {},
      "postcss-px2rem-exclude": {
          baseDpr: 2,             // base device pixel ratio (default: 2)
          threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
          remVersion: true,       // whether to generate rem version (default: true)
          remUnit: 75,            // rem unit value (default: 75)
          remPrecision: 6,         // rem precision (default: 6)
          exclude: /node_modules|static/i
      }
  }
}