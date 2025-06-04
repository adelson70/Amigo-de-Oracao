const generateQRCode = require('../utils/qrCode');
require('dotenv').config();

const QrCodeController = {
  show: async (req, res) => {
    const { token } = req.params;
    const qrCodeUrl = `${process.env.BUCKET_API_URL}/upload/${token}.png`;

    res.status(200).json({ message: 'QR Code encontrado',qrCodeUrl });
  },

  store: async (req, res) => {
    const { token } = req.params;

    const data = token;

    try {
      const qrCodeData = await generateQRCode(data, token);
      if (!qrCodeData) {
        return res.status(404).json({ error: 'QR Code não encontrado' });
      }
      res.status(201).json(qrCodeData);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
};

module.exports = QrCodeController;