const Template = require("../models/template.model");

module.exports.findAllTemplates = (req, res) => {
    Template.find()
        .then(allTemplates => res.json({ templates: allTemplates }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
};

module.exports.findTemplateById = (req, res) => {
    Template.findById(req.params.id)
        .then(oneTemplate => res.json({ template: oneTemplate }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findTemplatesByName = (req, res) => {
    Template.find({ name: req.params.name })
        .then(foundTemplates  => res.json({ template: foundTemplates }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.findTemplatesByTitle = (req, res) => {
    Template.find({ cr: req.params.title })
        .then(foundTemplates  => res.json({ template: foundTemplates }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.createNewTemplate = (req, res) => {
    Template.create(req.body)
        .then(newTemplate => res.json({ template: newTemplate }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.updateExistingTemplate = (req, res) => {
    Template.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedTemplate => res.json({ template: updatedTemplate }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}

module.exports.deleteTemplate = (req, res) => {
    Template.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: result }))
        .catch( err => res.json({ message: "Something went wrong.", error: err }));
}
