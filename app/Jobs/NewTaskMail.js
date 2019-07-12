"use strict";

const Mail = use("Mail");
const Helpers = use("Helpers");

class NewTaskMail {
  //Define a quantidade de jobs simultaneamente
  static get concurrency() {
    return 1;
  }

  //Chave unica para cada job na aplicação
  static get key() {
    return "NewTaskMail-job";
  }

  async handle({ username, email, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`);

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
  }
}

module.exports = NewTaskMail;
