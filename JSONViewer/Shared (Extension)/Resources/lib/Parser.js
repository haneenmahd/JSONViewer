class Parser {
  /**
   * @param {string} html
   * @returns {JSON}
   */
  static parse(html) {
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
}
