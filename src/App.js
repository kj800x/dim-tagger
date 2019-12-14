import React, { useRef, useCallback, useState } from "react";
import "./App.css";
import InventoryFile from "./InventoryFile";

function App() {
  const fileRef = useRef(null);
  const [fileType, setFileType] = useState(null);
  const [fileContents, setFileContents] = useState(null);

  const fileCallback = useCallback(() => {
    const files = fileRef.current.files;
    if (files.length < 1) {
      setFileType(null);
      setFileContents(null);
      return;
    }
    const file = files[0];
    setFileType(file.name);

    var reader = new FileReader();
    reader.onload = function(evt) {
      setFileContents(evt.target.result);
    };
    reader.readAsText(file);
  }, [fileRef]);

  return (
    <div>
      <header>
        <p>DIM-Tagger</p>
      </header>
      <div>
        <input type="file" ref={fileRef} onChange={fileCallback} />
        <InventoryFile type={fileType} contents={fileContents} />
      </div>
    </div>
  );
}

export default App;
