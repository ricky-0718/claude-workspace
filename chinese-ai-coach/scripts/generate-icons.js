const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const tmpDir = os.tmpdir();

const sizes = [192, 512];

sizes.forEach(size => {
  const tmpOut = path.join(tmpDir, `coach-icon-${size}.png`).replace(/\\/g, '/');
  const finalOut = path.join(iconsDir, `icon-${size}.png`);
  const fontSize = Math.round(size * 0.35);
  const radius = Math.round(size * 0.2);

  const psScript = `
Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap(${size}, ${size})
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 10, 95, 166))
$gpath = New-Object System.Drawing.Drawing2D.GraphicsPath
$gpath.AddArc(0, 0, ${radius*2}, ${radius*2}, 180, 90)
$gpath.AddArc(${size-radius*2}, 0, ${radius*2}, ${radius*2}, 270, 90)
$gpath.AddArc(${size-radius*2}, ${size-radius*2}, ${radius*2}, ${radius*2}, 0, 90)
$gpath.AddArc(0, ${size-radius*2}, ${radius*2}, ${radius*2}, 90, 90)
$gpath.CloseFigure()
$g.FillPath($brush, $gpath)

$font = New-Object System.Drawing.Font('Yu Gothic', ${fontSize}, [System.Drawing.FontStyle]::Bold)
$textBrush = [System.Drawing.Brushes]::White
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$textRect = New-Object System.Drawing.RectangleF(0, 0, ${size}, ${size})
$g.DrawString([string][char]0x83EF, $font, $textBrush, $textRect, $sf)

$g.Dispose()
$bitmap.Save('${tmpOut}', [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()
`;

  const psFile = path.join(tmpDir, `gen_icon_${size}.ps1`);
  fs.writeFileSync(psFile, psScript, 'utf8');

  try {
    execSync(`powershell -ExecutionPolicy Bypass -File "${psFile}"`, {
      timeout: 15000,
      stdio: 'inherit',
    });
    // Copy from temp to final location
    fs.copyFileSync(tmpOut, finalOut);
    console.log(`Created: icon-${size}.png (${fs.statSync(finalOut).size} bytes)`);
  } catch (e) {
    console.error(`Failed for ${size}:`, e.message.substring(0, 200));
  }

  // Cleanup
  try { fs.unlinkSync(psFile); } catch {}
  try { fs.unlinkSync(tmpOut); } catch {}
});
