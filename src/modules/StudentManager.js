const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/students/${id}`).then(result => result.json());
  },
  getAll() {
    return fetch(`${remoteURL}/students`).then(result => result.json());
  },
  post(newUser) {
    return fetch(`${remoteURL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  },
  delete(id) {
    return fetch(`${remoteURL}/students/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  update(editedUser) {
    return fetch(`${remoteURL}/students/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUser)
    }).then(data => data.json());
  }
};