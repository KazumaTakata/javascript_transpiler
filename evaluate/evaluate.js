let evaluate = function(parsedtree) {
  let value = evaluatevalue(parsedtree);

  return value;
};

let isDigit = function(c) {
  return /[0-9]/.test(c);
};

function evaluatevalue(parsedtree) {
  if (parsedtree.type == "+") {
    let left;
    let right;
    if (isDigit(parsedtree.left.value)) {
      left = Number(parsedtree.left.value);
    } else {
      left = evaluatevalue(parsedtree.left);
    }
    if (isDigit(parsedtree.right.value)) {
      right = Number(parsedtree.right.value);
    } else {
      right = evaluatevalue(parsedtree.right);
    }

    let value = operators("+", left, right);
    return value;
  } else if (parsedtree.type == "number") {
    return Number(parsedtree.value);
  }
}

function operators(type, left, right) {
  if (type == "+") {
    return left + right;
  }
}

exports.evaluate = evaluate;
