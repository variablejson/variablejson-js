const path = require('path');
const fs = require('fs');

const VariableJson = require("./vjson");

function readAllText(path) {
  return fs.readFileSync(path).toString();
};

test('Test1', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test1.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test1.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test2', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test2.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test2.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test3', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test3.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test3.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test4', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test4.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(ReferenceError);
  expect(error).toThrow("Variable c not found");
});

test('Test5', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test5.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(RangeError);
  expect(error).toThrow("Max recursion reached");
});

test('Test6', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test6.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test6.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test7', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test7.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test7.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test8', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test8.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test8.truth.json"));

  let options = new VariableJson.VariableJsonOptions();
  options.variableKey = "$variables";

  expect(VariableJson.parse(input, options)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test9', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test9.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test9.truth.json"));

  let options = new VariableJson.VariableJsonOptions();
  options.keepVars = true;

  expect(VariableJson.parse(input, options)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test10', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test10.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(SyntaxError);
});

test('Test11', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test11.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(ReferenceError);
  expect(error).toThrow("Variable john.name not found");
});

test('Test12', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test12.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(ReferenceError);
});

test('Test13', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test13.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test13.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test14', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test14.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test14.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test15', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test15.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test15.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test16', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test16.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test16.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test17', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test17.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(RangeError);
  expect(error).toThrow("Index 1 out of range");
});

test('Test18', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test18.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test18.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test19', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test19.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(RangeError);
  expect(error).toThrow("Index NaN out of range")
});

test('Test20', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test20.input.json"));
  let truth = readAllText(path.join(__dirname, "test_data", "Test20.truth.json"));
  expect(VariableJson.parse(input)).toBe(JSON.stringify(JSON.parse(truth)));
});

test('Test21', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test21.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(ReferenceError);
  expect(error).toThrow("Invalid path d.z");
});

test('Test22', () => {
  let input = readAllText(path.join(__dirname, "test_data", "Test22.input.json"));
  const error = () => {
    VariableJson.parse(input);
  }
  expect(error).toThrow(ReferenceError);
  expect(error).toThrow("Variable c.d.z not found");
});