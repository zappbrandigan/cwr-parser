import { FieldDefinition } from '../types';

// Record prefix that is repeated in most CWR records
export const recordFieldPrefix: FieldDefinition[] = [
  {
    name: 'recordType',
    type: 'string',
    length: 3,
    required: true,
    title: 'Record Type',
    description: 'The three character transaction type or detail record type',
  },
  {
    name: 'transactionSequenceNumber',
    type: 'numeric',
    length: 8,
    required: true,
    title: 'Transaction Sequence Number',
    description: 'The sequence number of a work (transaction) within a group',
  },
  {
    name: 'recordSequenceNumber',
    type: 'numeric',
    length: 8,
    required: true,
    title: 'Record Sequence Number',
    description:
      'The sequence number of a line (record) within this work (group)',
  },
];
