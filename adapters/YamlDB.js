const fs = require('fs');
const fonksiyon = require("../ek/yaml.js");
let YAML;

class yamlDB {
  constructor(ayarlar={dataName:String,dataFolder:String}) {
   this.option = ayarlar
   this.dataName = this.option.dataName
   this.dataFolder = this.option.dataFolder
   if(!this.dataName) throw new Error("Bir database ismi belirtmelisin")
   if(!this.dataFolder) throw new Error("Bir database klasörü belirtmelisin")
   try {
    YAML = require("yaml");
  } catch (error) {
    throw new Error("Lütfen database için 'yaml' modülünü indiriniz.");
  }
  fonksiyon.fetchFiles(this.dataFolder, this.dataName);
}

	set(db, data) {
    fonksiyon.fetchFiles(this.dataFolder, this.dataName);

    if(!db) {
      throw new Error("Kaydedilicek bir veri belirtin.");
    }

    if(!data) {
      throw new Error("Veriye bir değer girmeniz gerekmekte!");
    }

    var content = YAML.parse(fs.readFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, "utf8"));
    fonksiyon.set(db, data, content);
    fs.writeFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, YAML.stringify(content));
    return this.get(db);

    
  }

  get(db) {

    if(!db) {
      throw new Error("Veri ismi giriniz.");
    }

    var content = YAML.parse(fs.readFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, "utf8"));

    try {
      return fonksiyon.get(content, ...db.split("."));
    } catch(err) {
      return undefined;
    }

  }

  fetch(db) {

    if(!db) {
      throw new Error("Veri ismi giriniz.");
    }

    var content = YAML.parse(fs.readFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, "utf8"));

    try {
      return fonksiyon.get(content, ...db.split("."));
    } catch(err) {
      return undefined;
    }

  }

  has(db) {

    if(!db) {
      throw new Error("Veri ismi giriniz.");
    }

    var content = YAML.parse(fs.readFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, "utf8"));

    try {
      return fonksiyon.get(content, ...db.split(".")) ? true : false;
    } catch(err) {
      return false;
    }

  }

  delete(db) {
    fonksiyon.fetchFiles(this.dataFolder, this.dataName);

    if(!db) {
      throw new Error("Veri ismi giriniz.");
    }

    var content = YAML.parse(fs.readFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, "utf8"));

    if(!this.get(db)) {
      return false;
    }

    fonksiyon.remove(content, db);
    
    fs.writeFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, YAML.stringify(content));

    return true;
  }

  add(db, number) {
    
    if(!db) {
      throw new Error("Veri ismi giriniz.");
    }

    if(!number) {
      throw new Error("Veriye eklenicek sayıyı giriniz");
    }

    if(isNaN(number)) {
      throw new Error("Eklenicek değer sayı olmalı!");
    }

    this.set(db, Number(this.get(db) ? (isNaN(this.get(db)) ? Number(number) : this.get(db)+Number(number)) : Number(number)));
    
    return this.get(db);

  }

  subtract(db, number) {
    
     if(!db) {
      throw new Error("Veri ismi giriniz.");
    }

    if(!number) {
      throw new Error("Veriden silinicek sayıyı giriniz");
    }

    if(isNaN(number)) {
      throw new Error("Silinicek değer sayı olmalı!");
    }

    if(this.get(db)-number < 1) {
      this.delete(db);
      return (this.get(db) || 0);
    }

    if(!this.get(db)) {
      this.delete(db);
      return (this.get(db) || 0);
    }

    this.set(db, this.get(db) ? (this.get(db)-Number(number) <= 1 ? 1 : (isNaN(this.get(db)) ? 1 : this.get(db)-Number(number)) || 1) : 1);
    
    return this.get(db);

  }

  push(db, data) {

    if(!db) {
      throw new Error("Kaydedilicek bir veri belirtin.");
    }

    if(!data) {
      throw new Error("Veriye bir değer girmeniz gerekmekte!");
    }

    var arr = [];

    if(this.get(db)) {
      if(typeof this.get(db) !== "object") {
        arr = [];
      } else {
        arr = this.get(db);
      }
    }

    arr.push(data);

    this.set(db, arr);

    return this.get(db);

  }

  unpush(db, data) {

    if(!db) {
      throw new Error("Kaydedilicek bir veri belirtin.");
    }

    if(!data) {
      throw new Error("Veriye bir değer girmeniz gerekmekte!");
    }

    var arr = [];

    if(this.get(db)) {
      arr = this.get(db);
    }

    arr = arr.filter((x) => x !== data);

    this.set(db, arr);

    return this.get(db);

  }

  all() {
    var content = YAML.parse(fs.readFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, "utf8"));

    return content;
  }

  deleteAll() {

    fs.writeFileSync(`./${this.dataFolder}/${this.dataName}.yaml`, YAML.stringify({}));

    return true;

  }
}
module.exports = yamlDB