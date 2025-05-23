import {
  ARCCOSH,
  cadr,
  car,
  Constants,
  COSH,
  isdouble,
  U
} from '../runtime/defs';
import { stop } from '../runtime/run';
import { symbol } from "../runtime/symbol";
import { double } from './bignum';
import { Eval } from './eval';
import { isplusone } from './is';
import { makeList } from './list';

/* arccosh =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------
Returns the inverse hyperbolic cosine of x.

*/
export function Eval_arccosh(x: U) {
  return arccosh(Eval(cadr(x)));
}

function arccosh(x: U): U {
  if (car(x) === symbol(COSH)) {
    return cadr(x);
  }

  if (isdouble(x)) {
    const { d } = x;
    if (d < 1.0) {
      stop('arccosh function argument is less than 1.0');
    }
    d = Math.log(d + Math.sqrt(d * d - 1.0));
    return double(d);
  }

  if (isplusone(x)) {
    return Constants.zero;
  }

  return makeList(symbol(ARCCOSH), x);
}
