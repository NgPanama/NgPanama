/**
 * 500 Internal Server Error
 * Úselo cuando ocurra un error inesperado.
 *
 */
export default class InternalServerError extends Error {
  /**
   * constructor
   *
   * @param message
   */
  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
  }
}
