const Usuario = require("../../models/usuario");
const { database, dbInfos } = require("../database");
const { generateHashToPWD } = require('../encrypt')
 
const getUsuario = async (request, response) => {

  const client = new database(dbInfos)

  await client.connect();

  const sqlById = 'SELECT '
    + 'id, '
    + 'nome, '
    + 'sobrenome, '
    + 'idade, '
    + 'cidade, '
    + 'estado, '
    + 'email '
    + 'FROM usuario '
    + 'WHERE id = $1;'

  const sqlforAll = 'SELECT '
    + 'id, '
    + 'nome, '
    + 'sobrenome, '
    + 'idade, '
    + 'cidade, '
    + 'estado, '
    + 'email '
    + 'FROM usuario; '

  if (Object.values(request.body).length > 0) {
    const id = request.body.id;
    client.query(sqlById, [id], (error, results) => {
      if (error) {
        throw error;
      } else if (results.rows.length > 0) {
        response.status(200).json({ mensagem: 'SUCCESS', item: results.rows });
      } else {
        response.status(404).json({ mensagem: 'USER_NOT_FOUND', item: results.rows });
      }
    })
  } else {
    client.query(sqlforAll, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ mensagem: 'SUCCESS_FOR_ALL', item: results.rows });
    })
  }

  client.end();
}

const createUsuario = async (request, response) => {

  const client = new database(dbInfos);

  const payload = request.body;

  let emailsExistentes = [];

  const userCreated = new Usuario;
  userCreated.setNome(payload.nome);
  userCreated.setSobrenome(payload.sobrenome);
  userCreated.setEmail(payload.email);
  userCreated.setIdade(payload.idade);
  userCreated.setSenha(generateHashToPWD(payload.senha));
  userCreated.setCidade(payload.cidade);
  userCreated.setEstado(payload.estado);

  const sqlVerifyEmail = 'SELECT '
    + 'email '
    + 'FROM usuario;'

  const sql = 'INSERT INTO usuario ('
    + 'nome, '
    + 'sobrenome, '
    + 'email, '
    + 'idade, '
    + 'senha, '
    + 'cidade, '
    + 'estado) VALUES '
    + '($1, $2, $3, $4, $5, $6, $7)'

  await client.connect();

  client.query(sqlVerifyEmail, (error, results) => {
    if (error) {
      throw error;
    } else if (results.rows.length != 0) {
      results.rows.forEach(item => {
        emailsExistentes.push(item.email)
      });
    }
    if (!emailsExistentes.includes(userCreated.getEmail())) {
      client.query(sql, [
        userCreated.getNome(),
        userCreated.getSobrenome(),
        userCreated.getEmail(),
        userCreated.getIdade(),
        userCreated.getSenha(),
        userCreated.getCidade(),
        userCreated.getEstado()], (error, results) => {
          if (error) {
            throw error
          } else {
            response.status(201).json({
              mensagem: 'SUCCESS', item: [
                {
                  email: userCreated.getEmail(),
                  nome: userCreated.getNome(),
                  sobrenome: userCreated.getSobrenome(),
                }
              ]
            });
            client.end();
          }
        });
    } else {
      response.status(406).json({ mensagem: 'EMAIL_ALREADY_EXIST', item: null })
      client.end();
    }
  });

}

const deleteUsuario = async (request, response) => {

  const client = new database(dbInfos);

  const id = request.body.id;

  const sql = 'DELETE FROM '
    + 'usuario '
    + 'WHERE id = $1'

  await client.connect();

  client.query(sql, [id], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json({ mensagem: 'SUCCESS', item: { id: id } })
  })
  client.end();
}
module.exports = {
  getUsuario,
  createUsuario,
  deleteUsuario,
}