import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import reactComponent from "../lib/test";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, reactComponent],
    content: "<p>Hello World! 🌎️</p><react-component />",
  });

  const [admin, setAdmin] = useState(true);

  const toggleUser = () => {
    setAdmin(!admin);
    console.log(admin);
  };
  return (
    <div>
      <button onClick={() => toggleUser}> toggleUser </button>
      <EditorContent editor={editor} className="prose" />
    </div>
  );
};

export default Tiptap;
