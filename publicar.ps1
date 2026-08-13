# Script de Publicação e Controle de Cache (Onra)
# Limpa o cache automaticamente e envia para o GitHub.

$timestamp = [int][double]::Parse((Get-Date (Get-Date).ToUniversalTime() -UFormat %s))

Write-Host "Atualizando versoes de cache no index.html..." -ForegroundColor Cyan

# Lê o arquivo com codificação correta
$content = Get-Content index.html -Raw -Encoding UTF8

# Substitui as versões antigas pelo timestamp atual (Cache Busting Automático)
$content = $content -replace 'styles\.css\?v=[\d\.]+', "styles.css?v=$timestamp"
$content = $content -replace 'app\.js\?v=[\d\.]+', "app.js?v=$timestamp"

# Salva o arquivo preservando UTF-8 sem BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($False)
[System.IO.File]::WriteAllText("$PSScriptRoot\index.html", $content, $utf8NoBom)

Write-Host "Iniciando commit e push para o GitHub..." -ForegroundColor Yellow

git add .
git commit -m "fix: corrige bug de acentuacao utf-8 no index.html (v=$timestamp)"
git push origin HEAD

Write-Host "Publicacao concluida com sucesso! O cache foi renovado." -ForegroundColor Green
