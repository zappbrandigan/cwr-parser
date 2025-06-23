import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import recordPrefix from './recordPrefix.js';

/**
 * Alternative Title Record (ALT) - Contains alternative work titles
 */
class ALTRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ALT';
  }

  getFieldDefinitions() {
    return [
      ...recordPrefix,
      { name: 'alternativeTitle', type: 'string', length: 60, required: true },
      { name: 'titleType', type: 'string', length: 2, required: false },
      { name: 'languageCode', type: 'string', length: 2, required: false }
    ];
  }
}

export { ALTRecord };