# benches

## Table of Contents

- [Overview](#overview)
- [Benchmark Results](#benchmark-results)
  - [crawl-speed](#crawl-speed)

This folder consists of benches between different cases within the library and including comparison between other choices.

## Overview

We have comparisons set against different languages and libs that can be used to crawl a web page.

## Benchmark Results

Case: `https://a11ywatch.com` multi site scan.
10x simultaneous runs each.

|                                                            | `libraries`          |
| :--------------------------------------------------------- | :------------------- |
| **`Rust[a11ywatch]: with crawl 10 times against 30 urls`** | `6 s` (✅ **1.00x**) |
