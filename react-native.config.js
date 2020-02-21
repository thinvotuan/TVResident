module.exports = {
  project: {
    ios: {},
    android: {
      "sourceDir": "./android/app/src",
    }, // grouped into "project"
  },
  dependency: {
    platforms: {
      android: null, // disable Android platform, other platforms will still autolink if provided
    },
  },
  //dependencies: {
  //  '<dependency>': {
  //    platforms: {
  //      android: null, // disable Android platform, other platforms will still autolink
  //    },
  //  },
  //},
  assets: ["./assets/fonts/"], // stays the same
};
