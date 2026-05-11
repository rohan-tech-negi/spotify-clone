import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Inject CSS
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = '[data-panel="true"] { min-width: 0 !important; }';
    document.head.appendChild(style);
  });
  
  // wait a bit for layout to settle
  await new Promise(r => setTimeout(r, 1000));
  
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
        flexGrow: computed.flexGrow,
      };
    });
  });
  
  console.log('LAYOUT DUMP WITH MIN-WIDTH 0:', JSON.stringify(layout, null, 2));
  
  await browser.close();
})();
