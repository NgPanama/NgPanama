/**
 * 401 Unauthorized
 * Se usa cuando la autenticación falla
 * 
 */
export default class UnauthorizedError extends Error {
  /**
   * constructor
   *
   * @param message
   */
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
