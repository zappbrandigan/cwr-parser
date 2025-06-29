import { CWRRecord } from './CWRRecord.js';
import { recordFields } from '../fields/index.js';
// import hdrFieldsJson from '../fields/HDR.json' with { type: 'json' };

// const hdrFields = hdrFieldsJson;

/**
 * Header Record (HDR) - Contains transmission information
 */
class HDRRecord extends CWRRecord {
  constructor(options = {}) {
    super(options);
    this.recordType = 'HDR';
  }

  getFieldDefinitions() {
    return recordFields['HDR'];
  }

  validate() {
    super.validate();
    
    // Additional HDR-specific validation
    const version = this.getField('cwrVersion');
    if (version && !['02.10', '02.20', '03.10'].includes(version)) {
      throw new Error(`Unsupported CWR version: ${version}`);
    }

    const senderType = this.getField('senderType');
    if (senderType && !["SO", "PB", "WR", "AD"].includes(senderType)) {
      throw new Error(`Invalid sender type: ${senderType}`);
    }
  }
}

export { HDRRecord };