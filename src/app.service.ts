import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

const config = {
  appID: 'wxd27649727105b6d2',
  appsecret: 'a3f2eb9f5819b0bf4b2a92a81f99baf4',
  token: 'wechat',
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
