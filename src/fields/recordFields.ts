import { FieldDefinition, RecordTypeKey } from '../types';
import { recordFieldPrefix } from './recordFieldPrefix.js';

/**
 * types: string, numeric, date, time, percentage, flag, table
 */

const date = { type: 'date', length: 8 } as const; // 'YYYYMMDD'
const time = { type: 'time', length: 6 } as const; // 'HHMMSS'
const flag = { type: 'flag', length: 1 } as const; // 'Y', 'N', 'U'
const percentage = { type: 'percentage', length: 5 } as const; // 999v99

/**
 * common fields repeated across records
 */
const languageCode: FieldDefinition = {
  name: 'languageCode',
  type: 'table',
  length: 2,
  required: false,
  title: 'Language Code',
  description: 'Language code for this record',
};

const usaLicenseIndicator: FieldDefinition = {
  name: 'usaLicenseIndicator',
  type: 'table',
  length: 1,
  required: false,
  title: 'USA License Indicator',
  description: 'Indicates US rights flow through SESAC/BMI/ASCAP/AMRA',
};

const firstRecordingRefusalIndicator: FieldDefinition = {
  name: 'firstRecordingRefusalIndicator',
  type: 'flag',
  length: 1,
  required: false,
  title: 'First Recording Refusal Indicator',
  description:
    'Indicates refusal of first recording authority (mandatory for UK registrations)',
};

const societyNumbers: Record<string, FieldDefinition> = {
  PR: {
    name: 'prAffiliationSocietyNumber',
    type: 'table',
    length: 3,
    required: false,
    title: 'PR Affiliation Society Number',
    description: 'Society code for performing rights affiliation number',
  },
  MR: {
    name: 'mrAffiliationSocietyNumber',
    type: 'table',
    length: 3,
    required: false,
    title: 'MR Affiliation Society Number',
    description: 'Society code for mechanical rights affiliation',
  },
  SR: {
    name: 'srAffiliationSocietyNumber',
    type: 'table',
    length: 3,
    required: false,
    title: 'SR Society Affiliation Society Number',
    description: 'Society code for synchronization rights affiliation',
  },
};

const shares: Record<string, FieldDefinition> = {
  PR: {
    name: 'prOwnershipShare',
    ...percentage,
    required: false,
    title: 'PR Ownership Share',
    description: 'Percentage of performing rights ownership (0-50%)',
  },
  MR: {
    name: 'mrOwnershipShare',
    ...percentage,
    required: false,
    title: 'MR Ownership Share',
    description: 'Percentage of mechanical rights ownership (0-100%)',
  },
  SR: {
    name: 'srOwnershipShare',
    ...percentage,
    required: false,
    title: 'SR Ownership Share',
    description: 'Percentage of synchronization rights ownership (0-100%)',
  },
};

const interestedPartyNumbers: Record<string, FieldDefinition> = {
  IP: {
    name: 'interestedPartyNumber',
    type: 'string',
    length: 9,
    required: true,
    title: 'Interested Party Number',
    description: "Submitter's unique identifier for this interested party",
  },
  IPIN: {
    name: 'ipiNameNumber',
    type: 'string',
    length: 11,
    required: false,
    title: 'Interested Party IPI Name Number',
    description: 'The IPI name number assigned to this interested party',
  },
  IPIB: {
    name: 'ipiBaseNumber',
    type: 'string',
    length: 13,
    required: false,
    title: 'Interested Party IPI Base Number',
    description: 'The IPI base number assigned to this interested party',
  },
};

/**
 *  NWR/REV/ESC/ISW share the same fields
 */
