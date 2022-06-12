let bodyElement = document.getElementById("content");

function convertToReadableJSON(json) {
  let value = "";
    
  json = json.substring(json.indexOf("{"), json.lastIndexOf("}") + 1)
    
  json = JSON.parse(json)

  let keys = Object.keys(json);

  keys.forEach((key) => {
    let newProperty = `
<div style="row">
<b>${key}</b>: <i>${json[key]}</i>
</div>
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

let tabs = await browser.tabs.query({active: true, currentWindow: true});
let response = await browser.tabs.sendMessage(tabs[0].id, {type: "content"});

for (const value of Object.values(response)) {
  createElement(bodyElement, convertToReadableJSON(value));
}
