$root = $PSScriptRoot
$scripts = @("auth.js", "theme.js", "data.js", "components.js", "pages-login.js", "pages-timeline.js", "pages-metrics.js", "pages-teams.js", "pages-projects.js", "app.js")

# Padroes de destructuring duplicados que devem ser removidos
$hookPatterns = @(
  'const { useState } = React;',
  'const { useState, useEffect } = React;'
)

# Declaracao unica dos hooks no topo
$combined = "`n// React hooks - declaracao unica`nconst { useState, useEffect, useRef, useCallback, useMemo } = React;`n"

foreach ($s in $scripts) {
  $filePath = Join-Path $root $s
  if (Test-Path $filePath) {
    $lines = Get-Content $filePath -Encoding UTF8
    $filtered = $lines | Where-Object {
      $line = $_.Trim()
      $skip = $false
      foreach ($pattern in $hookPatterns) {
        if ($line -eq $pattern) { $skip = $true; break }
      }
      -not $skip
    }
    $content = ($filtered -join "`n")
    $combined += "`n// ========== $s ==========`n$content`n"
    Write-Host "  + $s OK"
  }
  else {
    Write-Host "  ! $s NAO ENCONTRADO" -ForegroundColor Red
  }
}

$htmlPath = Join-Path $root "index.html"
$html = Get-Content $htmlPath -Raw -Encoding UTF8

# Remove tags de script externas com type text/babel
$html = $html -replace '(?s)\s*<script type="text/babel" src="[^"]+"></script>', ''

# Insere codigo combinado como script inline antes de </body>
$inlineScript = @"
  <script type="text/babel">
$combined
  </script>
"@

$html = $html -replace '</body>', "$inlineScript`n</body>"

$outPath = Join-Path $root "dashboard.html"
[System.IO.File]::WriteAllText($outPath, $html, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "dashboard.html gerado com sucesso!" -ForegroundColor Green
Write-Host "Abra o arquivo dashboard.html no navegador." -ForegroundColor Cyan
