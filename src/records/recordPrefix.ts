const recordPrefix = [
      { name: 'recordType', type: 'string', length: 3, required: true },
      { name: 'transactionSequenceNumber', type: 'numeric', length: 8, required: true },
      { name: 'recordSequenceNumber', type: 'numeric', length: 8, required: true },
];

export default recordPrefix;