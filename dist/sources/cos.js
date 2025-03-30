"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosine = exports.Eval_cos = void 0;
var defs_1 = require("../runtime/defs");
var stack_1 = require("../runtime/stack");
var add_1 = require("./add");
var bignum_1 = require("./bignum");
var eval_1 = require("./eval");
var is_1 = require("./is");
var list_1 = require("./list");
var multiply_1 = require("./multiply");
var power_1 = require("./power");
var sin_1 = require("./sin");
/* cos =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------
Returns the cosine of x.

*/
function Eval_cos(p1) {
    var result = cosine(eval_1.Eval(defs_1.cadr(p1)));
    stack_1.push(result);
}
exports.Eval_cos = Eval_cos;
function cosine(p1) {
    if (defs_1.isadd(p1)) {
        return cosine_of_angle_sum(p1);
    }
    return cosine_of_angle(p1);
}
exports.cosine = cosine;
// Use angle sum formula for special angles.
function cosine_of_angle_sum(p1) {
    if (defs_1.iscons(p1)) {
        for (var B of p1.tail()) {
            if (is_1.isnpi(B)) {
                var A = add_1.subtract(p1, B);
                return add_1.subtract(multiply_1.multiply(cosine(A), cosine(B)), multiply_1.multiply(sin_1.sine(A), sin_1.sine(B)));
            }
        }
    }
    return cosine_of_angle(p1);
}
function cosine_of_angle(p1) {
    if (defs_1.car(p1) === defs_1.symbol(defs_1.ARCCOS)) {
        return defs_1.cadr(p1);
    }
    if (defs_1.isdouble(p1)) {
        let d = Math.cos(p1.d);
        if (Math.abs(d) < 1e-10) {
            d = 0.0;
        }
        return bignum_1.double(d);
    }
    // cosine function is symmetric, cos(-x) = cos(x)
    if (is_1.isnegative(p1)) {
        p1 = multiply_1.negate(p1);
    }
    // cos(arctan(x)) = 1 / sqrt(1 + x^2)
    // see p. 173 of the CRC Handbook of Mathematical Sciences
    if (defs_1.car(p1) === defs_1.symbol(defs_1.ARCTAN)) {
        var base = add_1.add(defs_1.Constants.one, power_1.power(defs_1.cadr(p1), bignum_1.integer(2)));
        return power_1.power(base, bignum_1.rational(-1, 2));
    }
    // multiply by 180/pi to go from radians to degrees.
    // we go from radians to degrees because it's much
    // easier to calculate symbolic results of most (not all) "classic"
    // angles (e.g. 30,45,60...) if we calculate the degrees
    // and the we do a switch on that.
    // Alternatively, we could look at the fraction of pi
    // (e.g. 60 degrees is 1/3 pi) but that's more
    // convoluted as we'd need to look at both numerator and
    // denominator.
    var n = bignum_1.nativeInt(multiply_1.divide(multiply_1.multiply(p1, bignum_1.integer(180)), defs_1.Constants.Pi()));
    // most "good" (i.e. compact) trigonometric results
    // happen for a round number of degrees. There are some exceptions
    // though, e.g. 22.5 degrees, which we don't capture here.
    if (n < 0 || isNaN(n)) {
        return list_1.makeList(defs_1.symbol(defs_1.COS), p1);
    }
    switch (n % 360) {
        case 90:
        case 270:
            return defs_1.Constants.zero;
        case 60:
        case 300:
            return bignum_1.rational(1, 2);
        case 120:
        case 240:
            return bignum_1.rational(-1, 2);
        case 45:
        case 315:
            return multiply_1.multiply(bignum_1.rational(1, 2), power_1.power(bignum_1.integer(2), bignum_1.rational(1, 2)));
        case 135:
        case 225:
            return multiply_1.multiply(bignum_1.rational(-1, 2), power_1.power(bignum_1.integer(2), bignum_1.rational(1, 2)));
        case 30:
        case 330:
            return multiply_1.multiply(bignum_1.rational(1, 2), power_1.power(bignum_1.integer(3), bignum_1.rational(1, 2)));
        case 150:
        case 210:
            return multiply_1.multiply(bignum_1.rational(-1, 2), power_1.power(bignum_1.integer(3), bignum_1.rational(1, 2)));
        case 0:
            return defs_1.Constants.one;
        case 180:
            return defs_1.Constants.negOne;
        default:
            return list_1.makeList(defs_1.symbol(defs_1.COS), p1);
    }
}
