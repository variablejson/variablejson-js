const VariableJson = require("./vjson");

test('test1', () => {
  expect(JSON.stringify(VariableJson.parse(JSON.stringify(test1_input)))).toBe(JSON.stringify(test1_truth));
});

const test1_input = {
  "a": "a",
  "b": 1,
  "c": true,
  "d": null,
  "e": ["a", 1, false, null],
  "f": {
    "g": "a",
    "h": 1,
    "i": true,
    "j": null
  }
}

const test1_truth = {
  "a": "a",
  "b": 1,
  "c": true,
  "d": null,
  "e": ["a", 1, false, null],
  "f": {
    "g": "a",
    "h": 1,
    "i": true,
    "j": null
  }
}