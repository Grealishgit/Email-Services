import crypto from "crypto";

export const verifySignature = (body, signature, secret) => {
    const expected =
        "sha256=" + crypto.createHmac("sha256", secret).update(body).digest("hex");

    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature)
    );
};

