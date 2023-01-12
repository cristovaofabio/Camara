const fs = require("fs");
const path = require("path");

const Voted = require("./voted");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "projects.json"
);

const getProjectsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Project {
  constructor(id, title, description, author) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.date = new Date();
  }

  save() {
    getProjectsFromFile((projects) => {
      if (this.id) {
        const existingProjectIndex = projects.findIndex(
          (proj) => proj.id === this.id
        );
        const updatedProjects = [...projects];
        updatedProjects[existingProjectIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProjects), (err) => {
          console.log(err);
        });
      } else {
        this.id = new Date().getTime() + "";
        projects.push(this);
        fs.writeFile(p, JSON.stringify(projects), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(projectId) {
    getProjectsFromFile((projects) => {
      const updatedProjects = projects.filter((p) => p.id !== projectId);
      fs.writeFile(p, JSON.stringify(updatedProjects), (err) => {
        if (!err) {
          Voted.deleteProject(projectId);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProjectsFromFile(cb);
  }

  static findById(projectId, callBack) {
    // console.log(projectId);
    getProjectsFromFile((projects) => {
      const project = projects.find((p) => p.id === projectId);
      callBack(project);
    });
  }
};
