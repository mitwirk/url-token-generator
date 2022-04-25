declare function generateUrlToken(queryString: string, publicKeyFromPem: string): string;
declare function decryptUrlToken(tokenFromUrl: string, privateKeyFromPem: string): string | null;
declare const _default: {
    generateUrlToken: typeof generateUrlToken;
    decryptUrlToken: typeof decryptUrlToken;
};
export default _default;
