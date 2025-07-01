import { CWRConverter } from '../src/CWRConverter';
import { recordFields } from '../src/fields';
import fs from 'fs';
import path from 'path';

// test file are in .gitignore for confidentiality
const testInput = fs.readFileSync(
  path.resolve(__dirname, '__fixtures__/test-input.V21'),
  'utf8'
);

const converter = new CWRConverter();
const result = converter.mapString(testInput, 'test-input.cwr');

// Build a set of present record types
const presentRecordTypes = new Set(result.lines.map((r) => r.recordType));

// Build expected keys from field definitions
const expectedKeysByRecord = Object.fromEntries(
  Object.entries(recordFields).map(([recordType, fields]) => [
    recordType,
    fields.map((f) => f.name),
  ])
);

describe('CWR Converter', () => {
  test('All top level properties present', () => {
    expect(result).toHaveProperty('fileName');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('lines');
    expect(result).toHaveProperty('statistics');
  });

  test('All records have property recordType', () => {
    for (const line of result.lines) {
      expect(line).toHaveProperty('recordType');
    }
  });

  test('All records parsed', () => {
    const trl = result.lines.find((r) => r.recordType === 'TRL');
    expect(Number(trl?.data.get('recordCount'))).toEqual(
      result.statistics?.totalRecords
    );
  });

  describe('CWR Converter Records', () => {
    for (const [recordType, expectedKeys] of Object.entries(
      expectedKeysByRecord
    )) {
      const testFn = presentRecordTypes.has(recordType) ? test : test.skip;

      testFn(`${recordType} has all expected keys`, () => {
        const record = result.lines.find((r) => r.recordType === recordType);
        const fields = record!.data;

        for (const key of expectedKeys) {
          expect(fields.has(key)).toBe(true);
        }
      });
    }
  });
});
