export declare const generateUrlToken: (queryString: string, publicKeyFromPem: string) => Promise<string>;
export declare const decryptUrlToken: (tokenFromUrl: string, privateKeyFromPem: string) => Promise<string | null>;
