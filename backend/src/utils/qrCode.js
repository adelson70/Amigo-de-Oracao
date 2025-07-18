const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode');
require('dotenv').config();
const { QrCodes, Sala } = require('../models');

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

const getQrCodeImage = async (token) => {
  try {
    const { qr_code: qr_code_id } = await Sala.findOne({ where: { token }, attributes: ['qr_code'], raw: true });

    if (!qr_code_id) {
      throw new Error('QR Code not found for this token');
    }

    const {dados: qrCode} = await QrCodes.findByPk(qr_code_id, { raw: true, attributes: ['dados'] });

    if (!qrCode) {
      throw new Error('QR Code not found');
    }

    return qrCode;
  } catch (error) {
    console.error('Error fetching QR Code image:', error);
    throw error;
  }
}

module.exports = {
  generateQRCode,
  getQrCodeImage,
};