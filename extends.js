var __extends = (this && this.__extends) || (function () {
  // 
  var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (a, b) { d.__proto__ = b; }) ||
    function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) {
          d[p] = b[p];
        }
      }
    };
  
  return function (d, b) {
    extendStatics(d, b);

    // 之后设置原型，然后改变 constructor 的指向，JS 原型链
    function __() { this.constructor = d; }

    // 设置 d 的原型，JS 的继承策略
    d.prototype = (b === null) ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
});