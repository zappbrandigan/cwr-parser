import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';

/**
 * Acknowledgment of Transaction (ACK) - acknowledgements of transactions from a recipient back to a submitter
 */
class ACKRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'ACK';
  }

  getFieldDefinitions() {
    return recordFields['ACK'];
  }
}

export { ACKRecord };
