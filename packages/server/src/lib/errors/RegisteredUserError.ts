/**
 * 500 Internal Server Error
 * Úselo cuando ocurra un error inesperado.
 * 
 */
export default class RegisteredUserError extends Error {
  /**
   * constructor
   *
   * @param message
   */
  constructor(message: string = 'Usuario Registrado') {
    super(message);
    this.name = 'RegisteredUserError';
  }
}
