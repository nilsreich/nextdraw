import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useState, useRef } from "react";
import katex from "katex";
import AsciiMathParser from "asciimath2tex";

export default (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current.focus()
    setEqn(katex.renderToString(parser.parse(props.node.attrs.count)));
  }, [props]);

  const parser = new AsciiMathParser();
  const [value, setValue] = useState("asd");
  const [visible, setVisible] = useState(true);
  const [eqn, setEqn] = useState("asd");
  const update = (e) => {
    setValue(e.target.value);
    setEqn(katex.renderToString(parser.parse(e.target.value)));
    props.updateAttributes({
      count: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      showInput();
    }
  };
  const showInput = () => {
    setVisible(!visible);
    props.editor.commands.focus();
  };
  return (
    <NodeViewWrapper className="bg-red-100 inline-block">
      <div
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
