const Monster = require("../models/monster.model");

module.exports.findAllMonsters = (req, res) => {
    Monster.find()
        .then(allMonsters => res.json({ monsters: allMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
};

module.exports.findMonsterById = (req, res) => {
    Monster.findById(req.params.id)
        .then(oneMonster => res.json({ monster: oneMonster }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findMonstersByName = (req, res) => {
    Monster.find({ name: req.params.name })
        .then(foundMonsters  => res.json({ monster: foundMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findMonstersByCR = (req, res) => {
    Monster.find({ cr: req.params.cr })
        .then(foundMonsters  => res.json({ monster: foundMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findMonstersByAlignment = (req, res) => {
    Monster.find({ order: req.params.order, moral: req.params.moral })
        .then(foundMonsters  => res.json({ monster: foundMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findMonstersByOrder = (req, res) => {
    Monster.find({ order: req.params.order })
        .then(foundMonsters  => res.json({ monster: foundMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findMonstersByMoral = (req, res) => {
    Monster.find({ moral: req.params.moral })
        .then(foundMonsters  => res.json({ monster: foundMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findMonstersByType = (req, res) => {
    Monster.find({ type: req.params.type })
        .then(foundMonsters  => res.json({ monster: foundMonsters }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.createNewMonster = (req, res) => {
    Monster.create(req.body)
        .then(newMonster => res.json({ monster: newMonster }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.updateExistingMonster = (req, res) => {
    Monster.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedMonster => res.json({ monster: updatedMonster }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.deleteMonster = (req, res) => {
    Monster.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: result }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}
