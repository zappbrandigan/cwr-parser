import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Territory in Agreement Record (TER) -  specifies a territory either within the territorial
 * scope of the preceding AGR agreement or excluded from it
 */
class TERRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'TER';
  }

  getFieldDefinitions() {
    return recordFields['TER'];
  }
}

export { TERRecord };
