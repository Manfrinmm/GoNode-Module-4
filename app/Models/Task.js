"use strict";

const Model = use("Model");

class Task extends Model {
  //como se fosse o constructor
  static boot() {
    super.boot();

    this.addHook("afterCreate", "TaskHook.sendNewTaskMail");
    this.addHook("beforeUpdate", "TaskHook.sendNewTaskMail");
  }

  project() {
    return this.belongsTo("App/Models/Project");
  }

  user() {
    return this.belongsTo("App/Models/User"); // o projeto pertence a um usuario
  }

  //caso uma tarefa tenha varios arquivos, é necessario ter uma tablea pivo,
  //apenas para guardar relacionamente de tarefa e arquivo
  //ficando -> return this.belongsToMany("App/Models/File");
  file() {
    return this.belongsTo("App/Models/File");
  }
}

module.exports = Task;
