@echo off
chcp 932 > nul
title 【まず動かしてみよう。ツール】GitHubページ公開

powershell -ExecutionPolicy Bypass -File "%~dp0scripts\publish_pages.ps1"

pause
