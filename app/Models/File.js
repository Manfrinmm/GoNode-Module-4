"use strict";

const Model = use("Model");
const Env = use("Env");

class File extends Model {
  //url para mostrar o arquivo, sem precisar criar url no front -> QUANDO FOR COLOCAR NO FRONT END, BASTA COLOCAR ESSA URL
  //essa url sempre irá aparecer
  //campo virtual, no adnonis -> (computed)
  static get computed() {
    return ["url"];
  }

  //recebe o id do model
  getUrl({ id }) {
    return `${Env.get("APP_URL")}/files/${id}`;
  }
}

module.exports = File;
