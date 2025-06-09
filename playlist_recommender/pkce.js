// pkce.js  (最終版 – verifier は常に 86 文字)
export async function createPKCE() {
  const bytes = crypto.getRandomValues(new Uint8Array(64));       // 64 byte
  const toB64url = a => btoa(String.fromCharCode(...a))
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

  const verifier  = toB64url(bytes);                              // 86 chars
  const digest    = await crypto.subtle.digest(
                      'SHA-256',
                      new TextEncoder().encode(verifier));        // hash of UTF-8
  const challenge = toB64url(new Uint8Array(digest));             // 43 chars

  return { verifier, challenge };
}
