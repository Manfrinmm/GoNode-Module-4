"use strict";

const File = use("App/Models/File");
//trabalhar com caminhos / funções de ajuda que o JS não possui
const Helpers = use("Helpers");

class FileController {
  async store({ request, response }) {
    try {
      //verificar se na requisição existe um arquivo com nome file
      if (!request.file("file")) return;

      //define tamanho limite do arquivo
      const upload = request.file("file", { size: "2mb" });

      //Gerar novo nome do arquivo
      const fileName = `${Date.now()}.${upload.subtype}`;

      //Mover esse aquivo para uma pasta (essa pasta não é compartilhada entre produção e desenv.)
      await upload.move(Helpers.tmpPath("uploads"), {
        name: fileName
      });

      //Verifica se ocorreu tudo certo
      if (!upload.moved()) {
        throw upload.error(); //caso aconteça algum erra, irá "cair" no catch
      }

      //Criar um novo registro no BD
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });

      return file;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "Erro no upload de arquivo" }
      });
    }
  }

  async show({ params, response }) {
    const file = await File.findOrFail(params.id);

    return response.download(Helpers.tmpPath(`uploads/${file.file}`));
  }
}

module.exports = FileController;
