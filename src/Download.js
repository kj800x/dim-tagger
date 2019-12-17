import React from "react";

const Download = ({ children, filename, contents }) => {
  return (
    <button
      onClick={() => {
        const a = document.createElement("a");
        const b = new Blob([contents], { type: "octet/stream" });
        a.href = window.URL.createObjectURL(b);
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(a.href);
      }}
    >
      {children}
    </button>
  );
};

export default Download;
