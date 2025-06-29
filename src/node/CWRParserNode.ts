import fs from 'fs';
import path from 'path';
import { CWRParser } from '../CWRParser';
import { CWRError } from '../utils/CWRError';

class CWRParserNode extends CWRParser {
  async parseFile(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');
    if (!data) throw new CWRError(
      'Error reading file',
      'Code: ER'
    );
    const fileName = path.basename(filePath);
    return this.parseString(data, fileName);
  }
}

export { CWRParserNode };