import React, { useRef, useCallback, useState } from "react";

import InventoryFile from "./InventoryFile";
import Instructions from "./Instructions";

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
        <h1>DIM-Tagger</h1>
      </header>
      <div className="section">
        Input CSV: <input type="file" ref={fileRef} onChange={fileCallback} />
      </div>
      <InventoryFile type={fileType} contents={fileContents} />
      {fileType === null ? (
        <Instructions
          setFileType={setFileType}
          setFileContents={setFileContents}
        />
      ) : null}
    </div>
  );
}

export default App;
