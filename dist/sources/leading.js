"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_leading = void 0;
let defs_1 = require("../runtime/defs");
let stack_1 = require("../runtime/stack");
let degree_1 = require("./degree");
let eval_1 = require("./eval");
let filter_1 = require("./filter");
let guess_1 = require("./guess");
let multiply_1 = require("./multiply");
let power_1 = require("./power");
/*
 Return the leading coefficient of a polynomial.

Example

  leading(5x^2+x+1,x)

Result

  5

The result is undefined if P is not a polynomial.
*/
function Eval_leading(p1) {
    let P = eval_1.Eval(defs_1.cadr(p1));
    p1 = eval_1.Eval(defs_1.caddr(p1));
    let X = p1 === defs_1.symbol(defs_1.NIL) ? guess_1.guess(P) : p1;
    stack_1.push(leading(P, X));
}
exports.Eval_leading = Eval_leading;
function leading(P, X) {
    // N = degree of P
    let N = degree_1.degree(P, X);
    // divide through by X ^ N, remove terms that depend on X
    return filter_1.filter(multiply_1.divide(P, power_1.power(X, N)), X);
}
