const fs = require("fs");

const filePath = "e:/ccmt-predictor/public/data_optimized.json";
const input = JSON.parse(fs.readFileSync(filePath, "utf8"));

const columns = input?.metadata?.columns || [];
const colIndex = Object.fromEntries(columns.map((name, i) => [name, i]));

const rows = (input?.data || []).map((row, i) => ({
  srNo: row[colIndex["Sr.No"]] ?? i + 1,
  round: row[colIndex["Round"]] ?? "",
  institute: row[colIndex["Institute"]] ?? "",
  pgProgram: row[colIndex["PG Program"]] ?? "",
  group: row[colIndex["Group"]] ?? "",
  category: row[colIndex["Category"]] ?? "",
  maxGateScore: row[colIndex["Max GATE Score"]] ?? null,
  minGateScore: row[colIndex["Min GATE Score"]] ?? null
}));

const filterOptions = {
  round: input?.metadata?.filters?.Round || [],
  institute: input?.metadata?.filters?.Institute || [],
  pgProgram: input?.metadata?.filters?.["PG Program"] || [],
  group: input?.metadata?.filters?.Group || [],
  category: input?.metadata?.filters?.Category || []
};

const output = {
  rows,
  filterOptions,
  rowCount: rows.length
};

fs.writeFileSync(filePath, JSON.stringify(output));
console.log(`Converted ${rows.length} rows to object-based format in ${filePath}`);
