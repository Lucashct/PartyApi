const Post = require("../../models/post");
const { database, dbInfos } = require("../database")
const login = require("./login")

const getPostById = async (request, response) => {

  const client = new database(dbInfos);

  await client.connect();

  const sqlById = 'SELECT '
    + 'id, '
    + 'title, '
    + 'body, '
    + 'data, '
    + 'tempo, '
    + 'id_usuario '
    + 'FROM post '
    + 'WHERE id = $1'

  const sqlforAll = 'SELECT '
    + 'id, '
    + 'title, '
    + 'body, '
    + 'data, '
    + 'tempo, '
    + 'id_usuario '
    + 'FROM post; '

  if (Object.values(request.body).length > 0) {
    const id = request.body.id;

    client.query(sqlById, [id], (error, results) => {
      if (error) {
        throw error;
      } else if (results.rows > 0) {
        response.status(200).json({ mensagem: 'SUCESSO', item: results.rows })
      } else {
        response.status(404).json({ mensagem: 'USER_NOT_FOUND', item: results.rows })
      }
    })
  } else {
    client.query(sqlforAll, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({ mensagem: 'SUCESSO_ALL', item: results.rows })
    })
  }
  client.end();
}

const createPost = async (request, response) => {

  const client = new database(dbInfos);

  await client.connect();

  const payload = request.body;

  const postCreated = new Post;
  postCreated.setTitle(payload.title);
  postCreated.setBody(payload.body);
  postCreated.setData(payload.data);
  postCreated.setTempo(payload.tempo);
  postCreated.setIdUsuario(payload.idUsuario);

  const sql = 'INSERT INTO post ('
    + 'title, '
    + 'body, '
    + 'data, '
    + 'tempo, '
    + 'id_usuario) VALUES '
    + '($1, $2, $3, $4, $5);'

  client.query(sql, [
    postCreated.getTitle(),
    postCreated.getBody(),
    postCreated.getData(),
    postCreated.getTempo(),
    postCreated.getIdUsuario()], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ mensagem: 'SUCESSO', item: results.rows })
    });

  client.end();
}

const deletePost = async (request, response) => {
  const client = new database(dbInfos);
  
  const id = request.body.id
}

module.exports = {
  getPostById,
  createPost,
  deletePost,
}