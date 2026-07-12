const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src/pages/SaaSProduct.jsx'),
  path.join(__dirname, 'src/pages/WorkspaceConsole.jsx')
];

const replacements = [
  { search: /Alex Morgan/g, replace: 'Arham Bhatti' },
  { search: /\bAlex\b/g, replace: 'Arham' },
  { search: /\bAL\b/g, replace: 'AB' },
  
  { search: /Sarah Chen/g, replace: 'Alina Sheikh' },
  { search: /\bSarah\b/g, replace: 'Alina' },
  { search: /\bSR\b/g, replace: 'AS' },
  
  { search: /Marcus Reid/g, replace: 'Hassan Fareed' },
  { search: /\bMarcus\b/g, replace: 'Hassan' },
  { search: /\bMB\b/g, replace: 'HF' },
  
  { search: /Priya Sharma/g, replace: 'Fatima Ahmed' },
  
  { search: /Tom Walker/g, replace: 'Hamza Ali' },
  { search: /\bTK\b/g, replace: 'HA' },
  
  { search: /Lisa Park/g, replace: 'Mahnoor Ali' },
  
  { search: /James Otto/g, replace: 'Jatin Khatri' },
  
  { search: /Nina Patel/g, replace: 'Zara Ahmed' },
  
  { search: /\bJD\b/g, replace: 'HK' }
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
      content = content.replace(r.search, r.replace);
    });
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
