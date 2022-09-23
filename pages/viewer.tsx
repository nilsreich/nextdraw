import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import reactComponent from "../lib/test";
import { BroadcastChannel } from "broadcast-channel";

const Tiptap = () => {
  const channel = useMemo(() => new BroadcastChannel("color"), []);
  useEffect(() => {
    channel.onmessage = (msg) => {
      setContent(msg);
    };
  }, []);
  const editor = useEditor({
    extensions: [StarterKit, reactComponent],
    editable: true,
    content: "<p>Hello World! 🌎️</p><react-component />",
  });

  const [admin, setAdmin] = useState(true);

  const [content, setContent] = useState("");

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content]);

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
