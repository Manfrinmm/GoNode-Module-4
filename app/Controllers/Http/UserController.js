"use strict";

const Database = use("Database");
const User = use("App/models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);
    const addresses = request.input("addresses");

    //caso falhe em algum. ele executa um rollback em tudo que estiver usando trx
    const trx = await Database.beginTransaction(); //se utiliza quando há mais de uma operação no BD, garatindo sucesso

    const user = await User.create(data, trx);

    //ira criar varios endereços
    await user.addresses().createMany(addresses, trx);

    //se ele chegou até aqui sem nenhum erro, ira efetuar as alteções no BD
    await trx.commit();

    return user;
  }
}

module.exports = UserController;
