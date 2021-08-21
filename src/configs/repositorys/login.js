const { database, dbInfos } = require('../database')
const Usuario = require('../../models/usuario')
const { generateHashToPWD } = require('../encrypt')

const loginOnApp = async (request, response) => {
  
  const { email, senha } = request.body

  const client = new database(dbInfos)

  client.connect();

  const requisicao = 'SELECT '
    + 'id, '
    + 'nome, '
    + 'sobrenome, '
    + 'idade, '
    + 'cidade, '
    + 'estado, '
    + 'email, '
    + 'senha '
    + 'FROM usuario '
    + 'WHERE email = $1'

  client.query(requisicao, [email], (error, result) => {
    
    const userReturned = result.rows[0]

    if (result.rows.length === 0) {
      response.status(200).json({ mensagem: 'USER_NOT_FOUND', item: [] })
    } else if (senha.length > 16) {
      response.status(200).json({ mensagem: 'PASSWORD_TOO_LONG', item: [] })
    } else if (userReturned.email === email && userReturned.senha === generateHashToPWD(senha)) {
      const usuarioLogado = new Usuario();
      usuarioLogado.setId(userReturned.id);
      usuarioLogado.setIdade(userReturned.idade);
      usuarioLogado.setCidade(userReturned.cidade);
      usuarioLogado.setEstado(userReturned.estado);
      usuarioLogado.setNome(userReturned.nome);
      usuarioLogado.setSobrenome(userReturned.sobrenome);
      usuarioLogado.setEmail(userReturned.email);
      usuarioLogado.usuarioOn();
      response.status(200).json({ mensagem: 'SUCCESS', item: [usuarioLogado] })
    } else if (error) {
      throw error
    }
  })
}

module.exports = {
  loginOnApp,
}