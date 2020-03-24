const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/studentParents/${id}`).then(result => result.json());
  },
  getAll() {
    return fetch(`${remoteURL}/studentParents`).then(result => result.json());
  },
  getAllStudentInfo() {
    return fetch(`${remoteURL}/studentParents?_expand=student`).then(result => result.json());
  },
  post(newUser) {
    return fetch(`${remoteURL}/studentParents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json());
  },
  delete(id) {
    return fetch(`${remoteURL}/studentParents/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  update(editedUser) {
    return fetch(`${remoteURL}/studentParents/${editedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedUser)
    }).then(data => data.json());
  }
};