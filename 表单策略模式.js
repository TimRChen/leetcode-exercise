/**
 * 策略对象
 */
const strategies = {
  isNonEmpty(value, errorMsg) {
      return value === '' ? errorMsg : undefined;
  },
  maxLength(value, length, errorMsg) {
      const len = parseInt(length, 10);
      return value.length >= len ? errorMsg : undefined;
  },
  isMoblie(value, errorMsg) {
      return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errorMsg : undefined;
  },
  isEmail(value, errorMsg) {
      return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ? errorMsg : undefined;
  },
};

/**
* 表单校验器
* 设计模式 - 策略模式
*/
export default class Validator {
  constructor() {
      this.cache = []; // 保存校验规则
  }

  add(value, rules) {
      if (rules instanceof Array && rules.length > 0) {
          this.cache = rules.map((rule) => {
              const strategyAry = rule.strategy.split(':'); // eg. ['maxLength','6']
              const { errorMsg } = rule; // eg. '用户名不能为空'
              return () => {
                  const strategy = strategyAry.shift(); // 用户挑选的strategy
                  strategyAry.unshift(value); // 把value添加进参数列表
                  strategyAry.push(errorMsg); // 把errorMsg添加进参数列表，eg. [value,'6',errorMsg]
                  return strategies[strategy].apply(this, strategyAry);
              };
          });
      } else {
          throw TypeError('rules is not Array');
      }
  }

  start() {
      return new Promise((resolve) => {
          for (const validatorFunc of this.cache) {
              const errorMsg = validatorFunc(); // 开始校验，并取得校验后的返回信息
              if (errorMsg) {
                  // 如果有确切返回值，说明校验没有通过
                  resolve(errorMsg);
              }
          }
      });
  }
}


// 使用方法举例：
// const validator = new Validator();
// // 新建校验策略方案
// validator.add(this.phone, [
//     {
//         strategy: 'isNonEmpty',
//         errorMsg: '手机号码不能为空！',
//     },
//     {
//         strategy: 'isMoblie',
//         errorMsg: '手机号码格式不正确！',
//     },
// ]);
// const errorMsg = await validator.start();
// alert(errorMsg)
