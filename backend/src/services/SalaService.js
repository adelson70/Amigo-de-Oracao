const Sala = require('../models/Sala');
const Participante = require('../models/Participante');
const Sorteio = require('../models/Sorteio');

const SalaService = {
  create: async (data) => {
    try {
      const room = new Sala(data);
      return await room.save();
    } catch (error) {
      console.error('Error creating room:', error);
      throw new Error('Failed to create room');
    }
  },

  list: async (user_id) => {
    try {
      return await Sala.findAll({
        where: {
          user_id: user_id,
          status: ['aberta', 'fechada'],
        },
        raw: true,
      });
    } catch (error) {
      console.error('Error listing rooms:', error);
      throw new Error('Failed to list rooms');
    }
  },

  getById: async (id) => {
    try {
      return await Sala.findById(id);
    } catch (error) {
      throw new Error('Failed to retrieve room');
    }
  },

  update: async (id, data) => {
    try {
      return await Sala.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error('Failed to update room');
    }
  },

  delete: async (token, user_id) => {
    try {
      return await Sala.update(
        { status: 'deletada' },
        { where: { token, user_id } }
      );
    } catch (error) {
      throw new Error('Failed to delete room');
    }
  },
  verifyToken: async (token) => {
    try {
      const room = await Sala.findOne({ where: { token }, raw: true });
      
      if (!room) {
        return null;
      }

      if (room.status === 'fechada') return { status: 'fechada' };

      const participantesAtuais = await Participante.count({where: { token: room.token }});

      const limiteExcedido = participantesAtuais >= room.limite;

      if (limiteExcedido) return { status: 'limite_excedido' };

      return { status: 'aberta' };

      
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error('Invalid token');
    }
  },
  join: async (token, nome) => {
    try {
      // Check if a participant with the same name already exists for this token
      const existing = await Participante.findOne({ where: { token, nome } });

      if (existing) {
        return null
      }
      
      const participante = await Participante.create({ token, nome });
      
      return { nome: participante.nome, salaToken: participante.token };

    } catch (error) {
      console.error('Error joining room:', error);
      throw new Error('Failed to join room');
    }
  },

  verifySorteio: async (nomeParticipante, token) => {
    try {
      const sorteio = await Sorteio.findOne({
        where: { token, meu_nome: nomeParticipante },
        raw: true,
      });

      if (!sorteio) {
        return null;
      }

      return sorteio;
    } catch (error) {
      console.error('Error verifying sorteio:', error);
      throw new Error('Failed to verify sorteio');
    }
  },

  getParticipantes: async (token) => {
    try {
      let participantes = await Participante.findAll({
        where: { token },
        attributes: ['nome'],
        raw: true,
      });

      if (!participantes || participantes.length === 0) {
        return [];
      }

      // Map to extract only the names
      participantes = participantes.map(participante => participante.nome);

      return participantes;
    } catch (error) {
      console.error('Error retrieving participants:', error);
      throw new Error('Failed to retrieve participants');
    }
  }
};

module.exports = SalaService;