"use strict";

const Route = use("Route");

Route.post("users", "UserController.store").validator("User"); // .validator("Nome do arquivo")
Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.get("/files/:id", "FileController.show");
Route.group(() => {
  Route.post("/files", "FileController.store");

  //serve para pode simplicar as rotas
  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store"], ["Project"]]]));

  Route.resource("projects.tasks", "TaskController")
    .apiOnly()
    .validator(new Map([[["projects.tasks.store"], ["Task"]]])); // "projects.tasks" coloca o id dos projetos na rota
}).middleware(["auth"]); //só ira conseguir acessar essas rotas caso tenha um token

// PARA INSERIR OUTRO VALIDATOR NA ROTA COM RESOURCE, FICARIA ASSIM:
/**
    .validator(new Map(
    [
      [
        ["projects.store"],
        ["Projects"]
      ],
      [
        ["projects.update"],
        ["projectUpdate"]
      ]
    ]
    ))
 *
 */
