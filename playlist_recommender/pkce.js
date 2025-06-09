// pkce.js (fixed)
export async function createPKCE() {
  // 1) 64 byte のランダムを生成
  const bytes = crypto.getRandomValues(new Uint8Array(64));

  // 2) Bytes → base64url 文字列 = verifier
  const toB64url = arr =>
    btoa(String.fromCharCode(...arr))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/,'');

  const verifier = toB64url(bytes);                  // 43〜128 文字

  // 3) verifier 文字列を UTF-8 にして SHA-256 → base64url = challenge
  const data     = new TextEncoder().encode(verifier);
  const digest   = await crypto.subtle.digest('SHA-256', data);
  const challenge= toB64url(new Uint8Array(digest)); // 43 文字

  return { verifier, challenge };
}
