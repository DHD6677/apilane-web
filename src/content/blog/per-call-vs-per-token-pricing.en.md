---
slug: per-call-vs-per-token-pricing
locale: en
title: "Per-Call vs Per-Token Pricing: Why Predictable API Costs Matter for Developers"
description: "Per-token pricing is transparent but hard to predict. Learn how per-call API pricing gives developers fixed, predictable costs-and when each model makes sense."
pubDate: 2026-07-10
readingMinutes: 7
category: "Cost optimization"
heroImage: "/images/blog/per-call-vs-per-token-pricing-hero.png"
ogImage: "/images/blog/per-call-vs-per-token-pricing-hero.png"
faq:
  - question: "Is per-call pricing always cheaper than per-token?"
    answer: "No. Per-call pricing tends to be cost-effective for workloads with large, variable inputs. For short, uniform tasks with prompt caching, per-token pricing can be cheaper or comparable. Always compare using your actual token distribution and caching availability."
  - question: "Does per-call pricing mean unlimited tokens per request?"
    answer: "No. Each model has its own maximum context window, which applies regardless of pricing model. Check the model documentation for specific limits."
  - question: "Why is my per-token bill so unpredictable?"
    answer: "Per-token pricing is transparent but variable. In production, input lengths can range from hundreds to over 100,000 tokens per call depending on context size. The rate is public, but the total cost depends on how much context you send-which often varies more than you expect."
  - question: "What about per-token pricing with prompt caching?"
    answer: "Prompt caching is a legitimate and often cost-effective approach. When a provider caches repeated context prefixes, input costs drop significantly-sometimes by 90% or more. With deep cache discounts, per-token pricing can match per-call rates. The trade-off is that caching is not available from all model providers."
---

If you have ever opened an AI API bill and wondered why it was 3x higher than expected, you are not alone. The pricing model is often the root cause-and the gap between "average" and "actual" cost can be enormous.

Most AI API providers charge per token. The rate is published and transparent, but the final bill is not. In real production workloads, a single API call can consume anywhere from a few hundred tokens to over 100,000. One batch of long-form content generation or a code-heavy response, and your daily cost swings by an order of magnitude.

Per-call pricing takes a different approach: you pay a fixed amount per request, regardless of how many tokens flow through. It is not a universal replacement for per-token pricing, but for certain workloads-especially those with long, variable-length inputs-it can make the difference between a project that is financially viable and one that is not.

---

## The Real Token Counts in Production

Let us look at actual production data from a workload using MiniMax-M3. These are 20 consecutive API calls from a real application. The table shows input tokens (including cache hits), output tokens, and cache hit tokens for each call:

| Call | Input Tokens | Output Tokens | Cache Hit Tokens |
|------|-------------|--------------|-----------------|
| 1 | 627 | 128 | 245 |
| 2 | 42,363 | 353 | 42,240 |
| 3 | 41,851 | 405 | 40,960 |
| 4 | 40,710 | 251 | 40,192 |
| 5 | 40,153 | 541 | 39,680 |
| 6 | 38,728 | 1,034 | 38,528 |
| 7 | 37,929 | 701 | 36,992 |
| 8 | 36,268 | 772 | 34,944 |
| 9 | 34,918 | 81 | 128 |
| 10 | 33,576 | 169 | 64 |
| 11 | 114,538 | 391 | 112,384 |
| 12 | 112,378 | 1,908 | 110,336 |
| 13 | 110,132 | 2,207 | 94,208 |
| 14 | 93,780 | 470 | 128 |
| 15 | 95,536 | 754 | 95,382 |
| 16 | 95,383 | 2,998 | 91,528 |
| 17 | 91,529 | 571 | 91,383 |
| 18 | 91,384 | 70 | 90,373 |
| 19 | 93,361 | 996 | 89,493 |
| 20 | 89,494 | 868 | 86,092 |

Notice the pattern. Output tokens stay relatively small-between 70 and 3,000. But input tokens range from 627 to 114,538. Most of that input is cache hits (repeated system prompts and context), but from a per-token billing perspective, you still pay for it-either at full rate or at a discounted cache rate. A single call can consume 180x more input tokens than another call in the same batch.

This is what "transparent but unpredictable" actually looks like. The per-token rate is fully public, but your cost per API call can vary by 180x depending on how much context you send. If you are budgeting on averages, a few calls with large contexts can blow past your estimate for the entire month.

---

## What Per-Call Pricing Actually Does

Per-call pricing charges a fixed amount per request-$0.00150 for MiniMax-M3, for example. Whether the model receives 627 input tokens or 114,538, whether it generates 70 output tokens or 3,000, the cost is identical.

The practical impact is straightforward:

- **Budgeting by request count.** Multiply your expected calls by the per-call rate. That is your bill.
- **No surprise from large contexts.** Sending 100K tokens of context costs the same as sending 600.
- **Simpler cost monitoring.** Track request counts, not token meters.

This model has a clear trade-off: if your calls consistently have small inputs and small outputs, per-token pricing-especially with prompt caching discounts-could cost less. Per-call pricing tends to be most cost-effective when your workload has large, variable-length inputs with significant cache hits-the kind you see in code generation with large codebases, long-document processing, and context-heavy reasoning tasks.

