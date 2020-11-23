const MonsterCon = require("../controllers/monster.controller");

module.exports = app => {
    app.get("/api/monsters/", MonsterCon.findAllMonsters);
    app.get("/api/monsters/:id", MonsterCon.findMonsterById);
    app.get("/api/monsters/name/:name", MonsterCon.findMonstersByName);
    app.put("/api/monsters/update/:id", MonsterCon.updateExistingMonster);
    app.post("/api/monsters/new", MonsterCon.createNewMonster);
    app.delete("/api/monsters/delete/:id", MonsterCon.deleteMonster);
};