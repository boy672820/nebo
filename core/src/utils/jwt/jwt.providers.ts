import { scrypt } from 'crypto';
import { promisify } from 'util';
import { CryptoConfigService } from '@config/crypto';

export const key = {
  provide: 'KEY',
  useFactory: async (cryptoConfig: CryptoConfigService) => {
    const key = (await promisify(scrypt)(
      cryptoConfig.password,
      'salt',
      32,
    )) as Buffer;

    return key;
  },
  inject: [CryptoConfigService],
};
