<div align="center">
  <h1>A11yWatch Lite</h1>
  <p>
    <strong>包括的であり続けるための高速で正確かつ洗練されたウェブアクセシビリティ自動化ツール</strong>
  </p>
  <p>

[![crates.io](https://img.shields.io/crates/v/a11ywatch_cli?label=latest)](https://docs.rs/crate/a11ywatch_cli/latest)
![MIT](https://img.shields.io/crates/l/a11ywatch_cli.svg)

  </p>
</div>

[![en](https://img.shields.io/badge/lang-en-white.svg)](README.md)
[![es](https://img.shields.io/badge/lang-es-teal.svg)](README.es.md)

A11yWatch Liteは、A11yWatch（有料のホステッドウェブアクセシビリティおよびVitalsツール）の以前のオープンソースバージョンです。これは当社のソフトウェアの最初のバージョンであり、多くのダウンロードがありました！

このLiteバージョンには新しい機能を追加していませんが、長期間にわたってメンテナンスを続け、発生したバグを修正していきます。

## A11yWatch Lite と A11yWatch の比較

A11yWatchは、A11yWatch Liteよりも詳細で機能が豊富で、さらに高速です。[今日無料でA11yWatchにサインアップ](https://a11ywatch.com/ja)してください。有料アカウントには高性能なAPI統合が提供されます。これにより、財布を大幅に節約し、自然環境も改善することができます。A11yWatch以外の現在のツールによるウェブアクセシビリティ自動化は、レイテンシのコスト、不適切なアルゴリズムやプロトコルによるエネルギーおよびCPUサイクルの浪費など、さまざまな問題が発生する可能性があります。また、専門知識と必要な専念が必要ですが、A11yWatchは、速度、効率、正確性、包括性テストのカバレッジの点で、他のどのツールよりも優れた自動化ツールです。

## 前提条件

* [Rust](https://www.rust-lang.org/tools/install) ローカルで構築する場合は必須です。
* [Nodejs](https://nodejs.org/en/download/) ローカルで構築する場合は必須です。
* [Docker](https://docs.docker.com/get-docker/) ローカルで構築していない場合は必須です。

## インストール中

[CLI](./cli/README.md) どこでも独自のインスタンスをテストして構築するために使用できます。<br>
複数の言語とプロトコルで利用できる[クライアント](./clients)は、アプリとの統合を容易にします。<br>
開発の開始などの詳細については、[ドキュメントを参照してください。](https://docs.a11ywatch.com)

## 入門

最速かつ最も正確な Web アクセシビリティ プラットフォームの使用を開始するには、クラウド、CLI、Docker、またはサイドカーの中から選択してください。

### A11yWatch 雲

[A11yWatch 雲](https://a11ywatch.com) は、A11yWatch を始めるための最も早い方法です。管理されたインフラストラクチャを提供するだけでなく、開発プロジェクトやコンセプトへの即時かつ無料のアクセスも提供します。

A11yWatch 雲 のステップバイステップ ガイドについては、[ドキュメントを参照してください](https://docs.a11ywatch.com/documentation/cloud/).

### A11yWatch CLI

[A11yWatch CLI](./cli/README.md) は、A11yWatch を開始するための別の方法です。インフラストラクチャを管理するツール、対話型の強力なコマンドが提供され、Github Actions などのツールを使用してワークフローを自動化する機能もあります。

を使用した有効なインスタンスを使用した複数ページ クロールの例 `a11ywatch_cli v0.8.23`:

https://user-images.githubusercontent.com/8095978/200062932-22fd962e-1e9a-4b56-9200-f19bdc5e6da8.mp4

一歩ずつ [ドキュメントを参照してください](https://docs.a11ywatch.com/documentation/cli/).

### Docker

を使用して開始することもできます。[standlone docker image](https://hub.docker.com/r/a11ywatch/a11ywatch) ローカルまたはセルフホストします。

新しいフォルダーに有効な Docker をインストールして、次のコマンドを実行します (macOS では `latest` を `darwin` に置き換えるか、`IMAGE` 環境変数を使用します)。

```sh
# フロントエンドとバックエンドのブリッジネットワークを作成する
docker network create --driver bridge a11ywatch-net
# バックエンドを開始する
docker run -p 3280:3280 -v ${PWD}:/a11ywatch/conf \
  --network a11ywatch-net \
  --name a11ywatch-backend \
  -e SUPER_MODE=true \
  a11ywatch/a11ywatch:${IMAGE:-latest}
# フロントエンドを開始する
docker run -p 3000:3000 -v ${PWD}:/a11ywatch/conf \
  --network a11ywatch-net \
  --name a11ywatch-frontend \
  -e SUPER_MODE=true \
  a11ywatch/web
```

その後オープン http://localhost:3000 続行するにはブラウザで をクリックしてください。

ライブ更新を使用して複数の Web サイトをクロールするダッシュボードの例:

https://user-images.githubusercontent.com/8095978/211600555-086516d9-403c-42bf-9f80-6e7da2354f40.mp4

ステップバイステップの説明については、 [ドキュメントを見る](https://docs.a11ywatch.com/documentation/self-hosting-start/).

### サイドカー

システムを A11yWatch と統合したい場合、最も簡単な方法は JavaScript を使用することです。[サイドカー](https://github.com/a11ywatch/sidecar).
サイドカーはユーティリティ メソッドを提供し、nodejs と統合するためにシステムをローカルで起動します。

## 発達

を表示します。[貢献ドキュメント](https://docs.a11ywatch.com/documentation/contributing/) 始めるために。

## [ベンチマーク](./benchmarks)

以下のベンチマークは、Apple M1 Max 64gb メモリで実行されています。

### 地元 (遅延なし)

場合: `https://a11ywatch.com` マルチサイトスキャン。
10x 遅延を避けるために、同時実行はそれぞれローカルホスト経由で実行されました。

|                                                            | `libraries`       |
| :--------------------------------------------------------- | :---------------- |
| **`Rust[A11yWatch]: crawl 10 times against 30 urls`**      | `10 ms`          |
| **`Nodejs[Pa11y-Wave]: crawl 10 times against 25 urls`**   | `63 s`            |
| **`Nodejs[Axe-Deque]: crawl 10 times against 25 urls`**    | `113 s`           |

### 外部の (レイテンシ)

を使用したベンチマーク [CLI](./cli/) と [hyperfine](https://github.com/sharkdp/hyperfine) ネットワーク遅延が発生します。

単一ページのスキャン:

```
hyperfine 'a11ywatch scan -u https://a11ywatch.com' 

基準 1: a11ywatch scan -u https://a11ywatch.com
  Time (mean ± σ):     109.44 ms ±  10 ms    [User: 1.9 ms, System: 2.8 ms]
  Range (min … max):   98.35 ms … 154.3 ms    11 runs
```

複数ページのスキャン (30 ページ):

```
hyperfine 'a11ywatch crawl -u https://a11ywatch.com' 

基準 1: a11ywatch crawl -u https://a11ywatch.com
  Time (mean ± σ):      0.6715 s ±  0.026 s    [User: 0.003 s, System: 0.003 s]
  Range (min … max):    0.6355 s …  0.714 s    10 runs
```

A11yWatch は、動的なパラメータとレポートのカバレッジ量を処理するため、信頼性を高めるのに役立ちます。
このシステムは、Linux 上で 8 GB のメモリを搭載し、1 分以内に最大 100 万ページを苦労することなく処理できます。

## [統合例](https://github.com/a11ywatch/a11ywatch-examples)

システムとの統合方法に関するいくつかの例。の使用方法を学びます [react-a11ywatch-js](https://github.com/a11ywatch/react-a11ywatch-js) カスタム製品またはツールを構築するためのフックとコンポーネント ライブラリ。

## サポート

サポートが必要な場合は、まず、 [トラブルシューティングガイド](https://docs.a11ywatch.com/documentation/troubleshooting),
まだサポートが必要な場合は、お問い合わせください [コンタクト](https://docs.a11ywatch.com/documentation/contact).

## ライセンス

プロジェクトのルートにあるライセンス ファイルを確認します。
