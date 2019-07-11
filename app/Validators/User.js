"use strict";

class User {
  get validateAll() {
    return true; //faz com que todos campos sejam validados ao mesmo tempo
  }
  get rules() {
    return {
      // validation rules
      username: "required|unique:users", // unique:users -> Ser único na tabela de users
      email: "required|email|unique:users",
      password: "required|confirmed"
    };
  }
}

module.exports = User;
