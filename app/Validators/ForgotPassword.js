"use strict";

const Antl = use("Antl"); // lib de Internationalization

class ForgotPassword {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      // validation rules
      email: "required|email",
      redirect_url: "required|url"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = ForgotPassword;
