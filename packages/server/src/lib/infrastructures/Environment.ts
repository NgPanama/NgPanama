/**
 * Environment
 *
 * @author René Bonilla
 * @since 2017
 */
export default class Environment {
    
  /**
   * Determine whether it is local environment
   *
   * @returns {boolean}
   */
  public static isLocal(): boolean {        
    if (process.env.IS_OFFLINE) {
      return true;
    }

    return false;
  }
}