---

## A Cost Comparison Using Real Data

Let us calculate what these 20 calls would cost under per-call pricing, and then show how the same workload behaves under two per-token scenarios using MiniMax's official platform rates. All per-token figures below come from the MiniMax Open Platform pricing page (June 2026; prices shown include the permanent 50% discount for ≤512K input tokens).

**Per-call pricing (apilane, MiniMax-M3)**
- Rate: $0.00150 per call
- Total: 20 calls x $0.00150 = **$0.0300**

**Per-token pricing without caching (MiniMax official standard)**
- Input rate: $0.30 per million tokens
- Output rate: $1.20 per million tokens
- Total input tokens: ~1,151,028 -> ~$0.345
- Total output tokens: ~15,785 -> ~$0.019
- Total: **~$0.364**

**Per-token pricing with prompt caching (MiniMax official standard)**
- Cached input rate: $0.06 per million tokens
- Uncached input rate: $0.30 per million tokens
- Output rate: $1.20 per million tokens
- Total cache hits: ~1,135,163 -> ~$0.068
- Total uncached input: ~15,865 -> ~$0.005
- Total output tokens: ~15,785 -> ~$0.019
- Total: **~$0.092**

In this specific workload, per-call pricing ($0.030) is roughly 1/12 of per-token pricing without caching ($0.364), and roughly 1/3 of per-token pricing with prompt caching ($0.092).

The key insight: prompt caching changes the math significantly. Without it, per-call pricing is a clear win for large-context workloads. With caching, the gap narrows-but per-call still provides a hard ceiling that per-token cannot. Your exact ratio depends on your provider's cache discount depth and your workload's token distribution.

---

## When Per-Token Pricing Wins

Per-token pricing has clear strengths that per-call cannot match:

- **Short, uniform workloads.** Classification, sentiment analysis, keyword extraction-where every call has small inputs and produces a few dozen output tokens. Per-token pricing is often more cost-efficient here.
- **Cache discounts.** When a provider offers prompt caching, repeated context prefixes cost a fraction of the normal input rate. For workloads with shared system prompts or large repeated contexts, cached per-token pricing can significantly narrow the gap with per-call rates-as the MiniMax official data above demonstrates, where caching cuts the per-token cost to roughly 1/4 of the uncached price.
- **Granular cost attribution.** You pay exactly for what you use, which matters in multi-tenant systems where you bill each user by their actual token consumption.

Per-token pricing with caching is a mature, well-understood model. It is the industry standard for good reason, and many providers implement it well. The challenge is that cache-discounted per-token pricing is not universally available-particularly for newer or non-tier-one models, where per-call upstream arrangements may be the only practical option.

---

## When Per-Call Pricing Fits

Per-call pricing tends to be the better fit when:

| Use case | Why it works |
|----------|-------------|
| Long-context processing | Input tokens range from thousands to 100K+; per-call absorbs the variance |
| Code generation with large codebases | Context size depends on the codebase, which you cannot shrink |
| Long-document analysis | Feeding full documents as context is standard; token counts are large |
| Prototyping & MVPs | You need a hard cost ceiling while validating product-market fit |
| Reselling AI features | You want to bundle AI calls into a flat per-request price for your users |

The common thread: high input-token variance. When your context size fluctuates widely and you cannot control it, a fixed per-call rate eliminates the financial risk.

---

## The Honest Summary

Both pricing models are legitimate tools. The right choice depends on your workload:

- **Small, predictable inputs with caching** -> per-token pricing with cache discounts is often more cost-efficient
- **Large, variable inputs without caching** -> per-call pricing gives you a cost ceiling that per-token cannot
- **Mixed workloads** -> run the numbers on your actual token distribution, not on hypothetical averages

At apilane, we currently offer per-call pricing for tested AI models starting at $0.00050 per request. There is no subscription, no minimum commitment, and you can start with $2. We chose this model because it suits the workloads our users run-and because per-call upstream arrangements are what is practically available for the models we offer today.

---

## Frequently Asked Questions

### Is per-call pricing always cheaper than per-token?

No. Per-call pricing tends to be cost-effective for workloads with large, variable inputs. For short, uniform tasks with prompt caching, per-token pricing can be cheaper or comparable. Always compare using your actual token distribution and caching availability.

### Does per-call pricing mean unlimited tokens per request?

No. Each model has its own maximum context window, which applies regardless of pricing model. Check the model documentation for specific limits.

### Why is my per-token bill so unpredictable?

Per-token pricing is transparent but variable. In production, input lengths can range from hundreds to over 100,000 tokens per call depending on context size. The rate is public, but the total cost depends on how much context you send-which often varies more than you expect.

### What about per-token pricing with prompt caching?

Prompt caching is a legitimate and often cost-effective approach. When a provider caches repeated context prefixes, input costs drop significantly-sometimes by 90% or more. With deep cache discounts, per-token pricing can match per-call rates. The trade-off is that caching is not available from all model providers.

---

*Want to see how per-call pricing works with your actual workload? [Get started with $2](https://api.apilane.one) and run your own numbers.*
