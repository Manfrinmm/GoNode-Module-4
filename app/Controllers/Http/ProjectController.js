"use strict";

const Project = use("App/Models/Project");

class ProjectController {
  async index({ request }) {
    // retorna todos os projetos
    //const projects = await Project.all();

    //retornar os relacionamentos
    const projects = await Project.query()
      .with("user")
      .paginate(request.get().page); //pagina inicial
    // .fetch();
    return projects;
  }

  async store({ request, auth }) {
    const data = request.only(["title", "description"]);

    const project = await Project.create({ ...data, user_id: auth.user.id });

    return project;
  }

  async show({ params }) {
    const project = await Project.findOrFail(params.id);

    //seria como se fosse o with, mas como é apeas um objeto, se usa assim
    await project.load("user");
    await project.load("tasks");

    return project;
  }

  async update({ params, request }) {
    const project = await Project.findOrFail(params.id);
    const data = request.only(["title", "description"]);

    //coloca as informações dentro do objeto
    project.merge(data);

    await project.save();

    return project;
  }

  async destroy({ params }) {
    const project = await Project.findOrFail(params.id);

    await project.delete();
  }
}

module.exports = ProjectController;