const workHeaderFields: FieldDefinition[] = [
  ...recordFieldPrefix,
  {
    name: 'workTitle',
    type: 'string',
    length: 60,
    required: true,
    title: 'Work Title',
    description: 'Title of the Work',
  },
  languageCode,
  {
    name: 'submitterWorkNumber',
    type: 'string',
    length: 14,
    required: true,
    title: 'Submitter Work Number',
    description: 'Unique work number assigned by the submitter',
  },
  {
    name: 'iswc',
    type: 'string',
    length: 11,
    required: false,
    title: 'ISWC',
    description: 'International Standard Work Code',
  },
  {
    name: 'copyrightDate',
    ...date,
    required: false,
    title: 'Copyright Date',
    description: 'Original copyright date of the work (optional)',
  },
  {
    name: 'copyrightNumber',
    type: 'string',
    length: 12,
    required: false,
    title: 'Copyright Number',
    description: 'Original copyright number of the work',
  },
  {
    name: 'musicalWorkDistributionCategory',
    type: 'table',
    length: 3,
    required: true,
    title: 'Musical Work Distribution Category',
    description: 'Type of music for distribution rules',
  },
  {
    name: 'duration',
    ...time,
    required: false,
    title: 'Work Duration',
    description:
      'Duration of the work (conditional if category is SER or required by society',
  },
  {
    name: 'recordedIndicator',
    ...flag,
    required: true,
    title: 'Recorded Indicator',
    description: 'Indicates whether the work has ever been recorded',
  },
  {
    name: 'textMusicRelationship',
    type: 'table',
    length: 3,
    required: false,
    title: 'Text Music Relationship',
    description: 'Indicates if the work includes music, text or both',
  },
  {
    name: 'compositeType',
    type: 'table',
    length: 3,
    required: false,
    title: 'Composite Type',
    description: 'Type of composite work',
  },
  {
    name: 'versionType',
    type: 'table',
    length: 3,
    required: true,
    title: 'Version Type',
    description: 'Relationship to other works e.g. arrangement',
  },
  {
    name: 'excerptType',
    type: 'table',
    length: 3,
    required: false,
    title: 'Excerpt Type',
    description: 'Type of excerpt if applicable',
  },
  {
    name: 'musicArrangement',
    type: 'table',
    length: 3,
    required: false,
    title: 'Music Arragement',
    description: 'Type of music arrangement if Version Type is MOD',
  },
  {
    name: 'lyricAdaptation',
    type: 'table',
    length: 3,
    required: false,
    title: 'Lyric Adaptation',
    description: 'Type of lyric adaptation if Version Type is MOD',
  },
  {
    name: 'contactName',
    type: 'string',
    length: 30,
    required: false,
    title: 'Contact Name',
    description: 'Business person contact name',
  },
  {
    name: 'contactId',
    type: 'string',
    length: 10,
    required: false,
    title: 'Contact ID',
    description: 'Identifier for contact person',
  },
  {
    name: 'cwrWorkType',
    type: 'table',
    length: 2,
    required: false,
    title: 'CWR Work Type',
    description: 'CWR work type',
  },
  {
    name: 'grandRightsIndicator',
    ...flag,
    required: false,
    title: 'Grand Rights Indicator',
    description:
      'Indicates if the work is intended for stage performance (optional, mandatory for UK)',
  },
  {
    name: 'compositeComponentCount',
    type: 'numeric',
    length: 3,
    required: false,
    title: 'Composite Component Count',
    description: 'Number of components if Composite Count is entered ',
  },
  {
    // v2.0
    name: 'printedPublicationDate',
    ...date,
    required: false,
    title: 'Publication Date of Printed Edition',
    description: 'Date of printed publication, relevant for GEMA',
  },
  {
    name: 'exceptionalClause',
    ...flag,
    required: false,
    title: 'Exceptional Clause',
    description: 'Exceptional clause for GEMA printed editions',
  },
  {
    name: 'opusNumber',
    type: 'string',
    length: 25,
    required: false,
    title: 'Opus Number',
    description: 'Composer-assigned opus number',
  },
  {
    name: 'catalogNumber',
    type: 'string',
    length: 25,
    required: false,
    title: 'Catalog Number',
    description: 'Catalog number with abbreviated name and part number',
  },
  {
    // v2.1
    name: 'priorityFlag',
    ...flag,
    required: false,
    title: 'Priority Flag',
    description: 'Priority processing indicator for high-profile works',
  },
];

/**
 * SPU/OPU share the same fields
 */
const publisherFields: FieldDefinition[] = [
  ...recordFieldPrefix,
  {
    name: 'publisherSequenceNumber',
    type: 'numeric',
    length: 2,
    required: true,
    title: 'Publisher Sequence Number',
    description:
      'Sequential number assigned to the original publishers of this work',
  },
  interestedPartyNumbers['IP'],
  {
    name: 'publisherName',
    type: 'string',
    length: 45,
    required: true,
    title: 'Publisher Name',
    description: "Publisher's name (mandatory for SPU, optional for OPU)",
  },
  {
    name: 'publisherUnknownIndicator',
    ...flag,
    required: true,
    title: 'Publisher Unknown Indicator',
    description:
      "Set to 'Y' if publisher name is unknown for OPU (must be blank of SPU)",
  },
  {
    name: 'publisherType',
    type: 'table',
    length: 2,
    required: false,
    title: 'Publisher Type',
    description:
      "Code defining the publisher's role (mandatory for SPU, optional for OPU)",
  },
  {
    name: 'publisherTaxId',
    type: 'string',
    length: 9,
    required: false,
    title: 'Tax ID Number',
    description: 'Tax identification number of the publisher',
  },
  interestedPartyNumbers['IPIN'],
  {
    name: 'submitterAgreementNumber',
    type: 'string',
    length: 14,
    required: false,
    title: 'Submitter Agreement Number',
    description: "Submitter's agreement number for this publisher",
  },
  societyNumbers['PR'],
  shares['PR'],
  societyNumbers['MR'],
  shares['MR'],
  societyNumbers['SR'],
  shares['SR'],
  {
    name: 'specialAgreementsIndicator',
    type: 'table',
    length: 1,
    required: false,
    title: 'Special Agreements Indicator',
    description:
      'Indicates publisher claiming reversionary rights (applies to specific societies)',
  },
  firstRecordingRefusalIndicator,
  {
    name: 'filler',
    type: 'string',
    length: 1,
    required: true,
    title: 'Filler',
    description: 'Fill with a blank',
  },
  interestedPartyNumbers['IPIB'], // v2.0
  {
    name: 'isac',
    type: 'string',
    length: 14,
    required: false,
    title: 'International Standard Agreement Code',
    description: 'ISAC assigned to the agreement',
  },
  {
    name: 'societyAssignedAgreementNumber',
    type: 'string',
    length: 14,
    required: false,
    title: 'Society-assigned Agreement Number',
    description: 'Agreement number assigned by the society',
  },
  {
    // v2.1
    name: 'agreementType',
    type: 'table',
    length: 2,
    required: false,
    title: 'Agreement Type',
    description: 'Code defining the category of agreement',
  },
  usaLicenseIndicator,
];

/**
 * SPT/OPT share the same fields
 */
