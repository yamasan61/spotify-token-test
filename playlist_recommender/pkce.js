export async function createPKCE() {
  // 1) 96 文字 ≒ 72 byte のランダムを生成
  const bytes = crypto.getRandomValues(new Uint8Array(72));

  // 2) Base64URL エンコード
  const toB64url = arr =>
    btoa(String.fromCharCode(...arr))
      .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

  const verifier  = toB64url(bytes);                  // 43〜128文字
  const digest    = await crypto.subtle.digest('SHA-256', bytes);
  const challenge = toB64url(new Uint8Array(digest)); // 43文字

  return { verifier, challenge };
}

