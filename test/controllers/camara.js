const Project = require("../models/project");
const Voted = require("../models/voted");

exports.getAllProjects = (req, res, next) => {
  Project.fetchAll()
    .then((projects) => {
      res.render("camara/project-list", {
        projects: projects,
        docTitle: "Todos os projetos",
        path: "/project-list",
      });
    })
    .catch((err) => console.log(err));

  // Project.fetchAll((projects) => {
  //   res.render("camara/project-list", {
  //     projects: projects,
  //     docTitle: "Todos os projetos",
  //     path: "/project-list",
  //   });
  // });
};

exports.getProject = (req, res, next) => {
  const projectId = req.params.projectId;

  Project.findById(projectId)
    .then((project) => {
      res.render("camara/project-detail", {
        project: project,
        docTitle: "Detalhe do projeto",
        path: "/project-detail",
      });
    })
    .catch((err) => console.log(err));

  // res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Project.fetchAll()
    .then((projects) => {
      res.render("camara/index", {
        projects: projects,
        docTitle: "Todos os projetos",
        path: "/",
      });
    })
    .catch((err) => console.log(err));

  // Project.fetchAll((projects) => {
  //   res.render("camara/index", {
  //     projects: projects,
  //     docTitle: "Todos os projetos",
  //     path: "/",
  //   });
  // });
};

exports.getMyProjects = (req, res, next) => {
  Project.fetchAll((projects) => {
    res.render("camara/my-projects", {
      // projects: projects,
      docTitle: "Projetos que criei",
      path: "/my-projects",
    });
  });
};

exports.getVote = (req, res, next) => {
  Voted.getVotes((votes) => {
    Project.fetchAll((projects) => {
      const voteProjects = [];

      for (project of projects) {
        const voteProjectData = votes.projects.find(
          (proj) => proj.id === project.id
        );

        if (voteProjectData) {
          voteProjects.push({
            projectData: project,
            typeVote: voteProjectData.typeVote,
          });
        }
      }

      res.render("camara/my-votes", {
        path: "/my-votes",
        docTitle: "Meus votos",
        projects: voteProjects,
      });
    });
  });
};

exports.postVote = (req, res, next) => {
  const projectId = req.body.projectId;
  const typeVote = req.body.vote;
  Project.findById(projectId, (product) => {
    Voted.addProject(projectId, typeVote);
  });
  res.redirect("/voted-projects");
};

exports.getVotedProjects = (req, res, next) => {
  Project.fetchAll((projects) => {
    res.render("camara/my-votes", {
      projects: projects,
      docTitle: "Seus votos",
      path: "/my-votes",
    });
  });
};
