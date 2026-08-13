# Script para empacotar o site para envio manual na HostGator (cPanel)

$zipFileName = "site-onra-hostgator.zip"
$excludeList = @(".git", ".github", "*.ps1", "*.py", "*.zip", "README.md", "INSTRUCOES_RAPIDAS.txt")

Write-Host "Iniciando empacotamento do site para envio à HostGator..." -ForegroundColor Cyan

# Se já houver um zip antigo, remove
if (Test-Path $zipFileName) {
    Remove-Item $zipFileName -Force
}

# Cria o arquivo ZIP ignorando arquivos inúteis
Compress-Archive -Path "assets", "css", "docs", "js", "index.html", "robots.txt", "site.webmanifest", "sitemap.xml" -DestinationPath $zipFileName -Force

Write-Host "Concluido! O arquivo $($zipFileName) foi gerado." -ForegroundColor Green
Write-Host "Dica: Faca upload desse arquivo pelo cPanel (Gerenciador de Arquivos) dentro da pasta public_html e clique em 'Extrair'." -ForegroundColor Yellow
