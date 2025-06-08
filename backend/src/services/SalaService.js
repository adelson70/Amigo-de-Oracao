const Sala = require('../models/Sala');

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
  }
};

module.exports = SalaService;