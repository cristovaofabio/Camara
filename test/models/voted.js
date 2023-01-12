//Save all projects that I voted;

const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "voted.json");

module.exports = class Voted {
  static addProject(idProject, typeVote) {
    fs.readFile(p, (err, fileContent) => {
      let voted = {
        projects: [],
        totalProjects: 0,
      };
      if (!err) {
        voted = JSON.parse(fileContent);
      }
      const existingProjectIndex = voted.projects.findIndex(
        (proj) => proj.id === idProject
      );
      const existingProject = voted.projects[existingProjectIndex];

      let updatedProject;

      if (existingProjectIndex !== -1) {
        // The project has already been voted = Don't do anything
        // updatedProject = { ...existingProject };
        // updatedProject.qty++;
        // voted.projects = [...voted.projects];
        // voted.projects[existingProjectIndex] = updatedProject;
      } else {
        // The project has not yet been voted
        updatedProject = { id: idProject, typeVote: typeVote };
        console.log(updatedProject);
        voted.projects = [...voted.projects, updatedProject];

        voted.totalProjects++;
        fs.writeFile(p, JSON.stringify(voted), (err) => {});
      }
    });
  }

  static deleteProject(id) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updateVotes = { ...JSON.parse(fileContent) };
      const project = updateVotes.projects.find((project) => project.id === id);
      if (!project) {
        return;
      }
      updateVotes.projects = updateVotes.projects.filter(
        (proj) => proj.id !== id
      );
      updateVotes.totalProjects--;
      fs.writeFile(p, JSON.stringify(updateVotes), (err) => {});
    });
  }

  static getVotes(callback) {
    fs.readFile(p, (err, fileContent) => {
      const votes = JSON.parse(fileContent);
      if (err) {
        callback(null);
      } else {
        callback(votes);
      }
    });
  }
  //   constructor() {
  //     this.projects = [];
  //     this.totalProjects = 0;
  //     this.acceptedProjects = 0;
  //     this.rejectedProjects = 0;
  //   }
};
