export async function createPKCE() {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  const verifier = btoa(String.fromCharCode(...bytes))
                   .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
                    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  return { verifier, challenge };
}
