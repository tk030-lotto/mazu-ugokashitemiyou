# 「まず動かしてみよう。ツール」Webアプリケーション開発計画

「躊躇してないで、とにかく作ってみよう。シリーズ」第4弾『まず動かしてみよう。ツール』のWebアプリケーション本体（GitHub Pages対応、Zero-Dependency Vanilla HTML/CSS/JS）を開発します。

## 開発概要

仕様書（`まず動かしてみよう。仕様書.md`）およびプロトコル全18条（特に第18条 UI/UXデザイン標準、第16条 Zero-Dependency First、第17条 巨大ファイル分割）に準拠し、スマートフォンファーストかつPCにも最適化されたモダンなWebアシスタントを構築します。

### 1. アーキテクチャとファイル構成
- **Zero-Dependency Vanilla Web App**: 外部ライブラリを一切排除し、高速・セキュア・オフライン親和性の高い構成
- **ファイル分割構成**:
  - `index.html`: セマンティックHTML5、アクセシビリティ（ARIA）、OGP・SEOメタタグ
  - `css/tokens.css`: ミニマル・ダークUIデザイントークン（`#09090b`、`#121215`、`#27272a`、`Inter` / `JetBrains Mono`）
  - `css/components.css`: カード、ボタン、入力エリア、プリセットチップ、ステップバッジ、トースト、モーダル
  - `css/screens.css`: 起動画面、入力画面、質問生成結果画面、動作確認・実行結果画面のレスポンシブレイアウト
  - `app.js`: 状態管理、動的質問生成エンジン、クリップボードAPI、画面遷移・フィードバック制御
  - `LICENSE`: MIT License
  - `.nojekyll`: GitHub Pages静的配信設定
  - `README.md`: MITライセンス全文記載とアプリ紹介

### 2. コア機能の実装
1. **起動・イントロダクション**
   - シリーズ第4弾バッジ
   - 「AIが作ってくれた。じゃあ、まず動かしてみよう。」のコンセプト提示と開始ボタン
2. **入力エリア＆プリセット選択**
   - 「何を作ってもらいましたか？」の自由入力エリア
   - クイック入力チップ（「Windows用のファイル名変更ツール」「Pythonで作ったCSV集計ツール」「HTMLで作ったWebアプリ」「画像を一括変換するツール」）
   - 任意補足情報（使用している言語・OS・ファイル構成等の簡易入力アコーディオン）
3. **AI実行方法確認用質問の自動生成エンジン**
   - 入力内容を解析し、AIへ送るべき最適な質問文（必要環境、使用ファイル、起動手順、実行時確認事項、エラー時の初動）を即時生成
4. **結果表示・操作機能**
   - 生成質問のワンクリックコピー（クリップボードAPI ＆ トーストフィードバック）
   - 質問文のインライン直接編集・修正機能
   - 再生成・入力やり直しボタン
5. **動作確認・実行結果ガイド（シリーズ連携）**
   - 実行時のセルフチェックリスト（起動したか、画面が出たか、機能が動いたか、エラーはないか）
   - ［動きました！］→ 完了・お祝い・次のステップ案内
   - ［エラーが出ました］→ 次回作『エラーで止まらない。』への導線・AIへのエラー相談プロンプト生成への誘導

## User Review Required

> [!IMPORTANT]
> UIはシリーズ一貫性およびプロトコル第18条に準拠した「ミニマル・ダークUI（#09090b基調、Inter/JetBrains Mono、スマートフォン最適化）」で構築します。

## Proposed Changes

### Webアプリケーション本体の実装

#### [NEW] [css/tokens.css](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/css/tokens.css)
#### [NEW] [css/components.css](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/css/components.css)
#### [NEW] [css/screens.css](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/css/screens.css)
#### [NEW] [index.html](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/index.html)
#### [NEW] [app.js](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/app.js)
#### [NEW] [LICENSE](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/LICENSE)
#### [NEW] [.nojekyll](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/.nojekyll)
#### [MODIFY] [README.md](file:///c:/Users/tk030/Desktop/まず動かしてみよう。ツール/README.md)

## Verification Plan

### Automated / Browser Verification
- 各種HTML/CSS/JSファイルの構文検証
- ブラウザサブエージェント（またはローカルHTTPサーバーによる表示検証）によるUI表示・レスポンシブデザイン・ボタン操作・クリップボードコピー・画面遷移の動作検証
- マイクロコミットおよびGit Push
- `RECORD.md` および永続保存先への更新反映
