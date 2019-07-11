"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileSchema extends Schema {
  up() {
    this.create("files", table => {
      table.increments();
      table.string("file").notNullable(); // Nome do arquivo fisico dentro da aplicação
      table.string("name").notNullable(); // Nome original do arquivo
      table.string("type", 20); //o tipo do arquivo
      table.string("subtype", 20); // a extensão do arquivo (utilizado para alguns filtros)
      table.timestamps();
    });
  }

  down() {
    this.drop("files");
  }
}

module.exports = FileSchema;
