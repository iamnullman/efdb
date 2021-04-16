# efdb
![npm downloads](https://img.shields.io/npm/dt/efdb)
+ A database handler, Supports YamlDB.

## Links

- ~~Documentation~~
- [NPM page](https://npmjs.com/package/efdb)
- [GitHub page](https://github.com/NulIMan/efdb)

## Support

+ Join our Discord to get help!
- https://discord.gg/umXR2mspNx

## Example

```js
const efdb = require("efdb");
const db = new efdb({
  "databaseName": "database",
  "databaseFolder": "databases",
  "autoFile": true,
  "seperator":".",
  "ignoreWarns":true,
  "deletingBlankData":true
});

db.set("a.b.c", 12) 
// 12
db.add("a.b.c", 1)
// 13
db.subtract("a.b.c", 1)
// 12
db.delete("a")
// true
db.push("ab", "testing")
// [ 'testing' ]
db.push("ab", "testing1")
// [ 'testing', 'testing1' ]
db.unpush("ab", "testing1")
// [ 'testing' ]
db.has("ab")
// true
```
