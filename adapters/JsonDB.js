const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class JsonDB {
    constructor(ayarlar={dataName:String,dataFolder:String}) {
        this.option = ayarlar
        this.dataName = this.option.dataName
        this.dataFolder = this.option.dataFolder
        if(!this.dataName) throw new Error("Bir database ismi belirtmelisin")
        if(!this.dataFolder) throw new Error("Bir database klasörü belirtmelisin")
        this.db = low(new FileSync(`./${this.dataFolder}/${this.dataName}` + ".json"));
};
     set(anahtar, değer) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
  if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
        if (!değer) throw new Error("Veriye kaydedilicek değeri girmelisin")
        this.db.set(anahtar, değer).write()
        return this.db.get(anahtar, değer).value()
    };


     delete(anahtar) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
 if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
 if (this.db.has(anahtar).value() === false) return false
        this.db.unset(anahtar).write()
        return true
    };
     get(anahtar) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
 if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
 if (this.db.has(anahtar).value() === false) return null
        return this.db.get(anahtar).value()
    };

     has(anahtar) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
 if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
 return this.db.has(anahtar).value()
    };

     push(anahtar, değer) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
 if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
 if (!değer) throw new Error("Veriye kaydedilicek değeri girmelisin")
 if (this.db.has(anahtar).value() === false) {
         this.db.set(anahtar, [değer]).write()
        return this.db.get(anahtar).value()
        }
      
        if (Array.isArray(this.db.get(anahtar).value()) === false) return null;
      this.db.get(anahtar).push(değer).write()
        return this.db.get(anahtar).value()
    };
     unpush(anahtar, değer) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
 if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
 if (!değer) throw new Error("Veriye kaydedilicek değeri girmelisin")
 if (this.db.has(anahtar).value() === false) return null
        if (Array.isArray(this.db.get(anahtar).value()) === false) return null;
   this.db.set(anahtar, this.db.get(anahtar).value().filter(k => k != değer)).write()
      return this.db.get(anahtar).value()
    };
     add(anahtar, değer) {
        if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
        if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
if (!değer) throw new Error("Veriye kaydedilicek değeri girmelisin")
if (this.db.has(anahtar).value() === false) return null
        if (typeof this.db.get(anahtar).value() !== 'number') throw new TypeError('');
        this.db.set(anahtar, Math.floor(this.db.get(anahtar).value()+değer)).write()
        return this.db.get(anahtar).value()
    };
     subtract(anahtar, değer) {
if (!this.dataName) throw new Error('Bir database ismi girmelisin!');
if (!this.dataFolder) throw new Error('Bir database klasor ismi girmelisin!');
if (!anahtar) throw new Error("Kaydetmem için bir veri ismi gir")
if (!değer) throw new Error("Veriye kaydedilicek değeri girmelisin")
 if (this.db.has(anahtar).value() === false) return null
        if (typeof this.db.get(anahtar).value() !== 'number') throw new TypeError(`\`${anahtar}\` anahtar kelimesindeki veri bir "Sayı" olmadığı için bulunan veriden yazılan veriyi çıkaramıyorum!`);
        this.db.set(anahtar, Math.floor(this.db.get(anahtar).value()-değer)).write()
        return this.db.get(anahtar).value()
    };
    all() {
      var content = fs.readFileSync(`./${this.dataFolder}/${this.dataName}.json`, "utf8")
      return content || "";
    };  
    deleteAll() {
      fs.writeFileSync(`./${this.dataFolder}/${this.dataName}.json`, "{}");
      return true;
    };
};

module.exports = JsonDB;
