"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval_zero = void 0;
var alloc_1 = require("../runtime/alloc");
var defs_1 = require("../runtime/defs");
var stack_1 = require("../runtime/stack");
var eval_1 = require("./eval");
function Eval_zero(p1) {
    stack_1.push(_zero(p1));
}
exports.Eval_zero = Eval_zero;
function _zero(p1) {
    var k = Array(defs_1.MAXDIM).fill(0);
    let m = 1;
    let n = 0;
    if (defs_1.iscons(p1)) {
        for (var el of p1.tail()) {
            var i = eval_1.evaluate_integer(el);
            if (i < 1 || isNaN(i)) {
                // if the input is nonsensical just return 0
                return defs_1.Constants.zero;
            }
            m *= i;
            k[n++] = i;
        }
    }
    if (n === 0) {
        return defs_1.Constants.zero;
    }
    p1 = alloc_1.alloc_tensor(m);
    p1.tensor.ndim = n;
    for (let i = 0; i < n; i++) {
        p1.tensor.dim[i] = k[i];
    }
    return p1;
}
