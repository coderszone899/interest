"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_tanh = void 0;
var defs_1 = require("../runtime/defs");
var stack_1 = require("../runtime/stack");
var bignum_1 = require("./bignum");
var eval_1 = require("./eval");
var is_1 = require("./is");
var list_1 = require("./list");
//             exp(2 x) - 1
//  tanh(x) = --------------
//             exp(2 x) + 1
function Eval_tanh(p1) {
    var result = tanh(eval_1.Eval(defs_1.cadr(p1)));
    stack_1.push(result);
}
exports.Eval_tanh = Eval_tanh;
function tanh(p1) {
    if (defs_1.car(p1) === defs_1.symbol(defs_1.ARCTANH)) {
        return defs_1.cadr(p1);
    }
    if (defs_1.isdouble(p1)) {
        let d = Math.tanh(p1.d);
        if (Math.abs(d) < 1e-10) {
            d = 0.0;
        }
        return bignum_1.double(d);
    }
    if (is_1.isZeroAtomOrTensor(p1)) {
        return defs_1.Constants.zero;
    }
    return list_1.makeList(defs_1.symbol(defs_1.TANH), p1);
}
