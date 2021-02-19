# EfDB ![](https://raster.shields.io/npm/dt/efdb.png)

> - Tükçe veritabanı modülü
> - Discord sunucumuz : https://discord.gg/umXR2mspNx

# Güncelleme Notları

- JsonDB eklendi
- Ufak hata gidermeleri

# Örnek 

```js
const efDB = require("efdb")
const db = new efDB({
    adapter:"JsonDB",//JsonDB veya YamlDB varsayılan JsonDB
    dataName:"test",//veritabanı dosya isimi girilmezse efDB yapılır
    dataFolder:"deneme"//veritabanı klasör isimi girilmezse efDB yapılır
})

db.set("x.y.z", "abc") // abc
 
db.get("x") // {y: {z: "abc"}}
db.fetch("x") // {y: {z: "abc"}}
db.all() // {x: {y: {z: "abc"}}}
 
db.push("a", "hello") //  ["hello"]
db.push("a", "world") //  ["hello", "world"]
db.unpush("a", "hello") // ["world"]

db.has("x") // true
db.delete("x") // true
db.deleteAll() // true
```
