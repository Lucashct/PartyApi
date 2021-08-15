const { database, dbInfos } = require('../database')
const Usuario = require('../../models/usuario')

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
    + 'WHERE senha = $1'

  client.query(requisicao, [senha], (error, result) => {
    
    const userReturned = result.rows[0]

    if (error) {
      throw error
    } else if (userReturned.email === email && userReturned.senha === senha) {
      const usuarioLogado = new Usuario();
      usuarioLogado.setId(userReturned.id);
      usuarioLogado.setIdade(userReturned.idade);
      usuarioLogado.setCidade(userReturned.cidade);
      usuarioLogado.setEstado(userReturned.estado);
      usuarioLogado.setNome(userReturned.nome);
      usuarioLogado.setSobrenome(userReturned.sobrenome);
      usuarioLogado.setEmail(userReturned.email);
      usuarioLogado.usuarioOn();
      response.status(200).json({ mensagem: 'SUCCESS', item: result.rows })
    } else {
      response.status(400).json({ mensagem: 'QUERY_ERROR', item: [] })
    }
  })
}

module.exports = {
  loginOnApp,
}