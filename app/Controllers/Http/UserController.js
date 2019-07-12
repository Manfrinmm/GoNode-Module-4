"use strict";

const User = use("App/models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);
    const addresses = request.input("addresses");

    const user = await User.create(data);

    //ira criar varios endereços
    await user.addresses().createMany(addresses);

    return user;
  }
}

module.exports = UserController;
