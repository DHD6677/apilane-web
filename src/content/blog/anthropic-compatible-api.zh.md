---
slug: anthropic-compatible-api
locale: zh
title: "Anthropic 兼容 API 接入指南：不改工具切换 Provider"
description: "使用 Claude Code 或 Anthropic SDK？学习如何通过配置自定义 base_url 和模型名，将 Anthropic 格式的工具接入任何兼容提供商。"
pubDate: 2026-07-11
readingMinutes: 7
category: "Getting started"
heroImage: "/images/blog/anthropic-compatible-api-hero.png"
ogImage: "/images/blog/anthropic-compatible-api-hero.png"
faq:
  - question: "哪些工具使用 Anthropic API 格式？"
    answer: "Claude Code、官方 Anthropic Python 和 TypeScript SDK，以及 Cline、Roo Code 等 VS Code 扩展使用 Anthropic API 格式。这些工具期望 /v1/messages 端点、x-api-key 认证和 Anthropic 风格的请求与响应结构。"
  - question: "Anthropic SDK 能用于非 Anthropic 提供商吗？"
    answer: "可以。官方 Anthropic SDK 支持自定义 base_url。将其设置为你的提供商端点，传入提供商的 API key，并使用提供商的模型名。SDK 会用 Anthropic 请求格式通信，而由提供商处理实际的推理。"
  - question: "Anthropic 格式里应该用什么模型名？"
    answer: "使用提供商自己的模型名，不是 Anthropic 的模型名。例如在 apilane 上，你会使用 glm-5.2、MiniMax-M3 或 kimi-k2.6。Anthropic 格式只是通信协议——实际运行的模型取决于你的提供商。"
  - question: "Anthropic 格式支持流式响应吗？"
    answer: "支持。在请求中设置 stream: true，提供商将以 Anthropic 流式格式返回 Server-Sent Events。你现有的流式处理代码无需修改即可工作。"
  - question: "Claude Code 能接入自定义提供商吗？"
    answer: "Claude Code 支持通过环境变量或配置文件自定义 API 配置。将 ANTHROPIC_API_KEY 设为提供商的 key，ANTHROPIC_BASE_URL 设为提供商的端点，然后使用提供商的模型名代替 Claude 模型名。"
---

# Anthropic 兼容 API 接入指南：不改工具切换 Provider

有些开发工具使用 OpenAI API 格式，有些使用 Anthropic 格式。如果你正在用 Claude Code、Anthropic SDK 或围绕 Anthropic API 构建的 VS Code 扩展，切换到兼容提供商意味着理解格式差异并更新几个配置值。

本文介绍 Anthropic API 格式长什么样、它与 OpenAI 格式的区别，以及如何配置常用工具来使用支持该格式的任何提供商。

---

## 为什么 Anthropic 格式是第二个行业标准

AI API 领域有两套主流格式。OpenAI 的 `/v1/chat/completions` 是两者中更被广泛采用的，但 Anthropic 格式——以 `/v1/messages` 为核心——有自己的生态：

- **Claude Code**，Anthropic 官方的 CLI 编程助手，原生使用这个格式。
- **Anthropic Python 和 TypeScript SDK** 围绕它构建。
- **多个 VS Code 扩展**——包括 Cline 和 Roo Code——将其作为一等选项支持。

如果你的工作流已经建立在这些工具之上，迁移到只支持 OpenAI 格式的提供商意味着要么换工具，要么加一个转换层。同时支持两种格式的提供商让你保留现有设置。

---

## OpenAI 格式 vs Anthropic 格式：实际差异

两种格式解决相同的问题——把对话历史发给语言模型并接收回复——但用了不同的约定。

| | OpenAI 格式 | Anthropic 格式 |
|--|-------------|---------------|
| 端点 | `/v1/chat/completions` | `/v1/messages` |
| 认证 | `Authorization: Bearer <key>` | `x-api-key: <key>` |
| 系统消息 | 在 `messages` 数组内，`role: "system"` | 顶层 `system` 参数，在 `messages` 之外 |
| 消息角色 | `system`、`user`、`assistant`、`tool` | 只有 `user`、`assistant` |
| 响应结构 | `choices[0].message.content` | `content[0].text` |
| 用量字段 | `usage.prompt_tokens`、`usage.completion_tokens` | `usage.input_tokens`、`usage.output_tokens` |

这些是结构差异，不是语义差异。两种格式都发送对话历史并返回模型生成的回复。Anthropic 格式只是用了更扁平的结构，并把系统提示从对话历史中分离出来。

---

## 用 Anthropic Python SDK 接入自定义提供商

官方 Anthropic Python SDK 支持自定义 base URL，这意味着你可以将它指向任何实现了 Anthropic 格式的提供商。

### 基础请求

```python
import anthropic

client = anthropic.Anthropic(
    api_key="sk-your-apilane-key",
    base_url="https://api.apilane.one/v1"
)

response = client.messages.create(
    model="glm-5.2",
    max_tokens=1024,
    system="你是一个乐于助人的助手。",
    messages=[
        {"role": "user", "content": "用两句话解释 API 网关的作用。"}
    ]
)

print(response.content[0].text)
```

注意与 OpenAI SDK 的差异：

- `base_url` 指向提供商的端点
- `api_key` 是提供商的 key，不是 Anthropic 的
- `model` 使用提供商的模型名（`glm-5.2`，不是 Claude 模型名）
- `system` 是顶层参数，不在消息数组内
- 响应通过 `response.content[0].text` 访问，不是 `response.choices[0].message.content`

