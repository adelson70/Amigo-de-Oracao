const { BucketService } = require('../services/BucketService');
const SalaService = require('../services/SalaService');
const generateQRCode = require('../utils/qrCode');
const generateTokenSala = require('../utils/salaToken');
require('dotenv').config();

const SalaController = {
    create: async (req, res) => {
        try {
            const { id } = req.user;
            const { nome, limite } = req.body;
            const token = generateTokenSala();
            const qrCodeData = `${process.env.FRONTEND_URL}/api/room/lobby/${token}`;

            await generateQRCode(qrCodeData, token);

            const room = await SalaService.create({ 
                user_id: id,
                token,
                nome,
                limite,
            });

            return res.status(201).json(room);
        } catch (error) {
            console.error('Error creating room:', error);
            return res.status(500).json({ error: 'Failed to create room' });
        }
    },

    list: async (req, res) => {
        try {
            const { id } = req.user;
            const rooms = await SalaService.list(id);
            return res.status(200).json(rooms);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to list rooms' });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const room = await SalaService.getById(id);
            if (!room) {
                return res.status(404).json({ error: 'Room not found' });
            }
            return res.status(200).json(room);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve room' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const updatedRoom = await SalaService.update(id, { name, description });
            if (!updatedRoom) {
                return res.status(404).json({ error: 'Room not found' });
            }
            return res.status(200).json(updatedRoom);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update room' });
        }
    },

    delete: async (req, res) => {
        try {
            const { token } = req.params;
            const { id } = req.user;
            const deleted = await SalaService.delete(token, id);
            if (!deleted) {
                return res.status(404).json({ error: 'Room not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete room' });
        }
    },

    getQRCode: async (req, res) => {
        try {
            const { token } = req.params;
            const qrCodeUrl = await BucketService.get(token);

            if (!qrCodeUrl) {
                return res.status(404).json({ error: 'QR Code not found' });
            }
            return res.status(200).json({ qrCodeUrl: qrCodeUrl.url });
        } catch (error) {
            console.error('Error fetching QR Code:', error);
            return res.status(500).json({ error: 'Failed to fetch QR Code' });
        }
    },
};
module.exports = SalaController;