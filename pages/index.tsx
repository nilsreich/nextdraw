import type { NextPage } from "next";
import { useState } from "react";
import { marked } from "marked";
import katex from "katex";
import AsciiMathParser from "asciimath2tex";

const Home: NextPage = () => {
  const parser = new AsciiMathParser();
  const renderer = new marked.Renderer();
  let originParagraph = renderer.paragraph.bind(renderer);
  renderer.paragraph = (text) => {
    const blockRegex = /\$\$[^\$]*\$\$/g;
    const inlineRegex = /\$[^\$]*\$/g;
    let blockExprArray = text.match(blockRegex);
    let inlineExprArray = text.match(inlineRegex);
    for (let i in blockExprArray) {
      const expr = blockExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
    for (let i in inlineExprArray) {
      const expr = inlineExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
    return originParagraph(text);
  };
  function renderMathsExpression(expr) {
    if (expr[0] === "$" && expr[expr.length - 1] === "$") {
      let displayStyle = false;
      expr = expr.substr(1, expr.length - 2);
      if (expr[0] === "$" && expr[expr.length - 1] === "$") {
        displayStyle = true;
        expr = expr.substr(1, expr.length - 2);
      }
      let html = null;
      try {
        html = katex.renderToString(parser.parse(expr));
      } catch (e) {
        console.err(e);
      }
      if (displayStyle && html) {
        html = html.replace(
          /class="katex"/g,
          'class="katex katex-block" style="display: block;"'
        );
      }
      return html;
    } else {
      return null;
    }
  }
  marked.setOptions({ renderer: renderer });
  const [value, setValue] = useState("asd");
  const update = (e: any) => {
    setValue(e.target.value);
    setContent(marked.parse(e.target.value));
  };

  const [content, setContent] = useState("asd");

  return (
    <div className="flex h-screen flex-col">
      <div className="flex grow">
        <textarea
          className="w-1/2 border-r p-4 focus:outline-none"
          onChange={(e) => update(e)}
          value={value}
        ></textarea>
        <div
          className="w-1/2 p-4 prose"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <div className="border-t p-2">Toolbar</div>
    </div>
  );
};

export default Home;
