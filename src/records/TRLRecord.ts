import { recordFields } from '../fields/recordFields.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Trailer Record (TRL) - Contains transmission summary information
 */
class TRLRecord extends CWRRecord {
  constructor(options = {}) {
    super(options);
    this.recordType = 'TRL';
  }

  getFieldDefinitions() {
    return recordFields['TRL'];
  }
}

export { TRLRecord };
