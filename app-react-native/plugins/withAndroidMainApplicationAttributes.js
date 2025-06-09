const { withAndroidManifest } = require("@expo/config-plugins");

function addAttributesToMainApplication(androidManifest, attributes) {
  const { manifest } = androidManifest;

  if (!Array.isArray(manifest["application"])) {
    console.warn(
      "withAndroidMainApplicationAttributes: No application array in manifest?"
    );
    return androidManifest;
  }

  const application = manifest["application"].find(
    (item) => item.$["android:name"] === ".MainApplication"
  );
  if (!application) {
    console.warn("withAndroidMainApplicationAttributes: No .MainApplication?");
    return androidManifest;
  }

  if (!Array.isArray(application["activity"])) {
    console.warn(
      "withAndroidMainApplicationAttributes: No activity array in .MainApplication?"
    );
    return androidManifest;
  }

  application.$ = { ...application.$, ...attributes };
  //   const activity = application["activity"].find(
  //     (item) => item.$["android:name"] === ".MainActivity"
  //   );
  //   if (!activity) {
  //     console.warn("withAndroidMainApplicationAttributes: No .MainActivity?");
  //     return androidManifest;
  //   }

  //   activity.$ = { ...activity.$, ...attributes };

  return androidManifest;
}

module.exports = function withAndroidMainApplicationAttributes(
  config,
  attributes
) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addAttributesToMainApplication(
      config.modResults,
      attributes
    );
    return config;
  });
};
