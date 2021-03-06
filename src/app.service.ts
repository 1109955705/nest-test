import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

const config = {
  appID: 'wx3cd1ab82a763e2e8',
  appsecret: '7fd641b9b5cbc2c3f3c1a71ac9b211cc',
  token: 'zhi',
};
@Injectable()
export class AppService {
  getHello(param: any): string {
    const { signature, timestamp, nonce, echostr } = param;
    const tempStr = [config.token, timestamp, nonce].sort().join('');
    const hashCode = crypto.createHash('sha1');
    const resultCode = hashCode.update(tempStr, 'utf8').digest('hex');
    if (resultCode === signature) {
      return echostr;
    } else {
      return 'mismatch';
    }
  }
}
