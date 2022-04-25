declare function generateUrlToken(queryString: string, publicKeyFromPem: string): string;
declare function decryptUrlToken(tokenFromUrl: string, privateKeyFromPem: string): string | null;
export { generateUrlToken, decryptUrlToken };
