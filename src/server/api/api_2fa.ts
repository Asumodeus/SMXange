import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export const setup2FA = async (req: Request) => {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri('usuari', 'SMXange', secret);
    const qrImage = await QRCode.toDataURL(otpauth);

    return new Response(JSON.stringify({
        qr: qrImage,
        secret: secret
    }), {
        headers: { "Content-Type": "application/json" }
    });
};