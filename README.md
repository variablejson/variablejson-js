[You can find the README in the project community repository.](https://github.com/variablejson/variablejson)

### Adding VariableJson to your project

VariableJson is published to NPM and can be installed using the following command:

```bash
npm install variablejson
```

If you need a different build artifact, you can clone this repository and run `npm run build` to create a UMD module or configure your own build process that meets your needs.

### Usage

To use VariableJson in a JavaScript project you must first import the `variablejson` module. You can then use call the `parse()` function, passing in the JSON string to be parsed and any (optional) parser options.

```javascript
const VariableJson = require('variablejson');

let json = fs.readFileSync('example.json', 'utf8');
let parsedJson = VariableJson.parse(json);
```

`parsedJson` is now the parsed version of the `example.json` file. You can then use the `parsedJson` string as you would with any other JSON string, such as deserializing it using the built-in `JSON.parse()` to create a JavaScript object.

> **Note**
> These examples show us loading JSON data in by reading a file, but how you get your JSON data is up to you. You can load it from a file, a database, a web service, or any other source, just as you'd expect.

### VariableJsonOptions

If you need to change any of the default parser options, you can pass in a `VariableJsonOptions` object to the `parse()` function.

```javascript
const VariableJson = require('variablejson');

let json = fs.readFileSync('example.json', 'utf8');

let options = new VariableJson.VariableJsonOptions();
options.keepVars = true;

let parsedJson = VariableJson.parse(json, options);
```

In this example, we set the `keepVars` option to `true`. This will cause the variable container to be kept in the output. The variable container will **not** be parsed, it will remain an identical copy of the one from the input JSON.