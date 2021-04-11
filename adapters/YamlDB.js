const { isObject, setObject, getObject, deleteObject } = require("../src/util");
let fs, YAML;

module.exports = class {
  constructor(options) {
    if (!isObject(options)) throw new TypeError("\"options\" parameter must be Object.");
    if (!options.hasOwnProperty("databaseName")) throw new TypeError("\"options\" parameter must have \"databaseName\" prototype.");
    if (!options.hasOwnProperty("databaseFolder")) throw new TypeError("\"options\" parameter must have \"databaseFolder\" prototype.");
    if (typeof options.databaseName !== "string") throw new TypeError("\"databaseName\" prototype in \"options\" parameter must be String.");
    if (typeof options.databaseFolder !== "string") throw new TypeError("\"databaseFolder\" prototype in \"options\" parameter must be String.");

    if (options.hasOwnProperty("ignoreWarns") && (typeof options.ignoreWarns !== "boolean")) throw new TypeError("\"ignoreWarns\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("autoFile") && (typeof options.autoFile !== "boolean")) throw new TypeError("\"autoFile\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("deletingBlankData") && (typeof options.deletingBlankData !== "boolean")) throw new TypeError("\"deletingBlankData\" prototype in \"options\" parameter must be Boolean.");

    this.databaseName = options.databaseName;
    this.databaseFolder = options.databaseFolder;
    this.seperator = options.seperator || ".";
    this.ignoreWarns = ((typeof options.ignoreWarns != "undefined") ? options.ignoreWarns : false);
    this.autoFile = ((typeof options.autoFile != "undefined") ? options.autoFile : true);
    this.deletingBlankData = ((typeof options.deletingBlankData != "undefined") ? options.deletingBlankData : false);

    try {
      fs = require("graceful-fs");
    } catch (error) {
      if (!this.ignoreWarns) console.warn("\"graceful-fs\" better than \"fs\". You can install this.");
      fs = require("fs");
    }

    try {
      YAML = require("yaml");
    } catch (error) {
      throw new TypeError("You must install \"yaml\".")
    }

    if (this.autoFile == true) {
      if (fs.existsSync(`./${this.databaseFolder}/${this.databaseName}.yaml`) == false) {
        if (fs.existsSync(`/${this.databaseFolder}`) == false) {
          fs.mkdirSync(`./${this.databaseFolder}`);
        }

        fs.writeFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, "");
      }
    }
  }

  set(key, value) {
    let data = fs.readFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, "utf8");
    data = ((YAML.parse(data) == null) ? {} : YAML.parse(data));
    data = setObject(data, key, value, this.seperator);

    fs.writeFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, YAML.stringify(data));

    return data;
  }

  get(key) {
    let data = fs.readFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, "utf8");
    data = getObject(YAML.parse(data), key, this.seperator);

    return data;
  }

  has(key) {
    let data = fs.readFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, "utf8");
    data = getObject(YAML.parse(data), key, this.seperator);

    return (typeof data != "undefined");
  }

  delete(key) {
    let data = fs.readFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, "utf8");
    data = deleteObject(YAML.parse(data), key, this.seperator);

    if (this.deletingBlankData == true) {
      for (let i = 0; i < key.split(".").length; i++) {
        let newGet = getObject(data, key.split(".").slice(0, -(i + 1)).join("."));

        if ((isObject(newGet) == true) && (Object.keys(newGet).length == 0)) {
          data = deleteObject(data, key.split(".").slice(0, -(i + 1)).join("."));
        }
      }
    }

    fs.writeFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, YAML.stringify(data));

    return true;
  }

  all() {
    let data = fs.readFileSync(`./${this.databaseFolder}/${this.databaseName}.yaml`, "utf8");

    return YAML.parse(data);
  }
}
