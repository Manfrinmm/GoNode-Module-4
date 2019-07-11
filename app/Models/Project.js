"use strict";

const Model = use("Model");

class Project extends Model {
  user() {
    return this.belongsTo("App/Models/User"); // o projeto pertence a um usuario
  }

  tasks() {
    return this.hasMany("App/Models/Task"); // Uma tarefa pode ter varias
  }
}

module.exports = Project;
