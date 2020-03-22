const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/notes/${id}`).then(result => result.json());
  },
  getAll() {
    return fetch(`${remoteURL}/notes`).then(result => result.json());
  },
  post(newUser) {
    return fetch(`${remoteURL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  },
  delete(id) {
    return fetch(`${remoteURL}/notes/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  update(editedUser) {
    return fetch(`${remoteURL}/notes/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUser)
    }).then(data => data.json());
  }
};