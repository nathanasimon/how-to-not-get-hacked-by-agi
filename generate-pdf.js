const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Read the HTML file
  const htmlPath = path.join(__dirname, 'zine-print.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Set content
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });
  
  // Generate PDF with no margins and no headers/footers
  await page.pdf({
    path: 'zine.pdf',
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    displayHeaderFooter: false,
    preferCSSPageSize: true,
    omitBackground: false
  });
  
  await browser.close();
  console.log('PDF generated: zine.pdf');
}

generatePDF().catch(console.error);

