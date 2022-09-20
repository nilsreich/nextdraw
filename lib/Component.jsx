import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useState, useRef } from "react";
import katex from "katex";
import AsciiMathParser from "asciimath2tex";

export default ({ editor }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const parser = new AsciiMathParser();
  const [value, setValue] = useState("asd");
  const [visible, setVisible] = useState(false);
  const [eqn, setEqn] = useState("asd");
  const update = (e) => {
    setValue(e.target.value);
    setEqn(katex.renderToString(parser.parse(e.target.value)));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      showInput();
    }
  };
  const showInput = () => {
    setVisible(!visible);
    editor.commands.focus();
  };
  return (
    <NodeViewWrapper class="bg-red-100 inline-block">
      <div
        class=""
        dangerouslySetInnerHTML={{ __html: eqn }}
        onClick={() => showInput()}
      />
      <input
        value={value}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={update}
        className={`absolute my-2 ${visible ? "hidden" : ""}`}
      />
    </NodeViewWrapper>
  );
};
