const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');
require('dotenv').config();

const { BucketService } = require('../services/BucketService');

const generateQRCode = async (data, token) => {
  try {
    const qrCodePath = path.join(__dirname, `../temp/${token}.png`);
    await qrcode.toFile(qrCodePath, data, { errorCorrectionLevel: 'H', width: 700, height: 700 });

    const status = await BucketService.post(qrCodePath, `${token}.png`);

    fs.unlinkSync(qrCodePath);

    return status === 204 || status === 201 ? { message: 'QR Code Gerado e Enviado ao Bucket', token } : null; 
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

module.exports = generateQRCode;