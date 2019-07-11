"use strict";

class Task {
  get rules() {
    return {
      // validation rules
      title: "required",
      due_data: "date"
    };
  }
}

module.exports = Task;
