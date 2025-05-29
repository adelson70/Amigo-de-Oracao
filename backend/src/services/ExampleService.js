const fs = require('fs')
const path = require('path')

const dataFilePath = path.resolve(__dirname, '../database/data.json')

const lerDados = () => {
  const dados = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(dados)
}

const salvarDados = (dados) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(dados, null, 2))
}

const buscarNome = (id = null) => {
  const dados = lerDados()
  if (id) {
    return dados[id] || null
  }
  return dados
}

const adicionarNome = (nome) => {
  const dados = lerDados()
  const novoId = String(Math.max(...Object.keys(dados).map(Number)) + 1)
  dados[novoId] = nome
  salvarDados(dados)
  return { id: novoId, nome }
}

const alterarNome = (id, nome) => {
  const dados = lerDados()
  if (!dados[id]) return null
  dados[id] = nome
  salvarDados(dados)
  return { id, nome }
}

const deletarNome = (id) => {
  const dados = lerDados()
  if (!dados[id]) return false
  delete dados[id]
  salvarDados(dados)
  return true
}

module.exports = {
  buscarNome,
  adicionarNome,
  alterarNome,
  deletarNome
}

