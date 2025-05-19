import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class DownloadService {
  async downloadFile(url: string, outputFilename: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    const path = join(process.cwd(), outputFilename);
    const fileStream = createWriteStream(path);

    return new Promise<void>((resolve, reject) => {
      response.body.pipe(fileStream);
      response.body.on('error', (err) => {
        reject(err);
      });
      fileStream.on('finish', () => {
        console.log(`File has been downloaded and saved to ${path}`);
        resolve();
      });
    });
  }
}