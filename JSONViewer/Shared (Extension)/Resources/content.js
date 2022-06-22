let bodyContent = document.body.innerHTML;

document.body.style.fontFamily = "system-ui, Monaco, monospace, sans-serif";
document.body.style.fontSize = "0.9rem";

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse({ content: bodyContent });
});

function filterJson(html) {
  let jsonStartIndex = html.indexOf("{");
  let jsonEndIndex = html.lastIndexOf("}") + 1;

  let json = html.substring(jsonStartIndex, jsonEndIndex);

  try {
    let parsedJson = JSON.parse(json);

    return parsedJson;
  } catch (error) {
    throw new Error(`Error occured while parsing JSON\n${error}`);
  }
}

function convertToReadableJSON(json) {
  let value = "";

  let keys = Object.keys(json);

  keys.forEach((key) => {
    let newProperty = `
<details style="margin: 10px">
<summary><b style="font-size: 1.05rem; color: #111;">${key}</b>: <span style="margin: 0.2rem;font-size: 1rem; color: #222;">${
      json[key]
    }</span></summary>
<div style="margin: 0.5rem;font-size: 1rem; color: #555;">${
      typeof json[key] === "object"
        ? convertToReadableJSON(json[key])
        : json[key]
    }</div>
</details>
`;

    value += newProperty;
  });

  return value;
}

function createElement(node, text) {
  const el = document.createElement("span");

  el.innerHTML = text;

  node.appendChild(el);
}

let parsedJson = JSON.parse(
  JSON.stringify(filterJson(document.body.innerHTML))
);

document.body.innerHTML = convertToReadableJSON(parsedJson);
