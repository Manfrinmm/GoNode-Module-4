"use strict";

const Env = use("Env");
const Youch = use("youch"); //formatador de erros
const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */

//Irá camptar todos erros de todos os controllers e validação
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  //mostra o erro para o user
  async handle(error, { request, response }) {
    if (error.name === "ValidationException") {
      //se for apenas um erro de validação
      return response.status(error.status).json(error.messages);
    }
    //se for em ambiente dev, mostrar mais informações do erro
    if (Env.get("NODE_ENV") === "development") {
      const youch = new Youch(error, request.request);
      const errorJson = await youch.toJSON(); //tarnsforma o erro em formato JSON
      return response.status(error.status).send(errorJson);
    }

    return response.status(errr.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */

  // O que quer fazer com esse erro?
  async report(error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler;
