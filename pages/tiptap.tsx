import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState, useMemo } from "react";
import reactComponent from "../lib/test";
import { BroadcastChannel } from "broadcast-channel";

const Tiptap = () => {
  const channel = useMemo(() => new BroadcastChannel("color"), []);

  const editor = useEditor({
    extensions: [StarterKit, reactComponent],
    content: "<p>Hello World! 🌎️</p><react-component />",
    onUpdate({ editor }) {
      let temp_content = editor.getJSON();
      channel.postMessage(temp_content);
    },
  });

  const [admin, setAdmin] = useState(true);

  const toggleUser = () => {
    setAdmin(!admin);
  };

  return (
    <div>
      <button onClick={() => toggleUser}> toggleUser </button>
      <EditorContent editor={editor} className="prose" />
    </div>
  );
};

export default Tiptap;
