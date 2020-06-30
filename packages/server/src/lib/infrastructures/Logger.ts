/**
 * Logger
 * Log level conforms to RFC 5424
 *
 * @author René Bonilla
 * @since 2017
 * @link https://tools.ietf.org/html/rfc5424
 */
export class Logger {
    
  /**
   * 0 Emergency (RFC5424)
   * Used when a serious error occurs when the system can not run
   *
   * @param value
   */
  public static emergency(value: any) {
    const logLevel = 'Emergency'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 1 Alert (RFC5424)
   * Used when an error requiring notification to system administrator occurs
   *
   * @param value
   */
  public static alert(value: any) {
    const logLevel = 'Alert'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 2 Critical (RFC5424)
   * Used when a serious error occurs
   *
   * @param value
   */
  public static critical(value: any) {
    const logLevel = 'Critical'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 3 Error (RFC5424)
   * Used when an error occurs
   *
   * @param value
   */
  public static error(value: any) {
    const logLevel = 'Error'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 4 Warning (RFC5424)
   * Used when there is something bad that is not an error
   *
   * @param value
   */
  public static warning(value: any) {
    const logLevel = 'Warning'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 5 Notice (RFC5424)
   *
   * @param value
   */
  public static notice(value: any) {
    const logLevel = 'Notice'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 6 Informational (RFC5424)
   *
   * @param value
   */
  public static informational(value: any) {
    const logLevel = 'Informational'.toUpperCase();
    console.trace(logLevel, value);
  }

  /**
   * 7 Debug (RFC5424)
   *
   * @param value
   */
  public static debug(value: any) {
    const logLevel = 'Debug'.toUpperCase();
    console.trace(logLevel, value);
  }
}