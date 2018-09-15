let lex = function(input) {
  let tokens = [];

  let isOperator = function(c) {
    return /[+\-*\/\^%=,]/.test(c);
  };
  let isBracket = function(c) {
    return /[()]/.test(c);
  };

  let isDigit = function(c) {
    return /[0-9]/.test(c);
  };
  let isWhiteSpace = function(c) {
    return /\s/.test(c);
  };
  let isIdentifier = function(c) {
    return (
      typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c)
    );
  };

  let c;
  let i = 0;
  let advance = function() {
    c = input[++i];
    return c;
  };
  let addToken = function(type, value) {
    tokens.push({
      type: type,
      value: value,
    });
  };
  while (i < input.length) {
    c = input[i];

    if (isWhiteSpace(c)) advance();
    else if (isOperator(c)) {
      addToken("operator", c);
      advance();
    } else if (isBracket(c)) {
      addToken("bracket", c);
      advance();
    } else if (isDigit(c)) {
      let num = c;
      while (isDigit(advance())) num += c;
      if (!isFinite(num))
        throw "Number is too large or too small for a 64-bit double.";
      addToken("number", num);
    } else if (isIdentifier(c)) {
      let idn = c;
      while (isIdentifier(advance())) idn += c;
      addToken("identifier", idn);
    } else throw "Unrecognized token.";
  }

  addToken("(end)");
  return tokens;
};

exports.lex = lex;
