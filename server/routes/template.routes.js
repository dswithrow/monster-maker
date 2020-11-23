const TemplateCon = require("../controllers/template.controller");

module.exports = app => {
    app.get("/api/templates/", TemplateCon.findAllTemplates);
    app.get("/api/templates/:id", TemplateCon.findTemplateById);
    app.get("/api/templates/name/:name", TemplateCon.findTemplatesByName);
    app.put("/api/templates/update/:id", TemplateCon.updateExistingTemplate);
    app.post("/api/templates/new", TemplateCon.createNewTemplate);
    app.delete("/api/templates/delete/:id", TemplateCon.deleteTemplate);
};