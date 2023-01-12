const Project = require("../models/project");

exports.getAddProject = (req, res, next) => {
  res.render("admin/edit-project", {
    docTitle: "Adicionar projeto",
    path: "/admin/add-project",
    editing: false,
  });
};

exports.postAddProject = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;

  const project = new Project(null, title, description, author);
  project.save();
  res.redirect("/");
};

exports.getEditProject = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const projectId = req.params.projectId;
  Project.findById(projectId, (project) => {
    if (!project) {
      return res.redirect("/");
    }
    res.render("admin/edit-project", {
      docTitle: "Editar projeto",
      path: "/admin/edit-project",
      editing: editMode,
      project: project,
    });
  });
};

exports.postEditProject = (req, res, next) => {
  const projId = req.body.projectId;
  const updateTitle = req.body.title;
  const updateDescription = req.body.description;
  const updateAuthor = req.body.author;

  const updateProject = new Project(
    projId,
    updateTitle,
    updateDescription,
    updateAuthor
  );

  updateProject.save();
  res.redirect("/admin/projects");
};

exports.postDeleteProject = (req, res, next) => {
  const projectId = req.body.projectId;
  Project.deleteById(projectId);
  res.redirect("/admin/projects");
};

exports.getProjects = (req, res, next) => {
  Project.fetchAll((projects) => {
    res.render("admin/projects", {
      projects: projects,
      docTitle: "/admin/projects",
      path: "/",
    });
  });
};
