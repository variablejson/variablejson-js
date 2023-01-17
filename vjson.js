class VariableJsonOptions {
  constructor(
    variableKey = "$vars",
    delimiter = ".",
    maxRecurse = 1024,
    keepVars = false,
    emittedName = "$vars"
  ) {
    this.variableKey = variableKey;
    this.delimiter = delimiter;
    this.maxRecurse = maxRecurse;
    this.keepVars = keepVars;
    this.emittedName = emittedName;
  }
}

class VariableJsonParser {
  constructor(json, options = new VariableJsonOptions()) {
    this.json = json;
    this.options = options;
    this.jsonObject = JSON.parse(this.json);
    this.outObject = {};
    this.recurse = 0;

    if (this.options.variableKey in this.jsonObject) {
      this.variables = JSON.parse(
        JSON.stringify(this.jsonObject[this.options.variableKey])
      );
      delete this.jsonObject[this.options.variableKey];
    }
  }

  parse() {
    if (this.variables === undefined || (this.variables && Object.keys(this.variables).length == 0)) {
      return JSON.stringify(this.jsonObject);
    }

    this.#parseDFS(this.jsonObject, this.outObject);

    if (this.options.keepVars) {
      this.outObject[this.options.emittedName] = this.variables;
    }

    return JSON.stringify(this.outObject);
  }

  #parseDFS(node, outNode, path = "") {
    if (typeof node == "object") {
      for (const key in node) {
        this.#insertNode(outNode, path + this.options.delimiter + key, node[key]);
      }
    } else if (Array.isArray(node)) {
      for (i = 0; i < node.length; i++) {
        this.#insertNode(outNode, path + this.options.delimiter + i, node[i]);
      }
    }
  }

  #insertNode(node, path, value) {
    var isRefInfo = this.#isRef(value);
    if (isRefInfo.found) {
      this.recurse = 0;
      var findRefInfo = this.#findRef(isRefInfo.value);
      if (!findRefInfo.found) {
        throw new ReferenceError("Variable " + isRefInfo.value + " not found");
      } else {
        value = findRefInfo.value;
      }
    }

    var pathInfo = this.#parsePath(path);

    if (value == null) {
      this.#insertNodeUntyped(node, null, pathInfo.key);
    } else if (Array.isArray(value)) {
      vnode = [];
      this.#parseDFS(value, vnode);
      this.#insertNodeUntyped(node, vnode, pathInfo.key);
    } else if (typeof value == "object") {
      var vnode = {};
      this.#parseDFS(value, vnode);
      this.#insertNodeUntyped(node, vnode, pathInfo.key);
    } else {
      this.#insertNodeUntyped(node, value, pathInfo.key);
    }
  }

  #insertNodeUntyped(node, value, key = "") {
    if (Array.isArray(node)) {
      node.push(value);
    } else if (typeof node == "object") {
      node[key] = value;
    }
  }

  #parsePath(path) {
    if (path.startsWith(this.options.delimiter)) {
      path = path.substring(this.options.delimiter.length);
    }

    var parts = path.split(this.options.delimiter);
    var key = parts[parts.length - 1];
    parts.pop();

    return {
      parts: parts,
      key: key
    }
  }

  #isRef(value) {
    var out = {
      found: false,
      value: null
    }

    if (typeof value !== "string") {
      return out;
    }

    if (value.length > 3 && value.startsWith("$(") && value.endsWith(")")) {
      return {
        found: true,
        value: value.substring(2, value.length - 1)
      };
    }

    return out;
  }

  #findRef(ref) {
    var pathInfo = this.#parsePath(ref);

    return this.#findRefDFS(this.variables, pathInfo.parts, pathInfo.key);
  }

  #findRefDFS(node, path, key) {
    this.recurse++;
    if (this.recurse > this.options.maxRecurse) {
      throw new RangeError("Max recursion reached");
    }

    var returnObj = {
      found: false,
      value: null
    }

    if (Array.isArray(node)) {
      if (path.length > 0) {
        var index = parseInt(path[0]);
        var obj = node[index];

        var isRefInfo = this.#isRef(obj);
        var findRefInfo = this.#findRef(isRefInfo.value);

        var refObj = findRefInfo.value;
        return this.#findRefDFS(refObj, path.slice(1), key);
      } else {
        var index = parseInt(key);
        if (index != NaN) {
          if (index < node.length) {
            var obj = node[index];
            var isRefInfo = this.#isRef(obj);
            if (isRefInfo.found) {
              var findRefInfo = this.#findRef(isRefInfo.value);
              returnObj.found = true;
              returnObj.value = findRefInfo.value;
              return returnObj;
            } else {
              returnObj.found = true;
              returnObj.value = obj;
              return returnObj;
            }
          } else {
            throw new RangeError("Index " + index + " out of range");
          }
        } else {
          throw new TypeError("Index \"key\" is not an integer");
        }
      }
    } else if (typeof node == "object") {
      if (path.length > 0) {
        var obj = node[path[0]];
        var isRefInfo = this.#isRef(obj);
        if (isRefInfo.found) {
          var findRefInfo = this.#findRef(isRefInfo.value);
          return this.#findRefDFS(findRefInfo.value, path.slice(1), key);
        } else {
          if (typeof obj == "object" || Array.isArray(obj)) {
            return this.#findRefDFS(obj, path.slice(1), key);
          }
          else {
            throw new ReferenceError("Invalid path " + path.join(this.options.delimiter) + this.options.delimiter + key);
          }
        }
      } else {
        if (key in node) {
          returnObj.value = node[key];

          var isRefInfo = this.#isRef(node[key]);
          if (isRefInfo.found) {
            return this.#findRef(isRefInfo.value);
          }

          returnObj.found = true;

          return returnObj;
        }
      }
    }

    return returnObj;
  }
}

function parse(json, options = new VariableJsonOptions()) {
  var parser = new VariableJsonParser(json, options);
  return parser.parse();
}

module.exports = {
  VariableJsonOptions: VariableJsonOptions,
  parse: parse,
};
