// RESPONSIBLE FOR EXPOSING PROJECTS THAT WILL BE VOTED

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/projects => GET
router.get("/projects", adminController.getProjects);

// /admin/add-project => GET
router.get("/add-project", adminController.getAddProject);

// /admin/add-project => POST
router.post("/add-project", adminController.postAddProject);

router.get("/edit-project/:projectId", adminController.getEditProject);

router.post("/edit-project/", adminController.postEditProject);

router.post("/delete-project/", adminController.postDeleteProject);

module.exports = router;
// exports.routes = router;
// exports.projects = projects;
