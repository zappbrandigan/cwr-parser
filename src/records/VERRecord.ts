import { recordFields } from '../fields/recordFields.js';
import { CWRRecordOptions } from '../types/index.js';
import { CWRRecord } from './CWRRecord.js';

/**
 * Original Work Title for Version(VER) - Title of original work from which the version is derived
 */
class VERRecord extends CWRRecord {
  constructor(options: CWRRecordOptions = {}) {
    super(options);
    this.recordType = 'VER';
  }

  getFieldDefinitions() {
    return recordFields['VER'];
  }
}

export { VERRecord };
