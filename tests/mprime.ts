import { primetab } from '../runtime/defs';
import { mint } from '../sources/bignum';
import { mprime } from '../sources/mprime';
import { test } from '../test-harness';

var i = 0;
var k = 0;
const m = 0;
var t = 0;
k = 0;
for (i = 0; i < 10000; i++) {
  const n = mint(i);
  var expectPrime = i === primetab[k];
  if (expectPrime) {
    k++;
  }
  test(`mprime(${i}) = ${expectPrime}`, t => t.is(expectPrime, mprime(n)));
}

//endif
