import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";
const inputRegex = /\$/;

export default Node.create({
  name: "reactComponent",
  group: "inline",
  inline: true,

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
