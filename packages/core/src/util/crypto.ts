const encryptionKey = process.env["ENCRYPTION_KEY"];

export function arrayBufferToBase64(
  arrayBuffer: ArrayBuffer | ArrayBufferLike,
) {
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}

export function base64ToArrayBuffer(base64: string) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
    .buffer as ArrayBuffer;
}

export async function encryptSecret(rawValue: string) {
  if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(rawValue);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey(
    "raw",
    base64ToArrayBuffer(encryptionKey),
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt"],
  );
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );

  const combined = new Uint8Array(encrypted.byteLength + iv.byteLength);
  combined.set(new Uint8Array(encrypted), 0);
  combined.set(iv, encrypted.byteLength);

  return arrayBufferToBase64(combined.buffer);
}

export async function decryptSecret(encryptedValue: string) {
  if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }

  const decoder = new TextDecoder();
  const encrypted = Uint8Array.from(atob(encryptedValue), (c) =>
    c.charCodeAt(0),
  );
  const iv = encrypted.slice(-12);
  const data = encrypted.slice(0, -12);
  const key = await crypto.subtle.importKey(
    "raw",
    base64ToArrayBuffer(encryptionKey),
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["decrypt"],
  );
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );

  return decoder.decode(decrypted);
}
