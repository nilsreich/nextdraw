import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";
const inputRegex = /\$/;

export default Node.create({
  name: "reactComponent",
  group: "inline",
  inline: true,
  defining: true,
  isolating: true,
  atom: true,

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
  addAttributes() {
    // Return an object with attribute configuration
    return {
      count: {
        default: "0",
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
