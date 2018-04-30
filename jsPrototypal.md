`JS` 的原型链模式总结：

首先，我们先理解以下四点：

- `__proto__`
- `prototype`
- `new` 关键字对于被调用函数内部 `this` 的影响
- `new` 关键字对于 `prototype` 和 `__proto__` 的影响



## `__proto__`

所有的 `JavaScript` 对象都包含一个 `__proto__` 成员，这个成员在老的浏览器中是不可访问的（有时候，有些文档引用会将这个魔幻的属性称之为 `[[prototype]]`）。

`JavaScript` 对象查找其属性时（例如对象：`obj`），会按照如下的规则查找：

- 查找 `obj.property`
- 如果没有找到，就查找：`obj.__proto__.property`
- 如果还没有找到，就查找：`obj.__proto__.__proto__.property`
- 直到 `.__proto__` 属性为 `null`，还没找到的话，`JavaScript` 引擎就会抛出错误

这也是为什么 `JavaScript` 被认为很方便的支持**原型链继承**。

下面是一个例子：

```javascript
var foo = {};

foo.bar = 123;
foo.__proto__.bar = 456;

console.log(foo.bar); // 123
delete foo.bar; // remove from this object

console.log(foo.bar); // 456
delete foo.__proto__.bar // remove from foo.__proto__

console.log(foo.bar); //undefined
```



## `prototype`

所有的 `JavaScript` 函数都有一个属性，它叫做：`prototype`；`prototype` 有一个 `constructor` 成员，这个成员将会指回原 `JavaScript` 函数。

举例如下：

```javascript
function Foo() {}

console.log(Foo.prototype); // i.e: {}, 
console.log(Foo.prototype.constructor === Foo); // 解释上面的第二段话
```



## `new` 关键字对于被调用函数内部 `this` 的影响

一般来说，使用 `new` 来调用的函数内部的 `this` 将会指向由这个函数返回的新创建的对象。

举例如下：

```javascript
function Foo() {
    this.bar = 123;
}

var newFoo = new Foo();
console.log(newFoo.bar);
```



## `new` 关键字对于 `prototype` 和 `__proto__` 的影响

用 `new` 来调用的函数将会把这个函数的 `prototype` 属性赋值如下值：调用这个函数返回的新创建的对象的 `__proto__` 值。

举例如下：

```javascript
function Foo() {}

var foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // true
```



---



`d.prototype.__proto__ = b.prototype` 的重要性：

其重要性就是：允许你在子类上加上成员函数的同时，还能继承来自基类的其他属性或函数。

举例如下：

```javascript
function Animal() {}
Animal.prototype.walk = function () { console.log('walk'); }

function Bird() {}
Bird.prototype.__proto__ = Animal.prototype;
Bird.prototype.fly = function () { console.log('fly'); }

var bird = new Bird();
bird.walk(); // walk
bird.fly(); // fly
```

好我们根据 `JavaScript` 属性的原型链寻找规则来说明为什么是如下这样：

对于 `bird.walk()`：

- 我们首先在 `bird` 这个对象上找有没有 `walk` 函数，结果发现没有；
- 那么我们继续在 `bird.__proto__` 上找，因为在 `new` 调用下的函数 `bird.__proto__` 会等于 `Bird.prototype` ，而 `Bird.prototype` 上有 `walk` 函数，所以调用成功。

对于`bird.fly()`：

- 我们先走上面的两步，发现都找不到。
- 我们继续在 `bird.__proto__.__proto__` 上找，根据如上描述，`bird.__proto__ === Bird.prototype`，那么 `bird.__proto__.__proto__ === Bird.prototype.__proto__ === Animal.prototype` ，而`Animal.prototype` 上又有 `fly` 函数 ，所以调用成功。