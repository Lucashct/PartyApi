const express = require('express')
const bodyParser = require('body-parser')
const crudUsers = require('./configs/repositorys/crudUsers')
const crudPost = require('./configs/repositorys/crudPost')
const login = require('./configs/repositorys/login')
const app = express()
const port = 3000

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/usuario/recuperar', crudUsers.getUsuario)
app.post('/usuario/criar', crudUsers.createUsuario)
app.delete('/usuario/remover', crudUsers.deleteUsuario)
app.get('/login', login.loginOnApp)
app.get('/post/recuperar', crudPost.getPost)
app.post('/post/criar', crudPost.createPost)
app.delete('/post/deletar', crudPost.deletePost)

app.listen(port, () => {
  console.log(`Servidor rodando na porta de conexão ${port}.`)
})