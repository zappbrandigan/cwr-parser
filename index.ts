import { ParsedCWRFile } from './src/index.js';
import { CWRParserNode } from './src/node/CWRParserNode.js';

const parser = new CWRParserNode();

(async () => {
  const results: ParsedCWRFile = await parser.parseFile('./CW250645WD_000.V21');
  console.log(results);
})();