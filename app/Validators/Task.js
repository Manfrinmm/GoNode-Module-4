"use strict";
const Antl = use("Antl"); // lib de Internationalization

class Task {
  get rules() {
    return {
      // validation rules
      title: "required",
      due_data: "date"
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Task;
