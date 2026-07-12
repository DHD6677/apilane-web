---
slug: anthropic-compatible-api
locale: en
title: "How to Use the Anthropic API Format with Any Provider"
description: "Using tools that expect the Anthropic API format? Learn how to configure custom base_url and model names to connect Claude Code, VS Code extensions, and the Anthropic SDK to any compatible provider."
pubDate: 2026-07-11
readingMinutes: 7
category: "Getting started"
heroImage: "/images/blog/anthropic-compatible-api-hero.png"
ogImage: "/images/blog/anthropic-compatible-api-hero.png"
faq:
  - question: "Which tools use the Anthropic API format?"
    answer: "Claude Code, the official Anthropic Python and TypeScript SDKs, and several VS Code extensions including Cline and Roo Code use the Anthropic API format. These tools expect the /v1/messages endpoint, x-api-key authentication, and the Anthropic-style request and response structure."
  - question: "Can I use the Anthropic SDK with a non-Anthropic provider?"
    answer: "Yes. The official Anthropic SDK supports a custom base_url. Set it to your provider's endpoint, pass your provider's API key, and use your provider's model names. The SDK will communicate using the Anthropic request format while the provider handles the actual inference."
  - question: "What model name should I use in the Anthropic format?"
    answer: "Use the provider's own model names, not Anthropic model names. For example, on apilane you would use glm-5.2, MiniMax-M3, or kimi-k2.6. The Anthropic format is just the communication protocol—the actual model is whatever your provider offers."
  - question: "Does the Anthropic format support streaming?"
    answer: "Yes. Set stream: true in your request, and the provider returns Server-Sent Events in the Anthropic streaming format. Your existing streaming handler should work without changes."
  - question: "Can I use Claude Code with a custom provider?"
    answer: "Claude Code supports custom API configuration through environment variables or config files. Set ANTHROPIC_API_KEY to your provider's key and ANTHROPIC_BASE_URL to your provider's endpoint. Then use the provider's model names instead of Claude model names."
---

# How to Use the Anthropic API Format with Any Provider

Some developer tools speak the OpenAI API format. Others speak the Anthropic format. If you are using Claude Code, the Anthropic SDK, or VS Code extensions built around the Anthropic API, switching to a compatible provider means understanding the format differences and updating a few configuration values.

This guide covers what the Anthropic API format looks like, how it differs from the OpenAI format, and how to configure common tools to use it with any provider that supports it.

---

## Why the Anthropic Format Exists as a Second Standard

The AI API landscape has two dominant formats. OpenAI's `/v1/chat/completions` is the more widely adopted of the two, but the Anthropic format—centered on `/v1/messages`—has its own ecosystem:

- **Claude Code**, the official CLI coding assistant from Anthropic, uses this format natively.
- **The Anthropic Python and TypeScript SDKs** are built around it.
- **Several VS Code extensions**—including Cline and Roo Code—support it as a first-class option.

If your workflow is already built on these tools, migrating to a provider that only supports the OpenAI format means switching tools or adding a translation layer. A provider that supports both formats lets you keep your existing setup.

---

## OpenAI Format vs Anthropic Format: The Real Differences

The two formats solve the same problem—sending a conversation to a language model and receiving a response—but they do it with different conventions.

| | OpenAI format | Anthropic format |
|--|--------------|-----------------|
| Endpoint | `/v1/chat/completions` | `/v1/messages` |
| Authentication | `Authorization: Bearer <key>` | `x-api-key: <key>` |
| System message | Inside `messages` array with `role: "system"` | Top-level `system` parameter, outside `messages` |
| Message roles | `system`, `user`, `assistant`, `tool` | `user`, `assistant` only |
| Response structure | `choices[0].message.content` | `content[0].text` |
| Usage field | `usage.prompt_tokens`, `usage.completion_tokens` | `usage.input_tokens`, `usage.output_tokens` |

These are structural differences, not semantic ones. Both formats send a conversation history and return a model-generated reply. The Anthropic format just uses a flatter structure and separates the system prompt from the conversation history.

---

## Using the Anthropic Python SDK with a Custom Provider

The official Anthropic Python SDK supports a custom base URL, which means you can point it at any provider that implements the Anthropic format.

### Basic request

```python
import anthropic

client = anthropic.Anthropic(
    api_key="sk-your-apilane-key",
    base_url="https://api.apilane.one/v1"
)

response = client.messages.create(
    model="glm-5.2",
    max_tokens=1024,
    system="You are a helpful assistant.",
    messages=[
        {"role": "user", "content": "Explain what an API gateway does in two sentences."}
    ]
)

print(response.content[0].text)
```

Notice the differences from the OpenAI SDK:

- `base_url` points to the provider's endpoint
- `api_key` is your provider's key, not Anthropic's
- `model` uses the provider's model name (`glm-5.2`, not a Claude model name)
- `system` is a top-level parameter, not a message in the array
- The response is accessed via `response.content[0].text`, not `response.choices[0].message.content`

### Streaming request

