// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);
    
function removeOneCharacter(index, userId) {
  const promise = fetch(`http://localhost:8000/users/${userId}`, { method: 'DELETE' });
  
  promise.then(response => {
    if (response.ok) {
      const updated = characters.filter((character, i) => i !== index);
      setCharacters(updated);
    } else if (response.status === 404) {
      alert('User not found');
    } else {
      alert('Failed to delete user');
    }
  }).catch(error => {
    alert('An error occurred while deleting user');
  });
}

  function updateList(person) { 
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
  }, [] );

  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
      <Form handleSubmit={updateList} />
  </div>
);
    
}

export default MyApp;
