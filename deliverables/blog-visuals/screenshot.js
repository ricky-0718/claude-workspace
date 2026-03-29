const fs = require('fs');
const path = require('path');
const http = require('http');

// Usage: node screenshot.js <html-filename> [output-filename]
const htmlFile = process.argv[2] || 'cost-comparison-chart.html';
const outputFile = process.argv[3] || htmlFile.replace('.html', '.png');

function httpRequest(method, url) {
  return new Promise((resolve, reject) => {
    const opts = new URL(url);
    const req = http.request({ hostname: opts.hostname, port: opts.port, path: opts.pathname + opts.search, method }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const pageUrl = `http://localhost:9859/${htmlFile}`;
  console.log(`Capturing: ${pageUrl}`);

  // Create new tab
  const newTab = JSON.parse(await httpRequest('PUT', `http://localhost:9222/json/new?${pageUrl}`));
  console.log('Tab created:', newTab.id);
  await new Promise(r => setTimeout(r, 3000));

  const ws = new WebSocket(newTab.webSocketDebuggerUrl);
  let msgId = 1;

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const timeout = setTimeout(() => reject(new Error(`Timeout: ${method}`)), 30000);
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          clearTimeout(timeout);
          ws.removeEventListener('message', handler);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.addEventListener('open', async () => {
    try {
      // Get content height first
      const layoutBefore = await send('Page.getLayoutMetrics');
      const contentH = Math.ceil(layoutBefore.contentSize.height);
      const contentW = Math.max(Math.ceil(layoutBefore.contentSize.width), 1400);
      console.log(`Content: ${contentW}x${contentH}`);

      // Set viewport to fit content
      await send('Emulation.setDeviceMetricsOverride', {
        width: contentW, height: Math.max(contentH, 800), deviceScaleFactor: 2, mobile: false
      });
      await new Promise(r => setTimeout(r, 1000));

      // Capture
      const result = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(result.data, 'base64');
      const outPath = path.join(__dirname, outputFile);
      fs.writeFileSync(outPath, buffer);
      console.log(`Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);

      await send('Emulation.clearDeviceMetricsOverride');
      await httpRequest('PUT', `http://localhost:9222/json/close/${newTab.id}`).catch(() => {});
      ws.close();
    } catch (err) {
      console.error('Error:', err.message);
      try { await httpRequest('PUT', `http://localhost:9222/json/close/${newTab.id}`); } catch(e) {}
      ws.close();
      process.exit(1);
    }
  });

  ws.addEventListener('error', () => { console.error('WS error'); process.exit(1); });
}

main();
