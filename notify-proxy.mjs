import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

const PORT = Number(process.env.NOTIFY_PROXY_PORT || 3002);

const WEBHOOKS = {
  ERROR: process.env.DISCORD_WEBHOOK_ERROR || 'https://discord.com/api/webhooks/1492540471971418184/K489mhY15rATniyUpSSMMSiN226TQT7CTmzVVK3g1fedHe_MWM7uRQa5Tm8ozIUWdVSR',
  PRODUCT: process.env.DISCORD_WEBHOOK_PRODUCT || 'https://discord.com/api/webhooks/1491886388814020790/ZgskatQWBS4chc-JFJJlLCFEj_ueFxq2qjLdmfPoOcZslLie6G_HzBsEjbwjZEmWPPQH',
  AUDIT: process.env.DISCORD_WEBHOOK_AUDIT || 'https://discord.com/api/webhooks/1492545024251138088/Rg9Y2KouFxVr_LMMNT77RNo6U0P1qTxyDQl0xPnxo9GJeBg9VnzaU4hhSg44D8JarhuN',
  FEEDBACK: process.env.DISCORD_WEBHOOK_FEEDBACK || 'https://discord.com/api/webhooks/1492545275342884954/NxqdToh6ZTjpwz_0lZkBskAGWWueJnu5t1k1MaVz7__Nrpte7tj2E7HhcMdlWYFDcdku'
};

const json = (res, status, payload) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 2 * 1024 * 1024) reject(new Error('Payload too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

const postToDiscord = (webhookUrl, payload, allowInsecureTls = false) =>
  new Promise((resolve, reject) => {
    const parsed = new URL(webhookUrl);
    const body = JSON.stringify(payload);

    const options = {
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: `${parsed.pathname}${parsed.search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      rejectUnauthorized: !allowInsecureTls
    };
    if (allowInsecureTls) {
      options.checkServerIdentity = () => undefined;
    }

    const req = https.request(
      options,
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            text: responseBody
          });
        });
      }
    );

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy(new Error('Discord request timeout'));
    });
    req.write(body);
    req.end();
  });

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return json(res, 204, { ok: true });
  }

  if (req.method === 'GET' && req.url === '/health') {
    return json(res, 200, { ok: true, service: 'notify-proxy', port: PORT });
  }

  if (req.method !== 'POST' || req.url !== '/notify') {
    return json(res, 404, { ok: false, error: 'Not Found' });
  }

  try {
    const raw = await readBody(req);
    const payload = JSON.parse(raw || '{}');
    const channel = String(payload.channel || '').toUpperCase();
    const data = payload.data || {};
    const webhook = WEBHOOKS[channel];

    if (!webhook) {
      return json(res, 400, { ok: false, error: 'Invalid channel' });
    }

    let discordRes;
    try {
      discordRes = await postToDiscord(webhook, data, false);
    } catch (tlsError) {
      const tlsMsg = String(tlsError?.message || '');
      const isSelfSigned = tlsMsg.toLowerCase().includes('self-signed');
      if (!isSelfSigned) throw tlsError;
      // Corporate proxy / local cert injection fallback.
      discordRes = await postToDiscord(webhook, data, true);
    }

    if (!discordRes.ok) {
      return json(res, 502, {
        ok: false,
        error: 'Discord rejected payload',
        status: discordRes.status,
        details: discordRes.text
      });
    }

    return json(res, 200, { ok: true, channel });
  } catch (error) {
    return json(res, 502, { ok: false, error: error.message || 'Upstream request failed' });
  }
});

server.listen(PORT, () => {
  console.log(`Notify proxy listening on http://localhost:${PORT}`);
});
