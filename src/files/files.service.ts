import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getFile(name: string): fs.ReadStream {
    const file = fs.createReadStream(join(process.cwd(), `/files/${name}`));
    return file;
  }
}
