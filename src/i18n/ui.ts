export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localeLabels: Record<Locale, string> = { en: 'English', zh: '中文' };
export const localeHtmlLang: Record<Locale, string> = { en: 'en', zh: 'zh-CN' };

export const translations = {
  'nav.models': { en: 'Models', zh: '模型' },
  'nav.pricing': { en: 'Pricing', zh: '定价' },
  'nav.features': { en: 'Features', zh: '特性' },
  'nav.faq': { en: 'FAQ', zh: '常见问题' },
  'nav.signin': { en: 'Sign in', zh: '登录' },
  'nav.language': { en: 'Language', zh: '语言' },
  'nav.blog': { en: 'Blog', zh: '博客' },

  'blog.page_title': { en: 'Blog - apilane', zh: '博客 - apilane' },
  'blog.description': { en: 'Practical guides on cutting LLM API costs, crypto-friendly providers, and per-call pricing.', zh: '降低 LLM API 成本、加密友好厂商、按次计费的实用指南。' },
  'blog.h1': { en: 'Blog', zh: '博客' },
  'blog.intro': { en: 'Numbers-first writing on LLM API costs, pricing models, and provider selection.', zh: '用数字说话，聊 LLM API 成本、计费模式与厂商选择。' },
  'blog.min_read': { en: 'min read', zh: '分钟阅读' },
  'blog.updated_label': { en: 'Updated {date}', zh: '更新于 {date}' },
  'blog.back': { en: 'All posts', zh: '全部文章' },
  'blog.faq_title': { en: 'FAQ', zh: '常见问题' },
  'blog.cta_text': { en: 'Ready to ship on a per-call API with crypto payment?', zh: '准备好在支持加密支付的按次计费 API 上线了吗？' },
  'blog.cta_button': { en: 'Get your API key', zh: '获取你的 API Key' },

  'hero.badge': { en: 'Pay per call · Crypto accepted · No subscription', zh: '按次计费 · 支持加密货币 · 无需订阅' },
  'hero.title_before': { en: 'Affordable AI models, ', zh: '高性价比 AI 模型，' },
  'hero.title_highlight': { en: 'pay per call', zh: '按次计费' },
  'hero.title_after': { en: '', zh: '' },
  'hero.subtitle': { en: 'Tested models, pay per call from $2. Crypto accepted. OpenAI-compatible - change your base_url and ship.', zh: '实测可用模型，按次计费，$2 起充。支持加密货币，兼容 OpenAI——改个 base_url 即可上线。' },
  'hero.cta_primary': { en: 'Get API key', zh: '获取 API Key' },
  'hero.cta_secondary': { en: 'View pricing', zh: '查看定价' },
  'hero.note': { en: 'Official prices at 1/10 to 1/60 · $2 / $5 / $10 / $20 tiers · USDT (TRC20/BSC)', zh: '官方价格的 1/10 至 1/60 · $2 / $5 / $10 / $20 档位 · USDT（TRC20/BSC）' },

  'stats.tested_models': { en: 'tested models', zh: '实测模型' },
  'stats.official_price': { en: 'of official price', zh: '官方价格' },
  'stats.min_deposit': { en: 'minimum deposit', zh: '最低充值' },
  'stats.prompt_storage': { en: 'prompt storage', zh: '存储 Prompt' },

  'pricing.title': { en: 'Pay per call, not per token', zh: '按次计费，不按 Token' },
  'pricing.subtitle': { en: 'Predictable flat pricing per API call. No token math, no surprise bills. Prices fetched live from the public API.', zh: '每次调用一口价，无需算 Token，没有意外账单。价格实时从公开 API 拉取。' },
  'pricing.col_model': { en: 'Model', zh: '模型' },
  'pricing.col_price': { en: 'Price per call', zh: '每次价格' },
  'pricing.unit_note': { en: 'call_price unit: quota. 500,000 quota = $1, so 250 = $0.0005/call.', zh: 'call_price 单位：quota。500,000 quota = $1，即 250 = $0.0005/次。' },
  'pricing.status_loading': { en: 'loading…', zh: '加载中…' },
  'pricing.status_live': { en: 'live', zh: '实时' },
  'pricing.status_offline': { en: 'offline - showing snapshot', zh: '离线——显示快照' },
  'pricing.note': { en: "Only models we've actually tested are listed here. If an upstream provider becomes unstable, we swap it out - that's part of how prices stay this low.", zh: '这里只列我们实测过的模型。如果上游供应商不稳定，我们会替换——这也是价格能保持这么低的原因之一。' },
  'pricing.browse_all': { en: 'Browse all models', zh: '浏览全部模型' },

  'features.title': { en: 'Built for cost-sensitive builders', zh: '为在意成本的开发者打造' },
  'features.subtitle': { en: "Everything you need to ship. Nothing you don't.", zh: '该有的都有，不该有的一样没有。' },
  'features.f1_title': { en: 'Pay per call', zh: '按次计费' },
  'features.f1_desc': { en: 'Flat price per request. No token-counting, no surprise bills. Idle months cost nothing.', zh: '每次请求一口价。无需数 Token，没有意外账单。闲置月份零成本。' },
  'features.f2_title': { en: 'Crypto payment', zh: '加密货币支付' },
  'features.f2_desc': { en: 'USDT (TRC20, BSC) via epusdt. No credit card required.', zh: '通过 epusdt 支持 USDT（TRC20、BSC）。无需信用卡。' },
  'features.f3_title': { en: 'OpenAI-compatible', zh: '兼容 OpenAI' },
  'features.f3_desc': { en: "Point your existing SDK's base_url at api.apilane.one/v1. Zero migration cost, works with the openai Python/Node SDKs.", zh: '把现有 SDK 的 base_url 指向 api.apilane.one/v1 即可。零迁移成本，兼容 openai Python/Node SDK。' },
  'features.f4_title': { en: 'No data storage', zh: '不存数据' },
  'features.f4_desc': { en: 'Prompts are forwarded and discarded. API keys live in memory for routing only - never logged, never persisted.', zh: 'Prompt 转发后即丢弃。API Key 仅存于内存用于路由——绝不记录、绝不持久化。' },
  'features.f5_title': { en: 'No subscription', zh: '无需订阅' },
  'features.f5_desc': { en: 'No monthly fee, no platform fee, no lock-in. Deposit $2, call until it runs out, top up when you need more.', zh: '无月费、无平台费、无锁定。充 $2，用到用完，需要时再充。' },
  'features.f6_title': { en: 'Multi-format adapters', zh: '多格式适配' },
  'features.f6_desc': { en: 'OpenAI and Anthropic request formats both supported. One endpoint, every model, your preferred schema.', zh: '同时支持 OpenAI 和 Anthropic 请求格式。一个端点，所有模型，你习惯的格式。' },

  'code.title': { en: 'Two minutes to your first call', zh: '两分钟完成第一次调用' },
  'code.subtitle': { en: "OpenAI-compatible. If your code already calls OpenAI, you're done.", zh: '兼容 OpenAI。如果你的代码已经在调 OpenAI，基本就完成了。' },
  'code.python': { en: 'Python', zh: 'Python' },
  'code.curl': { en: 'curl', zh: 'curl' },

  'trust.title': { en: 'Trust & security', zh: '信任与安全' },
  'trust.subtitle': { en: "Low prices don't have to mean shady. Here's exactly what we do and don't do with your data.", zh: '价格低不等于不靠谱。下面是我们对数据做了什么、没做什么，全部说清楚。' },
  'trust.t1_title': { en: 'No prompt storage', zh: '不存 Prompt' },
  'trust.t1_desc': { en: 'Requests are forwarded to upstream and discarded immediately. We never store your prompt content.', zh: '请求转发给上游后立即丢弃。我们绝不存储你的 Prompt 内容。' },
  'trust.t2_title': { en: 'API keys stay in memory', zh: 'API Key 仅存内存' },
  'trust.t2_desc': { en: 'Your key is loaded for routing and never written to disk or logs. Rotate anytime from the console.', zh: '你的 Key 仅加载用于路由，绝不写入磁盘或日志。可随时在控制台轮换。' },
  'trust.t4_title': { en: 'Responses passed through unmodified', zh: '响应原样透传' },
  'trust.t4_desc': { en: 'We do not rewrite, filter, or inspect model responses. What the model returns is what you get.', zh: '我们不重写、不过滤、不检查模型响应。模型返回什么，你就收到什么。' },

  'faq.title': { en: 'FAQ', zh: '常见问题' },
  'faq.q1': { en: 'How do you keep prices this low?', zh: '为什么价格能这么低？' },
  'faq.a1': { en: 'We aggregate multiple upstream providers and route calls efficiently, passing the savings to you. Per-call pricing also means you only pay for what you use - no idle capacity fees. Prices run 1/10 to 1/60 of official API rates depending on the model.', zh: '我们聚合多个上游供应商并高效路由调用，把省下的成本让给你。按次计费也意味着只为实际使用付费——没有闲置容量费。价格根据模型不同，是官方 API 的 1/10 至 1/60。' },
  'faq.q2': { en: 'Do you store my prompts?', zh: '你们会存我的 Prompt 吗？' },
  'faq.a2': { en: 'No. Prompts are forwarded to the upstream model and discarded immediately. API keys are held in memory for routing only - never written to disk, never logged.', zh: '不会。Prompt 转发给上游模型后立即丢弃。API Key 仅存于内存用于路由——绝不写入磁盘、绝不记录。' },
  'faq.q3': { en: 'How do I pay?', zh: '怎么付费？' },
  'faq.a3': { en: 'Deposit $2, $5, $10, or $20. We accept USDT (TRC20, BSC) via epusdt. No credit card required.', zh: '充值 $2、$5、$10 或 $20。我们通过 epusdt 收 USDT（TRC20、BSC）。无需信用卡。' },
  'faq.q4': { en: 'Is this OpenAI-compatible?', zh: '兼容 OpenAI 吗？' },
  'faq.a4': { en: 'Yes. The endpoint at api.apilane.one/v1 is fully OpenAI-compatible. Any code using the official openai Python or Node.js SDK works by changing only base_url and the API key. Anthropic-format requests are also supported.', zh: '兼容。api.apilane.one/v1 端点完全兼容 OpenAI。任何用官方 openai Python 或 Node.js SDK 的代码，只需改 base_url 和 API Key 即可。也支持 Anthropic 格式请求。' },
  'faq.q5': { en: 'What models are supported?', zh: '支持哪些模型？' },
  'faq.a5': { en: 'The pricing table above lists every per-call model we currently offer - MiniMax-M3, kimi-k2.6, glm-5.2 and others. We only list models we have actually tested. If an upstream provider becomes unstable, we swap it out, which is part of how we keep prices low.', zh: '上面的定价表列了我们目前提供的所有按次计费模型——MiniMax-M3、kimi-k2.6、glm-5.2 等。我们只列实测过的模型。如果上游供应商不稳定，我们会替换，这也是保持低价的方式之一。' },
  'faq.q6': { en: 'What if my upstream fails?', zh: '上游挂了怎么办？' },
  'faq.a6': { en: 'If a provider is down, requests fail fast and you are not charged for failed calls. You can retry or switch models. Live status is at status.apilane.one.', zh: '如果供应商宕机，请求会快速失败，失败调用不扣费。你可以重试或切换模型。实时状态见 status.apilane.one。' },

  'finalcta.title': { en: 'Start building for $2', zh: '$2 起步开始开发' },
  'finalcta.subtitle': { en: 'Deposit two dollars. Make real API calls. No subscription, no credit card.', zh: '充两美元，发起真实 API 调用。无需订阅，无需信用卡。' },
  'finalcta.cta': { en: 'Get your API key', zh: '获取你的 API Key' },

  'footer.console': { en: 'Console', zh: '控制台' },
  'footer.status': { en: 'Status', zh: '状态' },
  'footer.copyright': { en: 'Pay per call. Crypto accepted.', zh: '按次计费。支持加密货币。' },

  'models.title': { en: 'Models', zh: '模型' },
  'models.description': { en: 'All tested AI models available on apilane with flat per-call pricing.', zh: 'apilane 上所有实测可用的 AI 模型，按次一口价计费。' },
  'models.page_title': { en: 'Models - apilane', zh: '模型 - apilane' },
  'models.h1': { en: 'Models', zh: '模型' },
  'models.intro': { en: 'Every model below is one we have actually tested. Flat price per call - no token math. If an upstream provider becomes unstable, we swap it out.', zh: '下面的每个模型我们都实测过。按次一口价——无需算 Token。如果上游供应商不稳定，我们会替换。' },
  'models.ctx_label': { en: 'ctx', zh: '上下文' },

  'detail.back': { en: 'All models', zh: '全部模型' },
  'detail.flat_per_call': { en: 'flat, per call', zh: '一口价，按次' },
  'detail.ctx': { en: 'Context', zh: '上下文' },
  'detail.ctx_unit': { en: 'tokens', zh: 'Token' },
  'detail.pricing': { en: 'Pricing', zh: '计费' },
  'detail.per_call': { en: 'per call', zh: '按次' },
  'detail.protocols': { en: 'Protocols', zh: '协议' },
  'detail.call_price': { en: 'call_price', zh: 'call_price' },
  'detail.quick_start': { en: 'Quick start', zh: '快速开始' },
  'detail.get_key': { en: 'Get API key', zh: '获取 API Key' },
  'detail.compare': { en: 'Compare models', zh: '对比模型' },
  'detail.title_suffix': { en: 'API', zh: 'API' },

  'models.blurb.minimax-m2-7': { en: 'Cost-efficient general-purpose model from MiniMax. Good for chat and lightweight tasks.', zh: 'MiniMax 的高性价比通用模型。适合聊天和轻量任务。' },
  'models.blurb.minimax-m2-7-highspeed': { en: 'High-speed variant of MiniMax M2.7 with lower latency, same capability.', zh: 'MiniMax M2.7 的高速版本，延迟更低，能力相同。' },
  'models.blurb.minimax-m3': { en: 'MiniMax flagship model. Stronger reasoning and coding for harder tasks.', zh: 'MiniMax 旗舰模型。推理和编码更强，适合更难的任务。' },
  'models.blurb.kimi-k2-6': { en: 'Kimi K2.6 from Moonshot AI. Long-context model good for document-heavy workflows.', zh: '月之暗面 Kimi K2.6。长上下文模型，适合文档密集型工作流。' },
  'models.blurb.glm-5-2': { en: 'GLM 5.2 from Z.ai. Balanced model for bilingual (Chinese/English) use cases.', zh: 'Z.ai 的 GLM 5.2。均衡模型，适合中英双语场景。' }
} as const;

export type TranslationKey = keyof typeof translations;

export function t(locale: Locale, key: TranslationKey): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en ?? key;
}