const publisherTerritoryFields: FieldDefinition[] = [
  ...recordFieldPrefix,
  interestedPartyNumbers['IP'],
  {
    name: 'constant',
    type: 'string',
    length: 6,
    required: true,
    title: 'Constant',
    description: 'Set equal to spaces',
  },
  {
    name: 'prCollectionShare',
    ...percentage,
    required: false,
    title: 'PR Collection Share',
    description:
      'Percentage of performing royalties collected by the publisher in this territories (0-50)',
  },
  {
    name: 'mrCollectionShare',
    ...percentage,
    required: false,
    title: 'MR Collection Share',
    description:
      'Percentage of mechanical royalties collected by the publisher in this territory (0-100)',
  },
  {
    name: 'srCollectionShare',
    ...percentage,
    required: false,
    title: 'SR Collection Share',
    description:
      'Percentage of synchronization royalties collected by the publisher in this territory (0-100)',
  },
  {
    // v2.0
    name: 'inclusionExclusionIndicator',
    type: 'table',
    length: 1,
    required: true,
    title: 'Inclusion/Exclusion Indicator',
    description: 'I = Include, E = Excluded territory',
  },
  {
    name: 'tisCode',
    type: 'table',
    length: 4,
    required: true,
    title: 'TIS Numeric Code',
    description: 'The territory in which has this collecting share',
  },
  {
    name: 'sharesChange',
    type: 'flag',
    length: 1,
    required: false,
    title: 'Shares Change',
    description: "Set to 'Y' if writer shares change in this territory",
  },
  {
    // v2.1
    name: 'sequenceNumber',
    type: 'numeric',
    length: 3,
    required: true,
    title: 'Sequence Number',
    description:
      'Sequential number assigned to each territory following an SPU',
  },
];

/**
 * SWT/OWR share the same fields
 */
const writerFields: FieldDefinition[] = [
  ...recordFieldPrefix,
  interestedPartyNumbers['IP'],
  {
    name: 'writerLastName',
    type: 'string',
    length: 45,
    required: true,
    title: "Writer's Last Name",
    description:
      "Writer's last name or full name if not split (mandatory for SWR, optional for OWR)",
  },
  {
    name: 'writerFirstName',
    type: 'string',
    length: 30,
    required: false,
    title: "Writer's First Name",
    description: "Writer's first name with qualifying or middle names",
  },
  {
    name: 'writerUnknownIndicator',
    ...flag,
    required: false,
    title: 'Writer Unknown Indicator',
    description:
      "Set to 'Y' if writer is unknown for OWR (must be blank for SWR)",
  },
  {
    name: 'writerDesignationCode',
    type: 'table',
    length: 2,
    required: false,
    title: 'Writer Designation Code',
    description:
      "Code defining the writer's role in the composition (mandator for SWR, optional for OWR)",
  },
  {
    name: 'taxIdNumber',
    type: 'string',
    length: 9,
    required: false,
    title: 'Tax ID Number',
    description: 'Tax identification number of the writer (optional)',
  },
  interestedPartyNumbers['IPIN'],
  societyNumbers['PR'],
  shares['PR'],
  societyNumbers['MR'],
  shares['MR'],
  societyNumbers['SR'],
  shares['SR'],
  {
    name: 'reversionaryIndicator',
    ...flag,
    required: false,
    title: 'Reversionary Indicator',
    description: 'Indicates if writer is involved in a reversionary claim',
  },
  firstRecordingRefusalIndicator,
  {
    name: 'workForHireIndicator',
    ...flag,
    required: false,
    title: 'Work For Hire Indicator',
    description: 'Indicates if the work was written as a work for hire',
  },
  {
    name: 'filler',
    type: 'string',
    length: 1,
    required: false,
    title: 'Filler',
    description: 'Fill with a blank',
  },
  interestedPartyNumbers['IPIB'], // v2.0
  {
    name: 'personalNumber',
    type: 'numeric',
    length: 12,
    required: false,
    title: 'Personal Number',
    description:
      'Personal number assigned to writer in their country of residence',
  },
  usaLicenseIndicator, // v2.1
];

/**
 * SWT/OWT share the same fields
 */
const writerTerritoryFields: FieldDefinition[] = [
  ...recordFieldPrefix,
  interestedPartyNumbers['IP'],
  {
    name: 'prCollectionShare',
    ...percentage,
    required: false,
    title: 'PR Collection Share',
    description:
      'Percentage of performing royalties collected in this territories (0-50)',
  },
  {
    name: 'mrCollectionShare',
    ...percentage,
    required: false,
    title: 'MR Collection Share',
    description:
      'Percentage of mechanical royalties collected in this territory (0-100)',
  },
  {
    name: 'srCollectionShare',
    ...percentage,
    required: false,
    title: 'SR Collection Share',
    description:
      'Percentage of synchronization royalties collected in this territory (0-100)',
  },
  {
    // v2.0
    name: 'inclusionExclusionIndicator',
    type: 'table',
    length: 1,
    required: true,
    title: 'Inclusion/Exclusion Indicator',
    description: 'I = Include, E = Excluded territory',
  },
  {
    name: 'tisCode',
    type: 'table',
    length: 4,
    required: true,
    title: 'TIS Numeric Code',
    description: 'The territory in which has this collecting share',
  },
  {
    name: 'sharesChange',
    type: 'flag',
    length: 1,
    required: false,
    title: 'Shares Change',
    description:
      "Set to 'Y' if writer shares change in this territory (optional)",
  },
  {
    // v2.1
    name: 'sequenceNumber',
    type: 'numeric',
    length: 3,
    required: true,
    title: 'Sequence Number',
    description:
      'Sequential number assigned to each territory following an SPU',
  },
];

/**
 * EWT/VER share the same fields
 */
