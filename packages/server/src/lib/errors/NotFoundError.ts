/**
 * 404 Not Found Error
 * Usar cuando no se puede encontrar el recurso objetivo
 *
 */
export default class NotFoundError extends Error {
  /**
   * constructor
   *
   * @param message
   */
  constructor(message: string = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
  }
}
