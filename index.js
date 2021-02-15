const adapters = [ "YamlDB", "JsonDB"]
class efDB {
  constructor(ayarlar={}) {
    this.options = ayarlar
    this.adapter = ayarlar["adapter"] ? (adapters.includes(ayarlar["adapter"]) ? ayarlar["adapter"] : "JsonDB") : "JsonDB";
    this.dataName = ayarlar["dataName"] ? ayarlar["dataName"] : "efDB" 
    this.dataFolder = ayarlar["dataFolder"] ? ayarlar["dataFolder"] : "efDB" 
    const adapterr = require(`./adapters/${this.adapter}`)
    this.efdb = new adapterr({
      adapter:this.adapter,
      dataName:this.dataName,
      dataFolder:this.dataFolder
    })
    this.set = this.constructor.set;
    this.get = this.constructor.get;
    this.fetch = this.constructor.fetch;
    this.add = this.constructor.add;
    this.subtract = this.constructor.subtract;
    this.push = this.constructor.push;
    this.unpush = this.constructor.unpush;
    this.all = this.constructor.all;
    this.deleteAll = this.constructor.deleteAll;
    this.delete = this.constructor.delete;
  }
  static set(data, key) {
  return this.efdb.set(data, key)
  }
  static get(data) {
    return this.efdb.get(data)
  }
  static fetch(data) {
    return this.efdb.get(data)
  }
  static add(data, number) {
    return this.efdb.add(data, number)
  }
  static subtract(data, number) {
    return this.efdb.subtract(data, number)
  }
  static push(data, key) {
  return this.efdb.push(data, key)
  }
  static unpush(data, key) {
  return this.efdb.unpush(data, key)
  }
  static all() {
    return this.efdb.all()
  }
  static delete(data) {
    return this.efdb.delete(data)
  }
  static deleteAll() {
    return this.efdb.deleteAll()
  }
}
module.exports = efDB
module.exports.version = "1.1.6"
module.exports.destek = "https://discord.gg/etqAqHFZsc"
