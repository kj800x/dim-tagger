import React from "react";

import * as SAMPLE_DATA from "./SampleData.js";

export default function Instructions({ setFileType, setFileContents }) {
  return (
    <>
      <div className="section">
        <h2>Instructions</h2>
        To use this app, go to your Destiny Item Manager settings and scroll to
        the bottom. There is a setting for you to download spreadsheets of your
        weapons, armor, and ghosts. Download the type of item that you want to
        tag (only armor is supported for now) and then upload it into the Input
        CSV field above. The file will be loaded and auto-tagged. You will be
        able to download the results with the Output CSV button and you can
        upload the tagged CSV back to Destiny Item Manager.
      </div>
      <div className="section">
        <h2>Sample Data</h2>
        Click a button below to load sample data.
        <div className="m-top-2">
          <button
            className="m-right-2"
            onClick={() => {
              setFileType(SAMPLE_DATA.WEAPONS_FILE_NAME);
              setFileContents(SAMPLE_DATA.WEAPONS_FILE_CONTENTS);
            }}
          >
            Sample Weapons
          </button>
          <button
            className="m-right-2"
            onClick={() => {
              setFileType(SAMPLE_DATA.ARMOR_FILE_NAME);
              setFileContents(SAMPLE_DATA.ARMOR_FILE_CONTENTS);
            }}
          >
            Sample Armor
          </button>
          <button
            className="m-right-2"
            onClick={() => {
              setFileType(SAMPLE_DATA.GHOSTS_FILE_NAME);
              setFileContents(SAMPLE_DATA.GHOSTS_FILE_CONTENTS);
            }}
          >
            Sample Ghosts
          </button>
        </div>
      </div>
    </>
  );
}
