export const generateKey = async (subject: string) => {
  const timestamp = Date.now().toString();
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${subject}@${timestamp}`),
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};
