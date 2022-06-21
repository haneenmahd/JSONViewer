class JSONInjector extends Parser {
  /**
   *
   * @param {Element} el
   */
  static inject(json, el) {
    let children = [];
    let keys = Object.keys(json);

    keys.forEach((key) => {
      let propertyContent = `<div class="row">
            <b>${key}</b>: <i>${json[key]}</i>
        </div>`;

      children.push(propertyContent);
    });

    el.innerHTML = children;
  }
}
