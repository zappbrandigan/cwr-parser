import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Agreement Supporting Work Record (AGR) - Details of agreements relating to works that the publishers are registering elsewhere
 */
class AGRRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'AGR';
  }

  getFieldDefinitions() {
    return recordFields['AGR'];
  }
}

export { AGRRecord };