const versionFields: FieldDefinition[] = [
  ...recordFieldPrefix,
  {
    name: 'originalWorkTitle',
    type: 'string',
    length: 60,
    required: true,
    title: 'Original Work Title',
    description:
      'Original work title of the work from which this version was derived',
  },
  {
    name: 'iswc',
    type: 'string',
    length: 11,
    required: false,
    title: 'ISWC of Original Work',
    description: 'ISWC assigned to the orgininal work',
  },
  languageCode,
  {
    name: 'writerOneLastName',
    type: 'string',
    length: 45,
    required: false,
    title: 'Writer 1 Last Name',
    description:
      'Last or full name of the first writer/composer of the entire work (optional)',
  },
  {
    name: 'writerOneFirstName',
    type: 'string',
    length: 30,
    required: false,
    title: 'Writer 1 First Name',
    description:
      'First name of the first writer/composer of the entire work (optional)',
  },
  {
    name: 'source',
    type: 'string',
    length: 60,
    required: false,
    title: 'Source',
    description: 'Descriptions of the source from which the work was obtained',
  },
  {
    ...interestedPartyNumbers['IPIN'],
    name: 'writerOneIpiNameNumber',
  },
  {
    ...interestedPartyNumbers['IPIB'],
    name: 'writerOneIpiBaseNumber',
  },
  {
    name: 'writerTwoLastName',
    type: 'string',
    length: 45,
    required: false,
    title: 'Writer Two Last Name',
    description:
      'Last or full name of the first writer/composer of the entire work',
  },
  {
    name: 'writerTwoFirstName',
    type: 'string',
    length: 30,
    required: false,
    title: 'Writer Two First Name',
    description:
      'First name of the first writer/composer of the entire work (optional)',
  },
  {
    ...interestedPartyNumbers['IPIN'],
    name: 'writerTwoIpiNameNumber',
  },
  {
    ...interestedPartyNumbers['IPIB'],
    name: 'writerTwoIpiBaseNumber',
  },
  {
    name: 'submitterWorkNumber',
    type: 'string',
    length: 14,
    required: false,
    title: 'Submitter Work Number',
    description: 'Unique work number assigned by the submitter',
  },
];

