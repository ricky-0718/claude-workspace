const http = require('http');
const PORT = 8787;

// ポート競合チェック: 既に使われていたら起動しない
const probe = http.createServer();
probe.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`[blog-test] Port ${PORT} already in use. Skipping.`);
    process.exit(0);
  }
});
probe.once('listening', () => {
  probe.close(() => {
    // ポートが空いている → serve.js を起動
    console.log(`[blog-test] Starting server on port ${PORT}...`);
    require('./serve.js');
  });
});
probe.listen(PORT);
