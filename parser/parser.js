let generator = function(tokens, index) {
  let parsedobj = null;

  for (let i = index; i < tokens.length; i++) {
    if (tokens[i].type == "bracket") {
      if (tokens[i].value === ")") {
        return [parsedobj, i];
      } else {
        let returnobj = generator(tokens, i + 1);
        let nestedobj = returnobj[0];
        let currindex = returnobj[1];
        i = currindex;
        nestedobj.istoken = false;
        parsedobj = generateUnit(nestedobj, parsedobj);
      }
    } else {
      parsedobj = generateUnit(tokens[i], parsedobj);
    }
  }
  return parsedobj;
};

function generateUnit(token, prev) {
  if (token.istoken == false) {
    prev.right = token;
    return prev;
  } else {
    if (token.type == "number") {
      if (prev) {
        prev.right = { type: "number", value: token.value };
        return prev;
      } else {
        return { type: "number", value: token.value };
      }
    }

    if (token.type == "operator") {
      if (prev) {
        let obj = { left: prev, type: token.value };
        return obj;
      }
    }

    if (token.type == "(end)") {
      return prev;
    }
  }
}

function parser(tokens) {
  let index = 0;
  let parsedobj = generator(tokens, index);
  return parsedobj;
}

exports.parser = parser;
