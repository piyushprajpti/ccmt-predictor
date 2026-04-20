const fs = require('fs');
const path = require('path');

const publicDir = 'e:/ccmt-predictor/public';

function transform2024() {
    const filePath = path.join(publicDir, 'data2024.json');
    if (!fs.existsSync(filePath)) return;
    
    console.log('Transforming data2024.json...');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const transformed = data.map(item => ({
        RoundName: item.round,
        InstituteName: item.institute,
        ProgramName: item.program,
        groupName: item.group,
        Category: item.category,
        OpeningRank: String(item.openingRank),
        ClosingRank: String(item.closingRank)
    }));
    fs.writeFileSync(filePath, JSON.stringify(transformed, null, 2));
}

function transform2025() {
    const filePath = path.join(publicDir, 'data2025.json');
    if (!fs.existsSync(filePath)) return;

    console.log('Transforming data2025.json...');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const transformed = data.map(item => ({
        RoundName: item.Round,
        InstituteName: item.Institute,
        ProgramName: item['PG Program'],
        groupName: item.Group,
        Category: item.Category,
        OpeningRank: String(item['Max GATE Score']),
        ClosingRank: String(item['Min GATE Score'])
    }));
    fs.writeFileSync(filePath, JSON.stringify(transformed, null, 2));
}

transform2024();
transform2025();
console.log('Transformation complete.');
