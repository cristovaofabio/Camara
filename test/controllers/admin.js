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

  const project = new Project(title, description, author);
  project
    .save()
    .then((result) => {
      console.log("Created project");
      res.redirect("/admin/add-project");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProject = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const projectId = req.params.projectId;

  Project.findById(projectId)
    .then((project) => {
      if (!project) {
        return res.redirect("/");
      }
      res.render("admin/edit-project", {
        docTitle: "Editar projeto",
        path: "/admin/edit-project",
        editing: editMode,
        project: project,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProject = (req, res, next) => {
  const projId = req.body.projectId;
  const updateTitle = req.body.title;
  const updateDescription = req.body.description;
  const updateAuthor = req.body.author;

  const project = new Project(
    updateTitle,
    updateDescription,
    updateAuthor,
    projId
  );

  project
    .save()
    .then((result) => {
      console.log("UPDATED PROJECT");
      res.redirect("/admin/projects");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProject = (req, res, next) => {
  const projectId = req.body.projectId;
  Project.deleteById(projectId);
  res.redirect("/admin/projects");
};

exports.getProjects = (req, res, next) => {
  Project.fetchAll()
    .then((projects) => {
      res.render("admin/projects", {
        projects: projects,
        docTitle: "/admin/projects",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};
