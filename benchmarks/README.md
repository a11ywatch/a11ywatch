# benches

## Table of Contents

- [Overview](#overview)
- [Benchmark Results](#benchmark-results)
  - [crawl-speed](#crawl-speed)

This folder consists of benches between different cases within the library and including comparison between other choices.

We only run benches of A11yWatch in this project.

The comparisons for the results on other projects come from our [github-actions](https://github.com/a11ywatch/github-actions/tree/main/.github/workflows) project.

## Overview

We have comparisons set against different languages and libs that can be used to crawl a web page.

## Benchmark Results

#### crawl-speed (Small Website)

Case: `https://a11ywatch.com` multi site scan.
10x simultaneous runs each ran via localhost to avoid latency.

|                                                            | `libraries`            |
| :--------------------------------------------------------- | :--------------------- |
| **`Rust[a11ywatch]: with crawl 10 times against 28 urls`** | `20 ms` (**1.00x**)    |
| **`Nodejs[Pa11y]: with crawl 10 times against 25 urls`**   | `63 s` (**1.00x**)     |
| **`Nodejs[Axe]: with crawl 10 times against 25 urls`**     | `113 s` (**1.00x**)    |

#### crawl-speed (Large Website)

Test url: `https://www.hbo.com`

7500 pages.

runs with 10 samples:

|                        | `libraries`               |
| :--------------------- | :------------------------ |
| **`A11yWatch: crawl`** | `2.5 mins` (✅ **1.00x**) |
| **`Pa11y-CI: crawl`**  | `50+ hr` (✅ **1.00x**)   |
| **`Axe: crawl`**       | `N/A` (✅ **1.00x**)      |
