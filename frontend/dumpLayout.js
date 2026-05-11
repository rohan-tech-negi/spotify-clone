import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the app
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Evaluate layout
  const layout = await page.evaluate(() => {
    const panels = Array.from(document.querySelectorAll('[data-panel="true"]'));
    
    return panels.map(p => {
      const rect = p.getBoundingClientRect();
      const computed = window.getComputedStyle(p);
      return {
        id: p.id,
        width: rect.width,
        height: rect.height,
        flexBasis: computed.flexBasis,
        flexGrow: computed.flexGrow,
        flexShrink: computed.flexShrink,
        textContent: p.textContent?.substring(0, 30).replace(/\s+/g, ' '),
        className: p.className
      };
    });
  });
  
  console.log('LAYOUT DUMP:', JSON.stringify(layout, null, 2));
  
  await browser.close();
})();
