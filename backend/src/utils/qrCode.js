const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');
require('dotenv').config();
const { QrCodes } = require('../models');
const { raw } = require('express');

const generateQRCode = async (data, token) => {
  try {
    const qrCodePath = path.join(__dirname, `../temp/${token}.png`);
    await qrcode.toFile(qrCodePath, data, { errorCorrectionLevel: 'H', width: 700, height: 700 });
    const filename = `${token}.png`;
    const buffer = fs.readFileSync(qrCodePath);

    const qrcodeData = await QrCodes.create({
      nome: filename,
      dados: buffer,
    },
    { raw: true }
  );

    return { message: 'QR Code Gerado e Salvo no Banco de Dados', qrcodeData };
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

module.exports = generateQRCode;