import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getFile(folder: string, name: string): fs.ReadStream {
    const currentDir: string = process.cwd();
    const path = 'files/' + folder + '/' + name;
    const file = fs.createReadStream(join(currentDir, path));
    return file;
  }
}
