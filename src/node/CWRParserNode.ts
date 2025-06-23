import fs from 'fs';
import path from 'path';
import { CWRParser } from '../CWRParser';

class CWRParserNode extends CWRParser {
  async parseFile(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    return this.parseString(data, fileName);
  }
}

export { CWRParserNode };