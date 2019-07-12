"use strict";

const Kue = use("Kue");
const Job = use("App/Jobs/NewTaskMail");

const TaskHook = (exports = module.exports = {});

//apenas executa quando cria uma nova task com user_id ou altera uma task e adicionar um user_id
TaskHook.sendNewTaskMail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) {
    //dirty grava quais foram as novas informações adicionadas nesse model
    return;
  }

  const { email, username } = await taskInstance.user().fetch(); // taskInstance.user() indica que quer trabalhar com a classe user, trazendo o user relacionado a essa task
  const file = await taskInstance.file().fetch(); //mesma coisa

  const { title } = taskInstance;

  //Não entendi como ele identifica qual job é chamado
  Kue.dispatch(
    Job.key,
    { username, email, title, file },
    {
      attempts: 3
    }
  ); //disparada a chamada do job
};
