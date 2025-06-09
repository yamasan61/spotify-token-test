// pkce.js : PKCE utility functions
export async function createPKCE() {
  // 1. 43~128 文字のランダム文字列 (code verifier) を生成
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  const verifier = btoa(String.fromCharCode(...array))
                   .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  // 2. SHA-256 ハッシュ → Base64URL エンコードで code challenge を生成
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
                     .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return { verifier, challenge };
}
