const { estados } = require("../enums");

module.exports = class Usuario {

  constructor(id, idade, cidade, estado, nome, sobrenome, email, senha, statusLogin) {
    this._id = id;
    this._idade = idade;
    this._senha = senha;
    this._cidade = cidade;
    this._estado = estado;
    this._nome = nome;
    this._sobrenome = sobrenome;
    this._email = email;
    this.statusLogin = statusLogin;
  }

  getId() {
    return this._id;
  }

  setId(id) {

    if (typeof (id) == 'number') {
      this._id = id;
    } else {
      this._id = null;
    }

  }

  getIdade() {
    return this._idade;
  }

  setIdade(idade) {

    if (typeof (idade) == 'number') {
      this._idade = idade;
    } else {
      this._idade = null;
    }

  }

  getCidade() {
    return this._cidade;
  }

  setCidade(cidade) {

    if (typeof (cidade) == 'string') {
      this._cidade = cidade;
    } else {
      this._cidade = null;
    }

  }

  getEstado() {
    return this._estado;
  }

  setEstado(estado) {
    if (estados.indexOf(estado, -1)) {
      this._estado = estado;
    } else {
      this._estado = null;
    }
  }

  getNome() {
    return this._nome;
  }

  setNome(nome) {
    if (typeof (nome) == 'string') {
      this._nome = nome;
    } else {
      this._nome = null;
    }
  }

  getSobrenome() {
    return this._sobrenome;
  }

  setSobrenome(sobrenome) {
    if (typeof (sobrenome) == 'string') {
      this._sobrenome = sobrenome;
    } else {
      this._sobrenome = null;
    }
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    if (typeof (email) == 'string') {
      this._email = email;
    } else {
      this._email = null;
    }
  }

  getSenha() {
    return this._senha;
  }

  setSenha(senha) {
    if (typeof (senha) == 'string') {
      this._senha = senha;
    } else {
      this._senha = null;
    }
  }

  getStatusLogin() {
    if (typeof (this._statusLogin) != 'boolean') {
      return null;
    } else {
      return this._statusLogin;
    }
  }

  setStatusLogin(statusLogin) {
    if (typeof (statusLogin) != 'boolean') {
      this._statusLogin = null;
    } else {
      this._statusLogin = statusLogin;
    }
  }

  usuarioOn() {
    this.setStatusLogin(true)
    if (this._statusLogin == true) {
      console.log(`${this._nome} ${this._sobrenome} Online`)
    }
  }

  usuarioOff() {
    this.setStatusLogin(false)
    if (this._statusLogin == false) {
      console.log(`${this._nome} ${this._sobrenome} Offline`)
    }
    this._statusLogin = false;
  }
}