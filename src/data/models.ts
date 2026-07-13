import { t, type Locale, type TranslationKey } from '../i18n/utils';

export interface ModelMeta {
  vendor: string;
  blurbKey: TranslationKey;
  contextLength: number;
}

export interface ModelInfo {
  name: string;
  slug: string;
  call_price: number;
  usdPerCall: number;
  formats: string[];
  vendor: string;
  blurb: string;
  contextLength: number;
}

const META: Record<string, ModelMeta> = {
  'MiniMax-M2.7': {
    vendor: 'MiniMax',
    blurbKey: 'models.blurb.minimax-m2-7',
    contextLength: 204800
  },
  'MiniMax-M2.7-highspeed': {
    vendor: 'MiniMax',
    blurbKey: 'models.blurb.minimax-m2-7-highspeed',
    contextLength: 204800
  },
  'MiniMax-M3': {
    vendor: 'MiniMax',
    blurbKey: 'models.blurb.minimax-m3',
    contextLength: 1048576
  },
  'kimi-k2.6': {
    vendor: 'Moonshot AI',
    blurbKey: 'models.blurb.kimi-k2-6',
    contextLength: 262144
  },
  'glm-5.2': {
    vendor: 'Z.ai',
    blurbKey: 'models.blurb.glm-5-2',
    contextLength: 1048576
 },
 'deepseek-v4-pro': {
   vendor: 'DeepSeek',
   blurbKey: 'models.blurb.deepseek-v4-pro',
   contextLength: 128000
 }
};

const FALLBACK_PRICING = [
  { model_name: 'MiniMax-M2.7', call_price: 250, group: 'Callcount' },
  { model_name: 'MiniMax-M2.7-highspeed', call_price: 250, group: 'Callcount' },
  { model_name: 'MiniMax-M3', call_price: 750, group: 'Callcount' },
  { model_name: 'kimi-k2.6', call_price: 1250, group: 'Callcount' },
  { model_name: 'glm-5.2', call_price: 1500, group: 'Callcount' },
  { model_name: 'deepseek-v4-pro', call_price: 750, group: 'Callcount' }
];

const FALLBACK_FORMATS: Record<string, string[]> = {
  'MiniMax-M2.7': ['openai', 'anthropic'],
  'MiniMax-M2.7-highspeed': ['openai', 'anthropic'],
  'MiniMax-M3': ['openai', 'anthropic'],
  'kimi-k2.6': ['openai', 'anthropic'],
  'glm-5.2': ['openai', 'anthropic'],
  'deepseek-v4-pro': ['openai', 'anthropic']
};

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const usdFromCallPrice = (cp: number) => cp / 500000;

async function fetchJson(url: string): Promise<any> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getModels(locale: Locale = 'en'): Promise<ModelInfo[]> {
  const [pricingRes, formatsRes] = await Promise.all([
    fetchJson('https://api.apilane.one/api/pricing/public'),
    fetchJson('https://api.apilane.one/api/option/model-formats')
  ]);

  const pricing: Array<{ model_name: string; call_price: number; group: string }> =
    pricingRes && Array.isArray(pricingRes.data) ? pricingRes.data : FALLBACK_PRICING;

  let formats: Record<string, string[]> = FALLBACK_FORMATS;
  if (formatsRes && typeof formatsRes.data === 'string') {
    try {
      formats = JSON.parse(formatsRes.data);
    } catch {
      // keep fallback
    }
  }

  return pricing
    .filter((m) => m && m.model_name && META[m.model_name])
    .map((m) => {
      const meta = META[m.model_name];
      return {
        name: m.model_name,
        slug: slugify(m.model_name),
        call_price: m.call_price,
        usdPerCall: usdFromCallPrice(m.call_price),
        formats: formats[m.model_name] || ['openai'],
        vendor: meta.vendor,
        blurb: t(locale, meta.blurbKey),
        contextLength: meta.contextLength
      };
    });
}

export const fmtUsd = (usd: number) =>
  usd >= 0.01 ? `$${usd.toFixed(3)}/call` : `$${usd.toFixed(5)}/call`;

export const fmtContext = (n: number) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return `${n}`;
};
