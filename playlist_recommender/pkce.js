export async function createPKCE() {
  const bytes = crypto.getRandomValues(new Uint8Array(64));
  const toB64 = a=>btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const verifier = toB64(bytes);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const challenge = toB64(new Uint8Array(digest));
  return { verifier, challenge };
}
