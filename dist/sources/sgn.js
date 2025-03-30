"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sgn = exports.Eval_sgn = void 0;
let defs_1 = require("../runtime/defs");
let stack_1 = require("../runtime/stack");
let abs_1 = require("./abs");
let eval_1 = require("./eval");
let is_1 = require("./is");
let list_1 = require("./list");
let mmul_1 = require("./mmul");
let multiply_1 = require("./multiply");
let power_1 = require("./power");
//-----------------------------------------------------------------------------
//
//  Author : philippe.billet@noos.fr
//
//  sgn sign function
//
//
//-----------------------------------------------------------------------------
function Eval_sgn(p1) {
    let result = sgn(eval_1.Eval(defs_1.cadr(p1)));
    stack_1.push(result);
}
exports.Eval_sgn = Eval_sgn;
function sgn(X) {
    if (defs_1.isdouble(X)) {
        if (X.d > 0) {
            return defs_1.Constants.one;
        }
        if (X.d === 0) {
            return defs_1.Constants.one;
        }
        return defs_1.Constants.negOne;
    }
    if (defs_1.isrational(X)) {
        if (defs_1.MSIGN(mmul_1.mmul(X.q.a, X.q.b)) === -1) {
            return defs_1.Constants.negOne;
        }
        if (defs_1.MZERO(mmul_1.mmul(X.q.a, X.q.b))) {
            return defs_1.Constants.zero;
        }
        return defs_1.Constants.one;
    }
    if (is_1.iscomplexnumber(X)) {
        return multiply_1.multiply(power_1.power(defs_1.Constants.negOne, abs_1.absval(X)), X);
    }
    if (is_1.isnegativeterm(X)) {
        return multiply_1.multiply(list_1.makeList(defs_1.symbol(defs_1.SGN), multiply_1.negate(X)), defs_1.Constants.negOne);
    }
    return list_1.makeList(defs_1.symbol(defs_1.SGN), X);
}
exports.sgn = sgn;
