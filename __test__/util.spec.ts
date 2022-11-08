import { generateUrlToken, decryptUrlToken } from "../src/";

const TEST_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzAFz2W8H5dCVlEOZZXQdFlsSWoel2jtkZSBdz3sv80/xOTVs
MAk+j7WwcIbOhsQw0/6+XPk8skkL7kLvRDUI32iUb60yvswvI/xUs8DpAuZzgCQo
ZZr0//MqGX2s9OFzXZnQJycc1yEFS7OEVaITbA1QI1VRMRLrszsA0ESySgvHqOLF
xXotfWIfw+BFc0VEMSToJB/M9SRU8fchTpcZb4WR268jd0/BvvMQaj4YNubJi+nH
OLHNqeAkV09FLaHIzr2XD+iHRAMQm6HIOsjeDQM94FlYBvSmW2CTAY3mDXZB/Ecu
wwmqtifvT5aGLE/loTCI2YZq+xTNbc5BovBxNwIDAQABAoIBAHXKIOnageTfmn4Q
yfEaKfFOhDphOBHZWQ5Ksd+qcPU7ozw07FKQA99WOJnAPF7zyH2fCKsF/VWzd4AK
hbwMIyNbbtlMV5BytIVCnGVtbRyPkwDZ37lKz0s5S4WMWuDJi6LvvI/etXhBSJ18
+Vu4SR6KUUsVZ9u94PmLh9y4zXiSbLpCqt6DMC/7XrvCJ0h5XBMqvMDN0czrvo4t
BOfk/a5PnKETdK08tl1muOR9l33Fnkc0LjAV8sK7qmJHIR6TZY/aVBz3PzfC1wLX
fO2CXyInIVacFh0mxGcCAhF0FjWB+GpYIboPXQVuh9mZDMy2f9PSXtcBBPqUIGVR
IACtX4ECgYEA5zrWGdbU98FylukiWkgeiR/NkFi1BaNn8VAGEkLE+jjDx7iQGLtk
rnSbezYqTs8Yz6/HB2GXqqGIGzKwBtZKspwDh59Zy9n/OjkA4qMag3hljirychfj
c4K14cf6erSw2Ye9yapMABtQPj+K+69cXaeRzEMHj37uEIozxcReHpMCgYEA4dwH
38YRB+zIyp6NMAyDd1RoOtCmS70hvMJx9UAlAARVQPxeb0oI7TpXbpeeeeBoyx6U
6WCnYKx0TqaBj7P3sdU0IlVPpqNDRwe2cG/1tcz4J+BI1ALJ9nXnW0E4OZjnvF7G
lH5EffmyCmsSwAfOwE0P8XTVDDmgjDkbXjKyJU0CgYEAlChW1ueYPcdtrNRkdoSP
TD1ccYjlNF+nUi98NGcj31BP4cCYU8B+mmmM1j22jhiURT7TwB8AFwy5MPQhZcAY
zKi6ekPYPY3Iw32S26S2cFbMe3N5NTGpQ3IVKD4CeG0eg8M+D+FWIRtfJwOAAhQy
kq+z87VfOsqRr3deBPH1fJECgYBREEn7NPmz4HaI0rNWBYfB8peeVHj7QhyzxQ5l
ueoNwYBf3LSAORBPJNtwpBaLI9I45PcJdFlex0bPW8+wpiVGvIEDuZ7m7j4dZlVC
scx8vd5rYYKCJaYbQWISTKxDb+/smg+oCFHI7S/LsXZ/Wc4JEx+fyBEXXC+VZIHA
I23xGQKBgQDSXwt50JAsdiVe3Le0UO2MS9qCQa3SpjslR30JGT9lQaANqhThcCoK
Kfz8LEl56XFj1c7AhMfYxMfPw/Oc9LRiw+FnB/9iDxm/hEyfH33OCIfEmib2Wspy
9FccQpmpgAAzvOL6IpWB4ktcWzEDjiuGXUYeSGxo4CjTDzJ+dcVbxA==
-----END RSA PRIVATE KEY-----`;

const TEST_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzAFz2W8H5dCVlEOZZXQd
FlsSWoel2jtkZSBdz3sv80/xOTVsMAk+j7WwcIbOhsQw0/6+XPk8skkL7kLvRDUI
32iUb60yvswvI/xUs8DpAuZzgCQoZZr0//MqGX2s9OFzXZnQJycc1yEFS7OEVaIT
bA1QI1VRMRLrszsA0ESySgvHqOLFxXotfWIfw+BFc0VEMSToJB/M9SRU8fchTpcZ
b4WR268jd0/BvvMQaj4YNubJi+nHOLHNqeAkV09FLaHIzr2XD+iHRAMQm6HIOsje
DQM94FlYBvSmW2CTAY3mDXZB/EcuwwmqtifvT5aGLE/loTCI2YZq+xTNbc5BovBx
NwIDAQAB
-----END PUBLIC KEY-----`;

const TEST_QUERY_STRING =
  "?trafficSourceNumber=5000&trafficMediumNumber=1000&sessionId=098f6b4e83262&timestamp=1467708053&orderId=124578124578124578124578124578&orderValue=123232.25&orderCurrency=CHF&usedCouponCode=GETMEFREEHEHE&consumerSalutation=MRS&consumerFirstName=Balakrishnan&consumerLastName=Ranganathan&consumerEmail=balakrishnan.ranganathan@example.com&consumerCountry=Banglapore&consumerZipcode=434343443";

test("expect chunked decrypted query to be same after encryption", async () => {
  const generatedToken = await generateUrlToken(
    TEST_QUERY_STRING,
    TEST_PUBLIC_KEY
  );

  console.log("generated token: ", generatedToken);

  const decryptedUrlToken = await decryptUrlToken(
    generatedToken,
    TEST_PRIVATE_KEY
  );

  console.log("decrypted to: ", decryptedUrlToken);

  expect(TEST_QUERY_STRING).toBe(decryptedUrlToken);
});
