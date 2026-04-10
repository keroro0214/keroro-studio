export async function onRequestPost(context) {
  const apiKey = context.env.OPENAI_API_KEY;

  if (!apiKey) {
    return json({ error: "Cloudflare 环境变量 OPENAI_API_KEY 尚未配置。" }, 501);
  }

  const { prompt } = await context.request.json();

  if (!prompt || typeof prompt !== "string") {
    return json({ error: "缺少有效的 prompt。" }, 400);
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-image-1.5",
      prompt,
      size: "1024x1536",
      quality: "medium"
    })
  });

  const payload = await response.json();

  if (!response.ok) {
    return json({ error: payload.error?.message || "OpenAI 图片生成失败。" }, response.status);
  }

  const base64 = payload.data?.[0]?.b64_json;

  if (!base64) {
    return json({ error: "OpenAI 未返回图片数据。" }, 502);
  }

  return json({ image: `data:image/png;base64,${base64}` });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
