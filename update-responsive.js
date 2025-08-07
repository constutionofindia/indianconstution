const fs = require('fs');
const path = require('path');

// Function to update HTML files with responsive CSS link
function updateHTMLFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if responsive CSS link already exists
    if (content.includes('responsive-styles.css')) {
      console.log(`Skipping ${filePath} - responsive CSS already linked`);
      return;
    }
    
    // Add responsive CSS link after the Google Fonts link
    const googleFontsPattern = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Serif:wght@700;900&family=Hind:wght@700&display=swap" rel="stylesheet">/;
    
    if (googleFontsPattern.test(content)) {
      content = content.replace(
        googleFontsPattern,
        `<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700;900&family=Hind:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../responsive-styles.css">`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath} with responsive CSS link`);
    } else {
      console.log(`Skipping ${filePath} - Google Fonts link not found`);
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Function to process all HTML files in parts_of_const directory
function updateAllHTMLFiles() {
  const partsDir = path.join(__dirname, 'parts_of_const');
  
  if (!fs.existsSync(partsDir)) {
    console.error('parts_of_const directory not found');
    return;
  }
  
  const files = fs.readdirSync(partsDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  
  console.log(`Found ${htmlFiles.length} HTML files to update`);
  
  htmlFiles.forEach(file => {
    const filePath = path.join(partsDir, file);
    updateHTMLFile(filePath);
  });
  
  console.log('All HTML files updated successfully!');
}

// Run the update
updateAllHTMLFiles(); 