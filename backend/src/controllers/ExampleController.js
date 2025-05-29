const { adicionarNome, buscarNome, alterarNome, deletarNome } = require('../services/ExampleService')

const ExampleController = {
  index: async (req, res) => {
    const nomes = await buscarNome()
    res.json(nomes)
  },

  show: async (req, res) => {
    const id = req.params.nomeId
    const nome = await buscarNome(id)
    if (!nome) return res.status(404).json({ error: 'Nome não encontrado' })
    res.json(nome)
  },

  store: async (req, res) => {
    const { nome } = req.body
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' })

    const novoNome = await adicionarNome(nome)
    res.status(201).json(novoNome)
  },

  update: async (req, res) => {
    const id = req.params.nomeId
    const { nome } = req.body
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório para atualizar' })

    const atualizado = await alterarNome(id, nome)
    if (!atualizado) return res.status(404).json({ error: 'Nome não encontrado' })

    res.json(atualizado)
  },

  destroy: async (req, res) => {
    const id = req.params.nomeId
    const deletado = await deletarNome(id)
    if (!deletado) return res.status(404).json({ error: 'Nome não encontrado' })

    res.status(204).send()
  }
}

module.exports = ExampleController

