import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserInput } from '../../interfaces/types';

interface IVerify {
  Id: string;
  Email: string;
}
/**
 * PasswordService
 *
 * @author René Bonilla
 */
export default class AuthService {
  /**
   * Generate password hash object
   *
   * @param password
   * @returns {PasswordHash}
   */
  public static generatePasswordHash = async (password: string): Promise<string> => {
    const passwordHash: string = await bcrypt.hash(password, 10);

    return passwordHash;
  }

  /**
   * Compare Password to Password Input
   * @param passwordInput
   * @param password
   * @returns {Boolean}
   */
  public static comparePassword = async (passwordInput: string, password: string): Promise<boolean> => {
    return bcrypt.compare(passwordInput, password);
  }

  public static sign = async (user: UserInput, expires: string): Promise<string> => {
    return jwt.sign(
      {
        Id: user.id,
        Email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: expires
      }
    );
  }

  public static getUser = async (token: string) => {
    try {
      if (token) {
        const verify: IVerify = jwt.verify(token, process.env.JWT_SECRET) as IVerify;

        return {
          Id: verify.Id,
          Email: verify.Email,
          Token: token
        };
      }

      return {
        Id: null,
        Email: null,
        Token: null
      };
    } catch (err) {
      if (err.message === 'jwt expired') {
        return AuthService.reSign(token, '1d');
      }

      return {
        Id: null,
        Email: null,
        Token: null,
        err
      };
    }
  }

  public static getUserName = async (token: string) => {
    if (token) {
      const verify: any = jwt.verify(token, process.env.JWT_SECRET);

      return {
        Id: verify.Id,
        Email: verify.Email,
        Token: token
      };
    }

    return {
      Id: null,
      Email: null,
      Token: null
    };
  }

  public static reSign = async (token: string, expires: string) => {
    const decoded: any = jwt.decode(token, { complete: true });
    const user: UserInput = {
      id: decoded.payload.Id,
      email: decoded.payload.Email
    };
    const newtoken = await AuthService.sign(user, expires);

    return AuthService.getUser(newtoken);
  }
}