export const recordFields: Record<RecordTypeKey, FieldDefinition[]> = {
  HDR: [
    recordFieldPrefix[0],
    {
      name: 'senderType',
      type: 'string',
      length: 2,
      required: true,
      title: 'Sender Type',
      description:
        'Indicates if the sender of the file is a society or a publisher',
    },
    {
      name: 'senderId',
      type: 'string',
      length: 9,
      required: true,
      title: 'Sender ID',
      description: 'Senders CWR IPI number or society code',
    },
    {
      name: 'senderName',
      type: 'string',
      length: 45,
      required: true,
      title: 'Sender Name',
      description: 'The name of the sender (publisher, society, agent)',
    },
    {
      name: 'ediVersion',
      type: 'string',
      length: 5,
      required: true,
      title: 'EDI Standard Version Number',
      description:
        'Indicates the header/trailer version number used (must be 01.10)',
    },
    {
      name: 'creationDate',
      ...date,
      required: true,
      title: 'Creation Date',
      description: 'Date the file was created YYYYMMDD',
    },
    {
      name: 'creationTime',
      ...time,
      required: true,
      title: 'Creation Time',
      description: 'Time the file was created HHMMSS',
    },
    {
      name: 'transmissionDate',
      ...date,
      required: true,
      title: 'Transmission Date',
      description: 'Date the file was transmitted YYYYMMDD',
    },
    {
      // v2.1
      name: 'characterSet',
      type: 'string',
      length: 15,
      required: false,
      title: 'Character Set',
      description: 'Character set used if different from ASCII (optional)',
    },
    {
      // v2.2
      name: 'version',
      type: 'string',
      length: 3,
      required: false,
      title: 'CWR Version Number',
      description: 'The CWR version number for this file',
    },
    {
      name: 'revision',
      type: 'numeric',
      length: 3,
      required: false,
      title: 'CWR Revision Number',
      description: 'The revision number of the CWR version number',
    },
    {
      name: 'softwarePackage',
      type: 'string',
      length: 30,
      required: false,
      title: 'Software Package',
      description:
        'Name of the software package from which the file originated',
    },
    {
      name: 'softwarePackageVersion',
      type: 'string',
      length: 30,
      required: false,
      title: 'Software Package Version',
      description:
        'Version of the software package from which the file originated',
    },
  ],
  GRH: [
    recordFieldPrefix[0],
    {
      name: 'transactionType',
      type: 'table',
      length: 3,
      required: true,
      title: 'Transaction Type',
      description:
        'Types of transactions included in this group (refer to transaction type table)',
    },
    {
      name: 'groupId',
      type: 'numeric',
      length: 5,
      required: true,
      title: 'Group ID',
      description: 'Unique sequential number for this group starting at 00001',
    },
    {
      // v2.1
      name: 'versionNumber',
      type: 'string',
      length: 5,
      required: true,
      title: 'Transaction Version Number',
      description: 'Version of the transaction type (e.g. 02.10 for CWR v2.1)',
    },
    {
      name: 'batchRequest',
      type: 'numeric',
      length: 10,
      required: false,
      title: 'Batch Request',
      description: 'Submitter managed sequential number to identify the group',
    },
    {
      name: 'distributionType',
      type: 'string',
      length: 2,
      required: false,
      title: 'Distribution Type',
      description: 'Set to blank - Not used for CWR',
    },
  ],
  GRT: [
    recordFieldPrefix[0],
    {
      name: 'groupId',
      type: 'numeric',
      length: 5,
      required: true,
      title: 'Transaction Type',
      description: 'Same Group ID as present in the group header',
    },
    {
      name: 'transactionCount',
      type: 'numeric',
      length: 8,
      required: true,
      title: 'Transaction Count',
      description: 'Number of transactions in this group',
    },
    {
      name: 'recordCount',
      type: 'numeric',
      length: 8,
      required: true,
      title: 'Reocrd Count',
      description:
        'Number of physical records in this count include GRH and GRT',
    },
    {
      // v1.1 not used for CWR
      name: 'currencyIndicator',
      type: 'table',
      length: 3,
      required: false,
      title: 'Currency Indicator',
      description: 'ISO 427 currency mode (optional, not used in CWR)',
    },
    {
      name: 'monetaryValue',
      type: 'numeric',
      length: 10,
      required: false,
      title: 'Total Monetary Value',
      description: 'Total monetary value of the group',
    },
  ],
  TRL: [
    recordFieldPrefix[0],
    {
      name: 'groupCount',
      type: 'numeric',
      length: 5,
      required: true,
      title: 'Group Count',
      description: 'Number of groups in this file',
    },
    {
      name: 'transactionCount',
      type: 'numeric',
      length: 8,
      required: true,
      title: 'Transaction Count',
      description: 'Number of transactions in this file',
    },
    {
      name: 'recordCount',
      type: 'numeric',
      length: 8,
      required: true,
      title: 'Record Count',
      description:
        'Number of physical records in this file, including HDR and TRL',
    },
  ],
  AGR: [
    ...recordFieldPrefix,
    {
      name: 'submitterAgreementNumber',
      type: 'string',
      length: 14,
      required: true,
      title: 'Submitter Agreement Number',
      description: "The submitter's unique identifier for this agreement",
    },
    {
      name: 'isac',
      type: 'string',
      length: 14,
      required: false,
      title: 'International Standard Agreement Code',
      description: 'The ISAC assigned to this agreement',
    },
    {
      name: 'agreementType',
      type: 'table',
      length: 2,
      required: true,
      title: 'Agreement Type',
      description: 'Code defining the category of agreement',
    },
    {
      name: 'agreementStartDate',
      ...date,
      required: true,
      title: 'Agreement Start Date',
      description: 'Date on which the transfer of rights becomes affective',
    },
    {
      name: 'agreementEndDate',
      ...date,
      required: false,
      title: 'Agreement End Date',
      description: 'Date on which the transfer of rights ceases',
    },
    {
      name: 'retentionEndDate',
      ...date,
      required: false,
      title: 'Retention End Date',
      description: 'The end date for the retention period',
    },
    {
      name: 'priorRoyaltyStatus',
      type: 'string',
      length: 1,
      required: true,
      title: 'Prior Royalty Status',
      description:
        'Indicates whether the acquiring party is entitled to accrued collectio',
    },
    {
      name: 'priorRoyaltyStartDate',
      ...date,
      required: false,
      title: 'Prior Royalty Start Date',
      description:
        'Indicates whether the acquiring party is entitled to accrued collection',
    },
    {
      name: 'postTermCollectionStatus',
      type: 'string',
      length: 1,
      required: true,
      title: 'Post Term Collection Status',
      description:
        'Indicates whether the acquiring party is entitled to collect monies accrued before the Retention End Date',
    },
    {
      name: 'postTermCollectionEndDate',
      ...date,
      required: false,
      title: '',
      description: '',
    },
    {
      name: 'signatureAgreementDate',
      ...date,
      required: false,
      title: 'Date of Signature of Agreement',
      description: 'The date when the written form of the agreement was signed',
    },
    {
      name: 'numberOfWorks',
      type: 'numeric',
      length: 5,
      required: true,
      title: 'Number of Works',
      description:
        'Number of works registered subject to this agreement specific to this file',
    },
    {
      name: 'salesClause',
      type: 'table',
      length: 1,
      required: false,
      title: 'Sales/Manufacture Clause',
      description:
        'Indicates whether acquiring party has rights for products sold or manufactured',
    },
    {
      name: 'sharesChange',
      ...flag,
      required: false,
      title: 'Shares Change',
      description: 'If the shares for the writer interest can change',
    },
    {
      name: 'advanceGiven',
      ...flag,
      required: false,
      title: 'Advance Given',
      description: 'If there is an advance paid for this agreement',
    },
    {
      // v2.1
      name: 'societyAssignedAgreementNumber',
      type: 'string',
      length: 14,
      required: false,
      title: 'Society-Assigned Agreement Number',
      description: 'The agreement number assigned by the society',
    },
  ],
  NWR: [...workHeaderFields],
  REV: [...workHeaderFields],
  ISW: [...workHeaderFields],
  EXC: [...workHeaderFields],
  ACK: [
    ...recordFieldPrefix,
    {
      name: 'creationDate',
      ...date,
      required: true,
      title: 'Creation Date',
      description:
        'The creation date of the original file that contained the transactions',
    },
    {
      name: 'creationTime',
      ...time,
      required: true,
      title: 'Creation Time',
      description:
        'The creation time of the original file that contained the transactions',
    },
    {
      name: 'originalGroupId',
      type: 'numeric',
      length: 5,
      required: true,
      title: 'Original Group ID',
      description: 'The group ID within the original transaction',
    },
    {
      name: 'originalTransactionSequence',
      type: 'numeric',
      length: 8,
      required: true,
      title: 'Original Transaction Sequence',
      description:
        'The transaction sequence number of the original transaction',
    },
    {
      name: 'originalTransactionType',
      type: 'table',
      length: 3,
      required: true,
      title: 'Original Transaction Type',
      description: 'The transaction type of the original transaction',
    },
    {
      name: 'creationTitle',
      type: 'string',
      length: 60,
      required: false,
      title: 'Creation Title',
      description: 'The creation title delivered by the submitter',
    },
    {
      name: 'submitterCreationNumber',
      type: 'string',
      length: 20,
      required: false,
      title: 'Submitter Creation Number',
      description: 'The unique identifier assigned by the submitter',
    },
    {
      name: 'recipientCreationNumber',
      type: 'string',
      length: 20,
      required: false,
      title: 'Recipient Creation Number',
      description:
        'The unique identifier assigned by the recipient to this work',
    },
    {
      name: 'processingDate',
      ...date,
      required: true,
      title: 'Processing Date',
      description: '',
    },
    {
      name: 'transactionStatus',
      type: 'table',
      length: 2,
      required: true,
      title: 'Transaction Status',
      description: 'The current status of this transaction',
    },
  ],
  TER: [
    ...recordFieldPrefix,
    {
      name: 'includsionExclusionIndicator',
      type: 'table',
      length: 1,
      required: true,
      title: 'Inclusion/Exclusion Indicator',
      description:
        'Whether the territory in this record is in scope of agreement',
    },
    {
      name: 'tisCode',
      type: 'table',
      length: 4,
      required: true,
      title: 'TIS Code',
      description:
        'Numeric identifier of a territory according to CISAC territory standard',
    },
  ],
  IPA: [
    ...recordFieldPrefix,
    {
      name: 'agreementRoleCode',
      type: 'string',
      length: 1,
      required: true,
      title: 'Agreement Role Code',
      description:
        'Code defining the role of the interested party in this agreement',
    },
    interestedPartyNumbers['IPIN'],
    interestedPartyNumbers['IPIB'],
    interestedPartyNumbers['IP'],
    {
      name: 'lastName',
      type: 'string',
      length: 45,
      required: true,
      title: 'IP Last Name',
      description: 'The last name of this writer or the name of the publisher',
    },
    {
      name: 'firstName',
      type: 'string',
      length: 30,
      required: false,
      title: 'IP First Name',
      description:
        'The first name of this writer along with all qualifying and middle names',
    },
    societyNumbers['PR'],
    shares['PR'],
    societyNumbers['MR'],
    shares['MR'],
    societyNumbers['SR'],
    shares['SR'],
  ],
  NPA: [
    ...recordFieldPrefix,
    interestedPartyNumbers['IP'],
    {
      name: 'lastName',
      type: 'string',
      length: 160,
      required: true,
      title: 'Interested Party Name',
      description: 'The last of a writer or publisher name',
    },
    {
      name: 'firstName',
      type: 'string',
      length: 160,
      required: true,
      title: 'Interested Party First Name',
      description: 'The first name of a writer',
    },
    languageCode,
  ],
  SPU: [...publisherFields],
  OPU: [...publisherFields],
  NPN: [
    ...recordFieldPrefix,
    {
      name: 'sequenceNumber',
      type: 'numeric',
      length: 2,
      required: true,
      title: 'Publisher Sequence Number',
      description:
        'Sequential number assinged to the original publishers on this work',
    },
    interestedPartyNumbers['IP'],
    {
      name: 'publisherName',
      type: 'string',
      length: 480,
      required: true,
      title: 'Publisher Name',
      description: 'Name of this publishing company in non-roman alphabet',
    },
    languageCode,
  ],
  SPT: [...publisherTerritoryFields],
  OPT: [...publisherTerritoryFields],
  SWR: [...writerFields],
  OWR: [...writerFields],
  NWN: [
    ...recordFieldPrefix,
    interestedPartyNumbers['IP'],
    {
      name: 'writerLastName',
      type: 'string',
      length: 45,
      required: true,
      title: "Writer's Last Name",
      description: "Writer's last name or full name",
    },
    {
      name: 'writerFirstName',
      type: 'string',
      length: 30,
      required: false,
      title: "Writer's First Name",
      description: "Writer's first name with qualifying or middle names",
    },
    languageCode,
  ],
  SWT: [...writerTerritoryFields],
  OWT: [...writerTerritoryFields],
  PWR: [
    ...recordFieldPrefix,
    {
      ...interestedPartyNumbers['IP'],
      name: 'publisherInterestedPartyNumber',
    },
    {
      name: 'publisherName',
      type: 'string',
      length: 45,
      required: true,
      title: 'Publisher Name',
      description: "Publisher's name (mandatory for SPU, optional for OPU)",
    },
    {
      name: 'submitterAgreementNumber',
      type: 'string',
      length: 14,
      required: false,
      title: 'Submitter Agreement Number',
      description: "Submitter's agreement number for this publisher",
    },
    {
      name: 'societyAssignedAgreementNumber',
      type: 'string',
      length: 14,
      required: false,
      title: 'Society-assigned Agreement Number',
      description: 'Agreement number assigned by the society',
    },
    {
      ...interestedPartyNumbers['IP'],
      name: 'writerInterestedPartyNumber',
    },
    {
      // v2.2
      name: 'publisherSequenceNumber',
      type: 'numeric',
      length: 2,
      required: true,
      title: 'Publisher Sequence Number',
      description:
        'Sequential number assigned to the original publishers of this work',
    },
  ],
  ALT: [
    ...recordFieldPrefix,
    {
      name: 'alternativeTitle',
      type: 'string',
      length: 60,
      required: true,
      title: 'Alternate Title',
      description: 'Alternate title for the work',
    },
    {
      name: 'titleType',
      type: 'table',
      length: 2,
      required: false,
      title: 'Title Type',
      description: 'Indicates the type of title presented on this record',
    },
    languageCode,
  ],
  NAT: [
    ...recordFieldPrefix,
    {
      name: 'alternativeTitle',
      type: 'string',
      length: 60,
      required: true,
      title: 'Work Title',
      description: 'The work title in non-Roman alphabet',
    },
    {
      name: 'titleType',
      type: 'table',
      length: 2,
      required: false,
      title: 'Title Type',
      description: 'Indicates the type of title presented on this record',
    },
    languageCode,
  ],
  EWT: [...versionFields],
  VER: [...versionFields],
  PER: [
    ...recordFieldPrefix,
    {
      name: 'artistLastName',
      type: 'string',
      length: 45,
      required: true,
      title: "Writer's Last Name",
      description: "Artist's last name or full name",
    },
    {
      name: 'artistFirstName',
      type: 'string',
      length: 30,
      required: false,
      title: "Writer's First Name",
      description: "Artist's first name with qualifying or middle names",
    },
    interestedPartyNumbers['IPIN'],
    interestedPartyNumbers['IPIB'],
  ],
  // TODO NPR
  REC: [
    ...recordFieldPrefix,
    {
      name: 'firstReleaseDate',
      ...date,
      required: false,
      title: 'First Release Date',
      description: 'Date the work was/will be released',
    },
    {
      name: 'constant',
      type: 'string',
      length: 60,
      required: false,
      title: 'Constant',
      description: 'Fill with blanks',
    },
    {
      name: 'firstReleaseDuration',
      ...time,
      required: false,
      title: 'First Release Duration',
      description: 'Duration of the first release of the work',
    },
    {
      name: 'filler',
      type: 'string',
      length: 5,
      required: false,
      title: 'Filler',
      description: 'Fill with blanks',
    },
    {
      name: 'firstAlbumTitle',
      type: 'string',
      length: 60,
      required: false,
      title: 'First Albmum Title',
      description: 'Name of the album that includes the work',
    },
    {
      name: 'firstAlbumLabel',
      type: 'string',
      length: 60,
      required: false,
      title: 'First Album Label',
      description:
        'Name of the organization that produced and released the album',
    },
    {
      name: 'firstReleaseCatalogNumber',
      type: 'string',
      length: 18,
      required: false,
      title: 'First Release Catalog Number',
      description: 'Number assigned by the organization releasing the ablum',
    },
    {
      name: 'ean',
      type: 'string',
      length: 13,
      required: false,
      title: 'EAN',
      description: 'European Article Number of release (EAN-13)',
    },
    {
      name: 'isrc',
      type: 'string',
      length: 12,
      required: false,
      title: 'ISRC',
      description:
        'International Standard Recording Code of the recording of the work',
    },
    {
      name: 'recordingFormat',
      type: 'table',
      length: 1,
      required: false,
      title: 'Recording Format',
      description: 'Code that identifies the content of the recording',
    },
    {
      name: 'recordingTechnique',
      type: 'table',
      length: 1,
      required: false,
      title: 'Recording Technique',
      description: 'Identifies the recording procedure',
    },
    {
      // v2.1
      name: 'mediaType',
      type: 'table',
      length: 3,
      required: false,
      title: 'Media Type',
      description: 'BIEM/CISAC code for media type',
    },
    {
      // v2.2
      name: 'recordingTitle',
      type: 'string',
      length: 60,
      required: false,
      title: 'Recording Title',
      description: 'Title of the Sound Recording',
    },
    {
      name: 'versionTitle',
      type: 'string',
      length: 60,
      required: false,
      title: 'Version Title',
      description: 'Title given to the version of the Sound Recording',
    },
    {
      name: 'displayArtist',
      type: 'string',
      length: 60,
      required: false,
      title: 'Display Artist',
      description: 'Name of the artist of the Sound Recording',
    },
    {
      name: 'recordLabel',
      type: 'string',
      length: 60,
      required: false,
      title: 'Record Label',
      description: 'Name of the organisation that produced the Sound Recording',
    },
    {
      name: 'isrcValidity',
      type: 'string',
      length: 20,
      required: false,
      title: 'ISRC Validity',
      description: 'If an ISRC is supplied, Indicates the validity of the ISRC',
    },
    {
      name: 'submitterRecordingId',
      type: 'string',
      length: 14,
      required: false,
      title: 'Submitter Recording Identifier',
      description: "The submitter's unique identifier for this recording",
    },
  ],
  ORN: [
    ...recordFieldPrefix,
    {
      name: 'intendedPurpose',
      type: 'table',
      length: 3,
      required: true,
      title: 'Intended Purpose',
      description: 'Type of production from which this record originated',
    },
    {
      name: 'productionTitle',
      type: 'string',
      length: 60,
      required: false,
      title: 'Production Title',
      description:
        'Name of the production, required if CWR work type on NWR is FM',
    },
    {
      name: 'cdIdentifier',
      type: 'string',
      length: 15,
      required: false,
      title: 'CD Identifier',
      description: 'CD identifier upon which the work appears',
    },
    {
      name: 'cutNumber',
      type: 'numeric',
      length: 4,
      required: false,
      title: 'Cut Number',
      description: 'The track number on the CD identifier',
    },
    {
      name: 'library',
      type: 'string',
      length: 60,
      required: false,
      title: 'Library',
      description: 'The library from which this work originated.',
    },
    {
      name: 'bltvr',
      type: 'string',
      length: 1,
      required: false,
      title: 'BLTVR',
      description:
        'indication of the primary use of the work within the AV production',
    },
    {
      name: 'filler', // TODO: make compatible iwth v2.1 ISAN
      type: 'string',
      length: 25,
      required: false,
      title: 'Filler',
      description: 'Reserved for future use',
    },
    {
      name: 'productionNumber',
      type: 'string',
      length: 12,
      required: false,
      title: 'Production Number',
      description: 'Number generated by production company to identify work',
    },
    {
      name: 'episodeTitle',
      type: 'string',
      length: 60,
      required: false,
      title: 'Episode Title',
      description: 'Title of the episode from which this work originated',
    },
    {
      name: 'episodeNumber',
      type: 'string',
      length: 20,
      required: false,
      title: 'Episode Number',
      description: 'Number assigned to the episode by the producer',
    },
    {
      name: 'productionYear',
      type: 'string',
      length: 4,
      required: false,
      title: 'Production Year',
      description: 'The year in which the production was completed',
    },
    {
      name: 'aviSocietyCode',
      type: 'string',
      length: 3,
      required: false,
      title: 'AVI Society Code',
      description: 'The society code for the entry in the AV index',
    },
    {
      name: 'audioVisualNumber',
      type: 'string',
      length: 15,
      required: false,
      title: 'Audio-Visual Number',
      description: 'Unique number used internally by the owning society',
    },
    {
      name: 'vIsan',
      type: 'string',
      length: 12,
      required: false,
      title: 'ISAN',
      description: 'Root Segment of ISAN',
    },
    {
      name: 'vIsanEpisode',
      type: 'string',
      length: 4,
      required: false,
      title: 'Episode',
      description: 'Episode or Part number of ISAN',
    },
    {
      name: 'checkDigitOne',
      type: 'numeric',
      length: 1,
      required: false,
      title: 'Check Digit 1',
      description: 'Check Character for the root and episode segment',
    },
    {
      name: 'vIsanVersion',
      type: 'string',
      length: 8,
      required: false,
      title: 'Version',
      description: 'Version portion of the V-ISAN',
    },
    {
      name: 'checkDigitTwo',
      type: 'numeric',
      length: 1,
      required: false,
      title: 'Check Digit 2',
      description: 'Check Character for the Version Segment',
    },
    {
      name: 'eidr',
      type: 'string',
      length: 20,
      required: false,
      title: 'EIDR',
      description: 'Root Number',
    },
    {
      name: 'eidrCheckDigit',
      type: 'string',
      length: 1,
      required: false,
      title: 'EIDR Check Digit',
      description: 'Check Character',
    },
  ],
  INS: [
    ...recordFieldPrefix,
    {
      name: 'numberOfVoices',
      type: 'numeric',
      length: 3,
      required: false,
      title: 'Number of Voices',
      description:
        'Indicates the number of independent parts included in this work',
    },
    {
      name: 'standardInstrumentationType',
      type: 'string',
      length: 3,
      required: false,
      title: 'Standard Instrumentation Type',
      description:
        'Describes instrumentation if standard instrumentation is used on this work',
    },
    {
      name: 'instrumentationDescription',
      type: 'string',
      length: 50,
      required: false,
      title: 'Instrumentation Description',
      description:
        'Describes instrumentation if non-standard instrumentation is used on this work',
    },
  ],
  IND: [
    ...recordFieldPrefix,
    {
      name: 'instrumentCode',
      type: 'table',
      length: 3,
      required: true,
      title: 'Instrument Code',
      description:
        'Indicates the use of a specific instrument in this version of instrumentation',
    },
    {
      name: 'numberOfPlayers',
      type: 'numeric',
      length: 3,
      required: false,
      title: 'Number of Players',
      description: 'Indicates the number of players for the above instrument',
    },
  ],
  COM: [
    ...recordFieldPrefix,
    {
      name: 'title',
      type: 'string',
      length: 60,
      required: true,
      title: 'Title',
      description:
        'The title of the original work from which a portion was taken and included in the composite work',
    },
    {
      name: 'iswcOfComponent',
      type: 'string',
      length: 11,
      required: false,
      title: 'ISWC of Component',
      description:
        'The International Standard Work Code assigned to the original work from which a portion was taken and included in this composite work',
    },
    {
      name: 'submitterWorkNumber',
      type: 'string',
      length: 14,
      required: false,
      title: 'Submiter Work Number',
      description:
        'The number that the submitting party uses to refer to this composite component',
    },
    {
      name: 'duration',
      type: 'numeric',
      length: 6,
      required: false,
      title: 'Duration',
      description: 'The duration of this composite component',
    },
    {
      name: 'writerOneLastName',
      type: 'string',
      length: 45,
      required: true,
      title: 'Writer One Last Name',
      description: 'Last name of the first writer of this component',
    },
    {
      name: 'writerOneFirstName',
      type: 'string',
      length: 30,
      required: false,
      title: 'Writer One First Name',
      description: 'First name of the first writer of this component',
    },
    {
      ...interestedPartyNumbers['IPIN'],
      name: 'writerOneIpiNameNumber',
    },
    {
      name: 'writerTwoLastName',
      type: 'string',
      length: 45,
      required: false,
      title: 'Writer Two Last Name',
      description: 'Last name of the second writer of this component',
    },
    {
      name: 'writerTwoFirstName',
      type: 'string',
      length: 30,
      required: false,
      title: 'Writer Two First Name',
      description: 'First name of the second writer of this component',
    },
    {
      ...interestedPartyNumbers['IPIN'],
      name: 'writerTwoIpiNameNumber',
    },
    {
      ...interestedPartyNumbers['IPIB'],
      name: 'writerOneIpiBaseNumber',
    },
    { ...interestedPartyNumbers['IPIB'], name: 'writerTwoIpiBaseNumber' },
  ],
  // TODO MSG, NET, NCT, NVT, NOW, ARI, XRF
};
