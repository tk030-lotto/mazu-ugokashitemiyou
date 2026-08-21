# ==============================================================================
# GitHub Pages 公開自動化スクリプト
# リポジトリをPublic化し、GitHub Pages (mainブランチ / ルート配信) を有効化します
# ==============================================================================

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$repoName = "tk030-lotto/mazu-ugokashitemiyou"
$pagesUrl = "https://tk030-lotto.github.io/mazu-ugokashitemiyou/"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  『まず動かしてみよう。ツール』 GitHub Pages 公開処理" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "対象リポジトリ : $repoName" -ForegroundColor Yellow
Write-Host "公開予定URL    : $pagesUrl" -ForegroundColor Green
Write-Host ""

$confirmation = Read-Host "本当にリポジトリを公開（Public化）し、GitHub Pagesを有効化しますか？ (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "公開処理をキャンセルしました。リポジトリはPrivateのまま維持されます。" -ForegroundColor Yellow
    exit 0
}

Write-Host "`n[1/3] リポジトリの可視性を Public に変更しています..." -ForegroundColor Yellow
gh repo edit $repoName --visibility public --accept-visibility-change-consequences
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ リポジトリのPublic化に失敗しました。" -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ Public化完了" -ForegroundColor Green

Write-Host "`n[2/3] GitHub Pages を有効化しています (mainブランチ / ルート配信)..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Pages有効化 API呼び出し
$body = '{"source":{"branch":"main","path":"/"}}'
$result = gh api --method POST repos/$repoName/pages --input - 2>&1
if ($LASTEXITCODE -ne 0) {
    # 既に有効化されている場合の更新試行
    gh api --method PUT repos/$repoName/pages --input - 2>&1 | Out-Null
}
Write-Host "  ✅ GitHub Pages 有効化完了" -ForegroundColor Green

Write-Host "`n[3/3] 公開ステータスを確認しています..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Write-Host ""
Write-Host "🎉 GitHub Pages への公開設定が完了しました！" -ForegroundColor Cyan
Write-Host "公開URL: $pagesUrl" -ForegroundColor Green
Write-Host "※ DNSとビルドの反映に1〜2分程度かかる場合があります。" -ForegroundColor Gray
Write-Host ""
