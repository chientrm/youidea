import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import {
  SignJWT,
  importPKCS8,
  importSPKI,
  jwtVerify,
  type JWTPayload
} from 'jose';

const issuer = 'urn:chientrm:issuer',
  audience = ['urn:chientrm:audience'],
  getPrivateKey = () => importPKCS8(env.PKCS8, 'RS512'),
  getPublicKey = () => importSPKI(publicEnv.PUBLIC_SPKI, 'RS512'),
  sign = async <T extends JWTPayload>(data: T) =>
    new SignJWT(data)
      .setProtectedHeader({ alg: 'RS512' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime('1w')
      .sign(await getPrivateKey()),
  verify = async <T>(jwt: string) =>
    jwtVerify(jwt, await getPublicKey(), { issuer, audience }).then(
      (result) => result.payload as T
    );
export { sign, verify };