### 流式请求

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
        {"role": "user", "content": "写一首关于 API 网关的俳句。"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.delta.text:
        print(chunk.delta.text, end="")
```

流式响应概念上相同，但事件结构遵循 Anthropic 流式格式而非 OpenAI 的。

---

## 用 curl 接入 Anthropic 格式

如果你偏好原始 HTTP 请求，以下是 Anthropic 格式在 curl 中的样子。

```bash
curl https://api.apilane.one/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk-your-apilane-key" \
  -d '{
    "model": "glm-5.2",
    "max_tokens": 1024,
    "system": "你是一个乐于助人的助手。",
    "messages": [
      {"role": "user", "content": "用两句话解释 API 网关的作用。"}
    ]
  }'
```

与 OpenAI curl 示例的关键差异：

- 端点是 `/v1/messages`，不是 `/v1/chat/completions`
- 请求头是 `x-api-key`，不是 `Authorization: Bearer`
- `system` 是顶层字段，不在 `messages` 内
- 这个最小示例中没有 `temperature` 或 `top_p`——如果提供商支持，可以加上

---

## 配置 Claude Code 和 VS Code 扩展

多个流行工具允许你覆盖默认 API 端点。具体步骤因工具而异，但模式是一致的。

### Claude Code

Claude Code 从环境变量读取配置。要使用自定义提供商：

```bash
export ANTHROPIC_API_KEY="sk-your-apilane-key"
export ANTHROPIC_BASE_URL="https://api.apilane.one"
# Claude Code 将使用这些值代替默认值
```

当 Claude Code 提示你选择模型时，输入提供商的模型名（例如 `glm-5.2`）而不是 Claude 模型名。

### VS Code 扩展（Cline、Roo Code 等）

大多数支持 Anthropic 格式的扩展都有自定义 base URL 和 API key 的设置。查找类似以下字段：

- **API Provider**: Anthropic（或 Custom）
- **Base URL**: `https://api.apilane.one`
- **API Key**: `sk-your-apilane-key`
- **Model**: `glm-5.2`

扩展会以 Anthropic 格式向配置的端点发送请求，提供商以相同格式返回响应。

---

## 兼容不等于完全相同

与 OpenAI 格式一样，支持 Anthropic API 契约不保证每个功能都可用。

| 功能 | 通常兼容 | 可能有差异 |
|------|---------|-----------|
| Messages 端点（`/v1/messages`） | 是 | — |
| 流式响应（`stream: true`） | 是 | — |
| 核心参数（`max_tokens`、`temperature`、`top_p`） | 是 | — |
| 模型名 | — | 因提供商而异 |
| 工具调用 / 函数调用 | 通常 | 请求格式可能有差异 |
| 系统提示处理 | 是 | 部分提供商也接受 messages 内的 system |
| 视觉 / 多模态输入 | 有时 | 取决于模型 |
| 引用和思考功能 | 很少 | Anthropic 特有功能 |

如果你正在构建生产应用，请在提交前针对提供商测试你的确切参数集。大多数核心功能工作方式相同，但边界情况存在。

---

## 什么时候用哪种格式

如果你的提供商同时支持两种格式，选择通常取决于你现有的工具链：

- **OpenAI 格式** → 当你的代码使用 OpenAI SDK、LangChain、LiteLLM 或围绕 `base_url` + `/v1/chat/completions` 构建的框架时
- **Anthropic 格式** → 当你的代码使用 Anthropic SDK、Claude Code 或期望 `/v1/messages` 端点的 VS Code 扩展时

实际运行你请求的模型与格式无关。格式只是通信协议。选择需要改动最少的那一种。

---

## 常见问题

### 哪些工具使用 Anthropic API 格式？

Claude Code、官方 Anthropic Python 和 TypeScript SDK，以及 Cline、Roo Code 等 VS Code 扩展使用 Anthropic API 格式。这些工具期望 `/v1/messages` 端点、`x-api-key` 认证和 Anthropic 风格的请求与响应结构。

### Anthropic SDK 能用于非 Anthropic 提供商吗？

可以。官方 Anthropic SDK 支持自定义 `base_url`。将其设置为你的提供商端点，传入提供商的 API key，并使用提供商的模型名。SDK 会用 Anthropic 请求格式通信，而由提供商处理实际的推理。

### Anthropic 格式里应该用什么模型名？

使用提供商自己的模型名，不是 Anthropic 的模型名。例如在 apilane 上，你会使用 `glm-5.2`、`MiniMax-M3` 或 `kimi-k2.6`。Anthropic 格式只是通信协议——实际运行的模型取决于你的提供商。

### Anthropic 格式支持流式响应吗？

支持。在请求中设置 `stream: true`，提供商将以 Anthropic 流式格式返回 Server-Sent Events。你现有的流式处理代码无需修改即可工作。

### Claude Code 能接入自定义提供商吗？

Claude Code 支持通过环境变量或配置文件自定义 API 配置。将 `ANTHROPIC_API_KEY` 设为提供商的 key，`ANTHROPIC_BASE_URL` 设为提供商的端点，然后使用提供商的模型名代替 Claude 模型名。

---

*使用 Anthropic 格式的工具？[注册 apilane，一次配置即可接入](https://api.apilane.one)。*