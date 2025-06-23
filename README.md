# CWR Parser - Node.js CWR v21/v22 File Parser

An Object-Oriented Programming solution for converting Common Works Registration (CWR) files in versions 2.1 and 2.2 format into structured JSON data.

## Features

- **CWR Support**: Handles all major CWR record types (HDR, GRH, GRT, NWR, REV, WRK, SPU, SPT, PWR, OWR, ALT, PER, REC, ORN, TRL) (more to come)
- **Version Support**: Compatible with CWR v2.1 and v2.2 formats
- **OOP Design**: Clean, modular architecture with separate classes for each record type
- **Field Validation**: Comprehensive field parsing and validation with configurable strictness (in progress)
- **Error Handling**: Detailed error reporting with custom CWRError class
- **Statistics**: Detailed parsing statistics and record counts
- **JSON Output**: Clean, structured JSON output with hierarchical organization
- **Flexible Options**: Configurable parsing behavior (strict mode, validation, raw data inclusion) (in progress)

## Installation

```bash
npm install cwr-parser
```

## Quick Start

### Basic Usage

```javascript
import { CWRParser } from 'cwr-parser';

// Create parser instance
const parser = new CWRParser({
  strictMode: false,
  validateFields: true,
  includeRawData: false
});

// Parse from file
const result = await parser.parseFile('path/to/your/file.vXX');

// Parse from string
const cwrData = 'HDR00000000100000001SO012345678...';
const result = parser.parseString(cwrData, 'filename.cwr');

console.log(JSON.stringify(result, null, 2));
```

### Parser Options

- `strictMode` (boolean): Throw errors on any parsing issues (default: false)
- `validateFields` (boolean): Enable field validation (default: true)
- `includeRawData` (boolean): Include raw line data in output (default: false)

## Record Types Supported

### Core Records
- **HDR** - Header Record (transmission information)
- **TRL** - Trailer Record (transmission summary)
- **GRH** - Group Header Record
- **GRT** - Group Trailer Record

### Transaction Records
- **NWR** - New Work Registration Record
- **REV** - Revised Registration Record

### Work Records
- **WRK** - Work Record (musical work information)
- **SPU** - Publisher Record
- **SPT** - Publisher Territory Record
- **PWR** - Writer Record
- **OWR** - Other Writer Record
- **ALT** - Alternative Title Record
- **PER** - Performing Artist Record
- **REC** - Recording Detail Record
- **ORN** - Work Originator Record

## Output Structure

The parser generates a hierarchical JSON structure:

```json
{
  "fileName": "sample.cwr",
  "version": "02.10",
  "header": {
    "recordType": "HDR",
    "data": {
      "senderName": "SAMPLE SENDER NAME",
      "receiverName": "SAMPLE RECEIVER NAME",
      "cwrVersion": "02.10",
      // ... other header fields
    }
  },
  "groups": [
    {
      "header": { /* GRH record */ },
      "transactions": [
        {
          "header": { /* NWR or REV record */ },
          "publishers": [ /* SPU records with writers and territories */ ],
          "writers": [ /* SWT records with publishers and territories */ ],
          "alternativeTitles": [ /* ALT records */ ],
          "performers": [ /* PER records */ ],
          "recordings": [ /* REC records */ ],
          "originators": [ /* ORN records */ ],
          "otherWriters": [ /* OWR records */ ],
          "territories": []
        }
      ],
      "trailer": { /* GRT record */ }
    }
  ],
  "trailer": { /* TRL record */ },
  "statistics": {
    "totalRecords": 9,
    "recordCounts": {
      "HDR": 1,
      "GRH": 1,
      "NWR": 1,
      "WRK": 1,
      "SPU": 1,
      "PWR": 1,
      "ALT": 1,
      "GRT": 1,
      "TRL": 1
    },
    "errors": [],
    "warnings": [],
    "hasErrors": false,
    "hasWarnings": false
  }
}
```

## Field Types and Parsing

The parser handles various CWR field types:

- **String**: Text fields (trimmed)
- **Numeric**: Integer values (zero-padded handling)
- **Date**: YYYYMMDD format → ISO date string
- **Time**: HHMMSS format → HH:MM:SS string
- **Flag**: Y/N values → boolean
- **Percentage**: Numeric percentage → decimal value

## Error Handling

The parser includes comprehensive error handling:

```javascript
try {
  const result = parser.parseFile('file.cwr');
} catch (error) {
  if (error instanceof CWRError) {
    console.log('CWR Error:', error.message);
    console.log('Error Code:', error.code);
    console.log('Details:', error.details);
  }
}
```

## Validation

The parser provides built-in validation:

```javascript
const result = parser.parseString(cwrData);
const validation = parser.validate(result);

if (!validation.isValid) {
  console.log('Validation Errors:', validation.errors);
}
```

## Architecture

### Key Design Principles

- **Single Responsibility**: Each class handles one record type
- **Extensibility**: Easy to add new record types
- **Validation**: Comprehensive field and structure validation
- **Error Recovery**: Graceful handling of malformed data
- **Performance**: Efficient parsing of large CWR files

## File Organization

```
src/
├── index.ts              # Entry point
├── CWRParser.ts          # Main parser class
├── records/              # Record type classes
│   ├── CWRRecord.ts      # Base record class
│   ├── HDRRecord.ts      # Header record
│   ├── NWRRecord.ts      # New work registration
│   ├── REVRecord.ts      # Revised registration
│   ├── WRKRecord.ts      # Work record
│   └── ...               # Other record types
└── utils/                # Utility classes
    ├── FieldParser.ts    # Field parsing utilities
    └── CWRError.ts       # Custom error class
```

## CWR Format Notes

- CWR files use fixed-width records
- Each record type has specific field positions and lengths
- Fields are typically left-padded with spaces for strings, zero-padded for numbers
- Date format: YYYYMMDD
- Time format: HHMMSS
- Percentage values: 5-digit integers (10000 = 100.00%)
- Transaction records (NWR/REV) indicate the start of a new work registration
- Work records (WRK) contain detailed work information

## License

This project is open source and available under the MIT License.