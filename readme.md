# EfDB 

> - Tükçe database modülümüz ilk sürümü çıktı!

# Örnek 

```js
const efDB = require("ef.db")
const db = new efDB({
  dbName:"dosyaismi",
  dbFolder:"klasorismi"
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
