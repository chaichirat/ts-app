//   injection funtion
const calculatePromotion = (
  price: number,
  weight: number,
  promotion: (price: number, weight: number) => number
) => {
  return price + promotion(price, weight);
};

const taxPromotion = (price: number) => {
  return (price * 7) / 100;
};

// const weightPromotion = (weight: number) => {
//   if (weight >= 50) {
//     return (weight * 10) / 100;
//   } else {
//     return 0;
//   }
// };

const isPromotion = calculatePromotion(100, 60, taxPromotion);

console.log(isPromotion);

const calculateSth = (
  call: (price: number) => number,
  sum: (word: string) => string
): ((price: number, word: string) => number | string) => {
  return (priceParam: number, wordParam: string) => {
    if (priceParam < 0) {
      return call(priceParam);
    }

    return sum(wordParam);
  };
};

const result = calculateSth(
  (price: number) => {
    return price * 2;
  },
  (word: string) => {
    return word;
  }
)(100, "Hello world");

console.log(result);
// =============================

const createMathHandler = (
  onEven: (num: number) => number,
  onOdd: (num: number) => number
): ((num: number) => number) => {
  return (numParam: number) => {
    if (numParam % 2 === 0) {
      return onEven(numParam);
    }

    return onOdd(numParam);
  };
};

const result2 = createMathHandler(
  (num: number) => {
    return num * 10;
  },
  (num: number) => {
    return num + 5;
  }
)(5);

console.log(result2);
// ============================

const createMultiplierHandler = (
  multiplier: number
): ((num: number) => number) => {
  return (numParam: number) => {
    return numParam * multiplier;
  };
};

const times5 = createMultiplierHandler(5)(4);
console.log(times5);
// ================================

const selectHandlerBySign = (
  onPositive: (num: number) => number,
  onNegative: (num: number) => number,
  onZero: () => number
): ((num: number) => number) => {
  return (numParam: number) => {
    if (numParam > 0) {
      return onPositive(numParam);
    } else if (numParam < 0) {
      return onNegative(numParam);
    }

    return onZero();
  };
};

const handler = selectHandlerBySign(
  (num: number) => {
    return num * 2;
  },
  (num: number) => {
    return num - 5;
  },
  () => {
    return 999;
  }
)(5);

console.log(handler);
// =========================

const composeFunctions = (
  f1: (num: number) => number,
  f2: (num: number) => number
): ((num: number) => void) => {
  return (numParam: number) => {
    return f2(f1(numParam));
  };
};

const composed = composeFunctions(
  (num: number) => {
    return num + 2;
  },
  (num: number) => {
    return num * 3;
  }
)(4);

console.log(composed);
// ==============================

const conditionalOperator = (
  condition: (num: number) => boolean,
  onTrue: (num: number) => number,
  onFalse: (num: number) => number
): ((num: number) => number) => {
  return (numParam) => {
    if (condition(numParam)) {
      return onTrue(numParam);
    }

    return onFalse(numParam);
  };
};

const op = conditionalOperator(
  (num: number) => {
    return num % 3 === 0;
  },
  (num: number) => {
    return num * 100;
  },
  (num: number) => {
    return num - 1;
  }
);

console.log(op(5));
// ===========================

const repeatHandler = (
  fn: (num: number) => number,
  repeatCount: number
): ((num: number) => number) => {
  return (numParam: number) => {
    let result = numParam;
    for (let i = 0; i < repeatCount; i++) {
      result = fn(result);
    }
    return result;
  };
};

const double = (num: number) => {
  return num * 2;
};
const repeatTwice = repeatHandler(double, 2)(3);

console.log(repeatTwice);
// ==============================

const filterEven = (numbers: number[], callback: (num: number) => void) => {
  for (const n of numbers) {
    if (n % 2 === 0) {
      callback(n);
    }
  }
};

filterEven([1, 2, 3, 4], (num: number) => console.log(num));
// ===============================

const createAdder = (base: number): ((num: number) => number) => {
  return (numParam: number) => {
    return base + numParam;
  };
};

const add10 = createAdder(10)(5);

console.log(add10);
// =================================

const applySequence = (
  functions: ((n: number) => number)[]
): ((num: number) => number) => {
  return (numParam: number) => {
    let result = numParam;
    for (const func of functions) {
      result = func(result);
    }

    return result;
  };
};

const seq = applySequence([
  (n: number) => {
    return n + 2;
  },
  (n: number) => {
    return n * 3;
  },
  (n: number) => {
    return n - 1;
  },
])(4);

console.log(seq);
//   ==============================
