module.exports = class Post {

  constructor(id, title, body, data, tempo, idUsuario) {

    this._id = id;
    this._title = title;
    this._body = body;
    this._data = data;
    this._tempo = tempo;
    this._idUsuario = idUsuario;

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

  getTitle() {
    return this._title;
  }

  setTitle(title) {
    if (typeof (title) == 'string') {
      this._title = title;
    } else {
      this._title = null;
    }
  }

  getBody() {
    return this._body;
  }

  setBody(body) {
    if (typeof (body) == 'string') {
      this._body = body;
    } else {
      this._body = null;
    }
  }

  getData() {
    return this._data;
  }

  setData(data) {
    if (typeof (data) == 'string') {
      this._data = data;
    } else {
      this._data = null;
    }
  }

  getTempo() {
    return this._tempo;
  }

  setTempo(tempo) {
    if (typeof (tempo) == 'string') {
      this._tempo = tempo;
    } else {
      this._tempo = null;
    }
  }

  getIdUsuario() {
    return this._idUsuario;
  }

  setIdUsuario(idUsuario) {
    if (typeof (idUsuario) == 'number') {
      this._idUsuario = idUsuario;
    } else {
      this._idUsuario = null;
    }
  }
}