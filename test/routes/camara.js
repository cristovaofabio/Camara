const express = require("express");

const camaraController = require("../controllers/camara");

const router = express.Router();

router.get("/", camaraController.getIndex);

router.get("/projects-list", camaraController.getAllProjects);

router.get("/projects-list/:projectId", camaraController.getProject);

router.get("/my-projects", camaraController.getMyProjects);

router.get("/vote", camaraController.getVote);

router.post("/vote", camaraController.postVote);

router.get("/voted-projects", camaraController.getVote);

module.exports = router;
