// scripts/convert-xlsx-to-json.ts
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const LOCALES_DIR = path.join(__dirname, '../locales');
const XLSX_PATH = path.join(__dirname, '../assets/terms_dictionary.xlsx');

const workbook = XLSX.readFile(XLSX_PATH);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

// Flat translations: { en: { key: value }, el: { key: value } }
const translations: Record<string, Record<string, string>> = { en: {}, el: {} };

rows.forEach((row) => {
    const key = row['dtTermId'];
    const lang = row['dtLanguageCode']?.toLowerCase();
    const value = row['dtTerm'];
    if (!key || !lang || !['en', 'el'].includes(lang)) return;
    translations[lang][key] = value;
});

// Write flat JSON files
Object.entries(translations).forEach(([lang, terms]) => {
    const outPath = path.join(LOCALES_DIR, `${lang}.json`);
    fs.mkdirSync(LOCALES_DIR, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(terms, null, 2), 'utf-8');

    const totalKeys = Object.keys(terms).length;
    console.log(`✅ ${outPath} — ${totalKeys} keys`);
});

console.log('\nDone!');