```python
import anthropic

client = anthropic.Anthropic(
    api_key="sk-your-apilane-key",
    base_url="https://api.apilane.one/v1"
)

stream = client.messages.create(
    model="glm-5.2",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Write a haiku about API gateways."}
    ],
    stream=True
)

for chunk in stream:
    if chunk.delta.text:
        print(chunk.delta.text, end="")
```

Streaming works the same way conceptually, but the event structure follows the Anthropic streaming format rather than the OpenAI one.

---

## Using curl with the Anthropic Format

If you prefer raw HTTP requests, here is what the Anthropic format looks like in curl.

```bash
curl https://api.apilane.one/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk-your-apilane-key" \
  -d '{
    "model": "glm-5.2",
    "max_tokens": 1024,
    "system": "You are a helpful assistant.",
    "messages": [
      {"role": "user", "content": "Explain what an API gateway does in two sentences."}
    ]
  }'
```

Key differences from the OpenAI curl example:

- Endpoint is `/v1/messages`, not `/v1/chat/completions`
- Header is `x-api-key`, not `Authorization: Bearer`
- `system` is a top-level field, not inside `messages`
- No `temperature` or `top_p` in this minimal example—add them if the provider supports them

---

## Configuring Claude Code and VS Code Extensions

Several popular tools let you override the default API endpoint. The exact steps vary by tool, but the pattern is consistent.

### Claude Code

Claude Code reads configuration from environment variables. To use a custom provider:

```bash
export ANTHROPIC_API_KEY="sk-your-apilane-key"
export ANTHROPIC_BASE_URL="https://api.apilane.one"
# Claude Code will use these instead of the defaults
```

When Claude Code prompts you to select a model, enter the provider's model name (e.g., `glm-5.2`) instead of a Claude model name.

### VS Code extensions (Cline, Roo Code, etc.)

Most extensions that support the Anthropic format have settings for custom base URL and API key. Look for fields like:

- **API Provider**: Anthropic (or Custom)
- **Base URL**: `https://api.apilane.one`
- **API Key**: `sk-your-apilane-key`
- **Model**: `glm-5.2`

The extension sends requests in the Anthropic format to your configured endpoint, and the provider returns responses in the same format.

---

## Compatible Does Not Mean Identical

As with the OpenAI format, supporting the Anthropic API contract does not guarantee every feature is available.

| Feature | Usually compatible | May differ |
|---------|-------------------|------------|
| Messages endpoint (`/v1/messages`) | Yes | — |
| Streaming (`stream: true`) | Yes | — |
| Core parameters (`max_tokens`, `temperature`, `top_p`) | Yes | — |
| Model names | — | Provider-specific |
| Tool use / function calling | Often | Request format may vary |
| System prompt handling | Yes | Some providers also accept system inside messages |
| Vision / multimodal inputs | Sometimes | Depends on the model |
| Citation and thinking features | Rarely | Anthropic-specific features |

If you are building a production application, test your exact parameter set against the provider before committing. Most core features work identically, but edge cases exist.

---

## When to Use Which Format

If your provider supports both formats, the choice usually depends on your existing tooling:

- **OpenAI format** → Use when your code uses the OpenAI SDK, LangChain, LiteLLM, or frameworks built around `base_url` + `/v1/chat/completions`
- **Anthropic format** → Use when your code uses the Anthropic SDK, Claude Code, or VS Code extensions that expect the `/v1/messages` endpoint

The actual model running your request is the same regardless of format. The format is just the communication protocol. Choose the one that requires the least change to your existing setup.

---

## Frequently Asked Questions

### Which tools use the Anthropic API format?

Claude Code, the official Anthropic Python and TypeScript SDKs, and several VS Code extensions including Cline and Roo Code use the Anthropic API format. These tools expect the `/v1/messages` endpoint, `x-api-key` authentication, and the Anthropic-style request and response structure.

### Can I use the Anthropic SDK with a non-Anthropic provider?

Yes. The official Anthropic SDK supports a custom `base_url`. Set it to your provider's endpoint, pass your provider's API key, and use your provider's model names. The SDK will communicate using the Anthropic request format while the provider handles the actual inference.

### What model name should I use in the Anthropic format?

Use the provider's own model names, not Anthropic model names. For example, on apilane you would use `glm-5.2`, `MiniMax-M3`, or `kimi-k2.6`. The Anthropic format is just the communication protocol—the actual model is whatever your provider offers.

### Does the Anthropic format support streaming?

Yes. Set `stream: true` in your request, and the provider returns Server-Sent Events in the Anthropic streaming format. Your existing streaming handler should work without changes.

### Can I use Claude Code with a custom provider?

Claude Code supports custom API configuration through environment variables or config files. Set `ANTHROPIC_API_KEY` to your provider's key and `ANTHROPIC_BASE_URL` to your provider's endpoint. Then use the provider's model names instead of Claude model names.

---

*Using tools that speak the Anthropic format? [Sign up and connect them to apilane](https://api.apilane.one) with one configuration change.*