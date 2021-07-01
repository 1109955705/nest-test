import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const config = {
  appID: 'wx32df79c57874288b',
  appsecret: 'cfce29be9accda7e632d4b108375eeea',
  token: 'zhi ',
};
@Injectable()
export class AppService {
  getHello(param: any): string {
    const { signature, timestamp, nonce, echostr } = param;
    const tempStr = [config.token, timestamp, nonce].sort().join('');
    const hashCode = crypto.createHash('sha1');
    const resultCode = hashCode.update(tempStr, 'utf8').digest('hex');
    console.log('====xxx====', resultCode, resultCode);
    if (resultCode === signature) {
      return echostr;
    } else {
      return 'mismatch';
    }
  }
}
