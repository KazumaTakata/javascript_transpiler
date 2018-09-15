let generator = function(tokens, index) {
  let parsedobj = null;
  let expectedtype = null;
  let i;
  for (i = index; i < tokens.length; i++) {
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
      if (expectedtype != null) {
        if (tokens[i].type === expectedtype) {
          expectedtype = null;
          let returnobj = generateUnit(tokens[i], parsedobj);
          parsedobj = returnobj;
        } else {
          let e = new Error("not matched");
          throw e;
        }
      } else {
        let returnobj = generateUnit(tokens[i], parsedobj);
        if (Array.isArray(returnobj)) {
          expectedtype = returnobj[1];
          parsedobj = returnobj[0];
        } else {
          parsedobj = returnobj;

          if (parsedobj.type == "=") {
            let returnobj = generator(tokens, i + 1);
            let nestedobj = returnobj[0];
            let currindex = returnobj[1];
            i = currindex;
            parsedobj.right = nestedobj;
          }
        }
      }
    }
  }
  return [parsedobj, i];
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

    if (token.type == "keyword") {
      let obj = { type: "keyword", value: token.value, body: null };
      return [obj, "identifier"];
    }

    if (token.type == "identifier") {
      if (prev) {
        return { type: "identifier", name: token.value };
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
  return parsedobj[0];
}

exports.parser = parser;
