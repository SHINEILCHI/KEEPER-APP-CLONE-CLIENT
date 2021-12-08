import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  const [inputContent, setInputContent] = useState({
    title: "",
    content: ""
  });

  const [isTitleToggled, setIsTitleToggled] = useState(false);

  function handleOnChange(event) {
    const { name, value } = event.target;
    setInputContent((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleOnClick(event) {
    event.preventDefault();
    return props.addNote(inputContent, setInputContent);
  }

  return (
    <div>
      <form className="create-note">
        {isTitleToggled && (<input
          onChange={handleOnChange}
          value={inputContent.title}
          name="title"
          placeholder="Title"
        />)}
        <textarea
          onChange={handleOnChange}
          onClick={() => {return setIsTitleToggled(true);}}
          value={inputContent.content}
          name="content"
          placeholder="Take a note..."
          rows={isTitleToggled ? "3" : "1"}
        />
        <Zoom in={true}>
          <Fab className="fab-button" onClick={handleOnClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
