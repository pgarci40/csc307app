import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
function MyApp(){
  const[characters, setCharacters] = useState([
     {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "zoo975",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "hsg072",
      name: "Dee",
      job: "Aspiring actress",
    },
    {
      id: "pop625",
      name: "Dennis",
      job: "Bartender",
    }
  ]);
  function removeOneCharacter(index){
    const toDelete = characters[index];
    const id = toDelete?.id;
    if(!id){
      console.error("Can't delete");
      return;
    }
    fetch(`http://localhost:8000/users/${id}`, {method: "DELETE"})
      .then(res =>{
        if(res.status === 204){
          setCharacters(prev => prev.filter((_, i) => i !== index));
        }
      })
      .catch(err => console.error("Error deleting:", err))
  }
  function updateList(person){
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(person),
    })
    .then(res => res.json())
    .then(newUser => setCharacters([...characters, newUser]))
    .catch(err => console.error(err));
  }
  function postUser(person){
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }
  return(
    <div className ="container">
      <Table 
        characterData={characters}
        removeCharacter={removeOneCharacter} 
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;