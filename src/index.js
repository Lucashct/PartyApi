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

app.post('/usuario/recuperar', crudUsers.getUsuario)
app.post('/usuario/criar', crudUsers.createUsuario)
app.post('/usuario/remover', crudUsers.deleteUsuario)
app.post('/login', login.loginOnApp)
app.post('/post/recuperar', crudPost.getPost)
app.post('/post/criar', crudPost.createPost)
app.post('/post/deletar', crudPost.deletePost)

app.listen(port, () => {
  console.log(`Servidor rodando na porta de conexão ${port}.`)
})