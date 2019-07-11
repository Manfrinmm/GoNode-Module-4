"use strict";

const Mail = use("Mail");
const Helpers = use("Helpers");

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

  await Mail.send(
    ["emails.new_task"],
    { username, title, hasAttachment: !!file }, // !! faz a variavel virar booleano
    message => {
      message
        .to(email)
        .from("mmm123", "Adnonis|hue")
        .subject("Nova tarefa para você");

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        });
      }
    }
  );
};
