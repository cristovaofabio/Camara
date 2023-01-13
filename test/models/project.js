const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Project {
  constructor(title, description, author, id) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.date = new Date();
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection("projects")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("projects").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll(cb) {
    const db = getDb();
    return db
      .collection("projects")
      .find()
      .toArray()
      .then((projects) => {
        // console.log(projects);
        return projects;
      })
      .catch((err) => console.log(err));
  }

  static findById(projectId) {
    const db = getDb();
    return db
      .collection("projects")
      .find({ _id: new mongodb.ObjectId(projectId) })
      .next()
      .then((project) => {
        return project;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(projectId) {
    const db = getDb();

    return db
      .collection("projects")
      .deleteOne({
        _id: new mongodb.ObjectId(projectId),
      })
      .then((result) => {
        console.log("Deleted project");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Project;

// const fs = require("fs");
// const path = require("path");

// const Voted = require("./voted");

// const p = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "projects.json"
// );

// const getProjectsFromFile = (callback) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       callback([]);
//     }
//     callback(JSON.parse(fileContent));
//   });
// };

// module.exports = class Project {
//   constructor(id, title, description, author) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.author = author;
//     this.date = new Date();
//   }

//   save() {
//     getProjectsFromFile((projects) => {
//       if (this.id) {
//         const existingProjectIndex = projects.findIndex(
//           (proj) => proj.id === this.id
//         );
//         const updatedProjects = [...projects];
//         updatedProjects[existingProjectIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedProjects), (err) => {
//           console.log(err);
//         });
//       } else {
//         this.id = new Date().getTime() + "";
//         projects.push(this);
//         fs.writeFile(p, JSON.stringify(projects), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static deleteById(projectId) {
//     getProjectsFromFile((projects) => {
//       const updatedProjects = projects.filter((p) => p.id !== projectId);
//       fs.writeFile(p, JSON.stringify(updatedProjects), (err) => {
//         if (!err) {
//           Voted.deleteProject(projectId);
//         }
//       });
//     });
//   }

//   static fetchAll(cb) {
//     getProjectsFromFile(cb);
//   }

//   static findById(projectId, callBack) {
//     // console.log(projectId);
//     getProjectsFromFile((projects) => {
//       const project = projects.find((p) => p.id === projectId);
//       callBack(project);
//     });
//   }
// };
