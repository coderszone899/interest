import {
  ARCSINH,
  cadr,
  car,
  Constants,
  isdouble,
  SINH,
  U
} from '../runtime/defs';
import { symbol } from "../runtime/symbol";
import { double } from './bignum';
import { Eval } from './eval';
import { isZeroAtomOrTensor } from './is';
import { makeList } from './list';

/* arcsinh =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------
Returns the inverse hyperbolic sine of x.

*/
export function Eval_arcsinh(x: U) {
    return arcsinh(Eval(cadr(x)));
}

function arcsinh(x: U): U {
  if (car(x) === symbol(SINH)) {
    return cadr(x);
  }

  if (isdouble(x)) {
    const { d } = x;
    d = Math.log(d + Math.sqrt(d * d + 1.0));
    return double(d);
  }

  if (isZeroAtomOrTensor(x)) {
    return Constants.zero;
  }

  return makeList(symbol(ARCSINH), x);
}
