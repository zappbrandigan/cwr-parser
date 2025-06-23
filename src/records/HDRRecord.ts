import { CWRRecord } from './CWRRecord.js';

/**
 * Header Record (HDR) - Contains transmission information
 */
class HDRRecord extends CWRRecord {
  constructor(options = {}) {
    super(options);
    this.recordType = 'HDR';
  }

  getFieldDefinitions() {
    return [
      { name: 'recordType', type: 'string', length: 3, required: true },
      { name: 'senderType', type: 'string', length: 2, required: true },
      { name: 'senderId', type: 'string', length: 9, required: true },
      { name: 'senderName', type: 'string', length: 45, required: true },
      { name: 'ediVersion', type: 'string', length: 5, required: true },
      { name: 'creationDate', type: 'date', length: 8, required: true },
      { name: 'creationTime', type: 'time', length: 6, required: true },
      { name: 'transmissionDate', type: 'date', length: 8, required: true },
      { name: 'characterSet', type: 'string', length: 15, required: false },
      { name: 'cwrVersion', type: 'string', length: 5, required: false },
      { name: 'cwrRevision', type: 'string', length: 2, required: false },
      { name: 'softwarePackage', type: 'string', length: 30, required: false },
      { name: 'softwarePackageVersion', type: 'string', length: 30, required: false }
    ];
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