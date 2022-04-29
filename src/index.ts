import { chunkIterator } from "./util/chunk";
import * as queryString from "query-string";

const MAX_CHUNK_BYTE = 200;

export const generateUrlToken = async (
  queryString: string,
  publicKeyFromPem: string
): Promise<string> => {
  const JSEncrypt = (await import("jsencrypt")).default;
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(publicKeyFromPem);

  const base64EncodedQueryString = Buffer.from(queryString, "utf-8").toString(
    "base64"
  );

  let token = "token=";
  for (const s of chunkIterator(base64EncodedQueryString, MAX_CHUNK_BYTE)) {
    token += `${jsencrypt.encrypt(s)},`;
  }

  return token.slice(0, -1);
};

export const decryptUrlToken = async (
  tokenFromUrl: string,
  privateKeyFromPem: string
): Promise<string | null> => {
  const parsedToken = queryString.parse(tokenFromUrl, {
    arrayFormat: "comma",
    decode: false,
  });

  if (parsedToken.token && Array.isArray(parsedToken.token)) {
    const JSEncrypt = (await import("jsencrypt")).default;
    const jsencrypt = new JSEncrypt();
    jsencrypt.setPrivateKey(privateKeyFromPem);

    let decryptedToken = "";
    for (const chunk of parsedToken.token) {
      const decryptedChunk = jsencrypt.decrypt(chunk);
      if (decryptedChunk) {
        decryptedToken += decryptedChunk;
      } else {
        throw new Error(
          `Decryption of chunk failed, returned ${false} for chunk ${chunk}`
        );
      }
    }
    const decodedToken = Buffer.from(decryptedToken, "base64").toString(
      "utf-8"
    );
    return decodedToken;
  }

  return null;
};
