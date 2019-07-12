"use strict";

const Env = use("Env");

module.exports = {
  sentry: {
    dns: Env.get("SENTRY_DNS") //Não esqueça de configurar o SENTRY_DNS no arquivo .env
  }
};
