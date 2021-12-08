import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note.jsx";
import CreateArea from "./CreateArea";
import Axios from "axios";


function App(props) {
  const [noteItems, setNoteItems] = useState([]);

  // get the current notes inside the database
  useEffect(() => {
    Axios.get("https://keeper-app-clone-mern-stack.herokuapp.com/").then((response) => {
      setNoteItems(response.data)
    })
  }, [])

  async function refreshPage() {
    const response = await Axios.get("https://keeper-app-clone-mern-stack.herokuapp.com/");
    
    if (response.status === 200){
      setNoteItems(response.data);
    } else {
      console.log(response.status)
    }
  }

  async function addNote(inputContent, setInputContent) {
    const response = await Axios.post("https://keeper-app-clone-mern-stack.herokuapp.com/createNote", {
      title: inputContent.title, 
      content: inputContent.content
    });

    if (response.status === 200){
      setNoteItems((prevNoteItems) => {
        return [...prevNoteItems, response.data];
      });
  
      setInputContent({ title: "", content: "" });
      refreshPage();
    } else {
      console.log(response.status)
    }    
  }

  async function deleteNote(_id) {
    const response = await Axios.delete("https://keeper-app-clone-mern-stack.herokuapp.com/deleteNote", {params: { _id }});
    if (response.status === 200) {
      setNoteItems((prevNoteItems) => {
        return prevNoteItems.filter((note) => {
          return note._id !== _id;
        });
      });
    } else {
      console.log(response.status);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {noteItems.map((note, index) => {
        return (
          <Note
            key={index}
            _id={note._id}
            title={note.title}
            content={note.content}
            deleteNoteFunction={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
