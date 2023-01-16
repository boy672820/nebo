import { Inject, Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  constructor(@Inject('KEY') private readonly key: Buffer) {}

  encrypt(data: string | NodeJS.ArrayBufferView): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-ctr', this.key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const encryptedData = `${iv.toString('hex')}:${encrypted.toString('hex')}`;

    return encryptedData;
  }

  decrypt(encryptedData: string): string {
    const data = encryptedData.split(':');
    const iv = Buffer.from(data.shift(), 'hex');
    const decipher = createDecipheriv('aes-256-ctr', this.key, iv);
    const encryptedBuffer = Buffer.from(data[0], 'hex');
    const decryptedData = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);

    return decryptedData.toString();
  }
}
