const SalaService = require('../services/SalaService');
const generateQRCode = require('../utils/qrCode');
const generateTokenSala = require('../utils/salaToken');
const { generateTokenParticipante, setTokenParticipanteCookie } = require('../utils/token');
const { getQrCodeImage } = require('../utils/qrCode');
const { get } = require('../routes');
require('dotenv').config();

const SalaController = {
    create: async (req, res) => {
        try {
            const { id } = req.user;
            const { nome, limite } = req.body;
            const token = generateTokenSala();
            const qrCodeData = `${process.env.FRONTEND_URL}/room/lobby/${token}`;

            const { message, qrcodeData } = await generateQRCode(qrCodeData, token);

            const room = await SalaService.create({ 
                user_id: id,
                token,
                nome,
                limite,
                qr_code: qrcodeData.id,
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
            const qrCodeImage = await getQrCodeImage(token);

            if (!qrCodeImage) {
                return res.status(404).json({ error: 'QR Code not found' });
            }
            res.set('Content-Type', 'image/png');
            return res.status(200).send(qrCodeImage);
        } catch (error) {
            console.error('Error fetching QR Code:', error);
            return res.status(500).json({ error: 'Failed to fetch QR Code' });
        }
    },

    verifyToken: async (req, res) => {
        try {
            const { token } = req.params;
            const isValid = await SalaService.verifyToken(token);

            if (!isValid) {
                return res.status(200).json({ message: 'sala_nao_existe' });
            }

            return res.status(200).json({ message: isValid.status });
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(500).json({ error: 'Failed to verify token' });
        }
    },
    join: async (req, res) => {
        try {
            const { token, nome } = req.body;

            const participante = await SalaService.join(token, nome);

            if (!participante) {
                return res.status(200).json({ message: 'participante_existe' });
            }
            
            const tokenParticipante = generateTokenParticipante(participante);

            setTokenParticipanteCookie(res, tokenParticipante);

            return res.status(200).json({message: 'Participante adicionado com sucesso'});
        } catch (error) {
            console.error('Error joining room:', error);
            return res.status(500).json({ error: 'Failed to join room' });
        }
    },

    isParticipante: async (req, res) => {
        try {
            const { nome, salaToken } = req.participante

            if (!nome || !salaToken) {
                return res.status(200).json({ isParticipante: false });
            }

            const salaSorteada = await SalaService.verifySorteio(nome, salaToken);

            if (!salaSorteada) {
                return res.status(200).json({ isParticipante: true, participante: req.participante });
            }

            return res.status(200).json({ isSorteado: true, sorteio: salaSorteada });

        } catch (error) {
            console.error('Error checking participant:', error);
            return res.status(500).json({ error: 'Failed to check participant' });
        }
    },

    getParticipantes: async (req, res) => {
        try {
            const { token } = req.params;
            const participantes = await SalaService.getParticipantes(token);

            if (!participantes) {
                return res.status(404).json({ error: 'No participants found' });
            }

            return res.status(200).json(participantes);
        } catch (error) {
            console.error('Error fetching participants:', error);
            return res.status(500).json({ error: 'Failed to fetch participants' });
        }
    },


    sorteio: async (req, res) => {
        try {
            const { token } = req.body;

            const sorteio = await SalaService.sorteio(token);

            if (!sorteio) {
                return res.status(404).json({ error: 'Sorteio não encontrado' });
            }

            return res.status(200).json(sorteio);
        } catch (error) {
            console.error('Error performing sorteio:', error);
            return res.status(500).json({ error: 'Failed to perform sorteio' });
        }
    },

    getSorteio: async (req, res) => {
        try {
            const { token } = req.params;

            const sorteio = await SalaService.getSorteio(token);

            if (!sorteio) {
                return res.status(404).json({ error: 'Sorteio não encontrado' });
            }

            return res.status(200).json(sorteio);
        } catch (error) {
            console.error('Error fetching sorteio:', error);
            return res.status(500).json({ error: 'Failed to fetch sorteio' });
        }
    },
};
module.exports = SalaController;