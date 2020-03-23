const remoteURL = "http://localhost:5002";


export default {

  get(id) {
    return fetch(`${remoteURL}/milestones/${id}`).then(result => result.json());
  },
  
  getAll() {
    return fetch(`${remoteURL}/milestones`).then(results => results.json());
  },
  
  post(newTask) {
    return fetch(`${remoteURL}/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    }).then(data => data.json());
  },
  
  delete(id) {
    return fetch(`${remoteURL}/milestones/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  
  update(editedTask) {
    return fetch(`${remoteURL}/milestones/${editedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTask)
    }).then(data => data.json());
  },

  changeComplete(id, completeDate) {
      return fetch(`${remoteURL}/milestones/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
           body: JSON.stringify({id, completeDate})
      })
  }
};
