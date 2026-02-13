import { jwtVerify, SignJWT } from "jose";

//process.env.JWT_SECRET is undefined
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "password")

export async function sign(payload: any): Promise<any> {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret);
}

export async function verify(token: string) {
    // verified token with jose jwtVerify
    try {
        const { payload } = await jwtVerify(token, secret);
        // return payload if signature is valid
        return payload;
    } catch (e) {
        // return null if token is invalid or expired
        return null;
    }
}

