const Lexer = require("../lexer/lexer");
const Parser = require("../parser/parser");
const evaluator = require("../evaluate/evaluate");
// let input = "1 + 1 + 3";
// let input = " 1 + (3+4) ";
// let input = " 1 + (4 +  4 ) + 5";
let input = "let x = 1";
let input = " x == 1 ";
let input = `
    if ( true ){
        x = 1
    }
`;

let tokens = Lexer.lex(input);

let parsed = Parser.parser(tokens);

console.log(parsed);

let value = evaluator.evaluate(parsed);

console.log(value);
