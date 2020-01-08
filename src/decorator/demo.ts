// 类装饰器 target 是构造函数，即类本身
function testable(isTestable) {
    return function(target) {
        console.log('target: ', target);
        target.prototype.isTestable = isTestable;
    }
}

@testable(true)
class MyTestableClass1 {}
const class1 = new MyTestableClass1();
console.log('MyTestableClass1:', MyTestableClass1);
console.log(class1.isTestable); // true

@testable(false)
class MyTestableClass2 {}
const class2 = new MyTestableClass2();
console.log('MyTestableClass2:', MyTestableClass2);
console.log(class2.isTestable); // false


function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    }
}

const Foo = {
    foo() {console.log('foo');}
};

@mixins(Foo)
class MyClass {}

const myClass = new MyClass();
myClass.foo();

// 方法装饰器
function readonly(target, name, descriptor){
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    console.log('target:', target)
    console.log(name, descriptor);
    descriptor.writable = false;
    return descriptor;
}

class Person {
    @readonly
    name() { return `${this.first} ${this.last}` }
}
console.log('Person.prototype', Person.prototype);

Object.defineProperty(Person.prototype, 'name', {writable: false});

// log方法装饰器
class MyMath {
    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}

const math = new MyMath();

// passed parameters should get logged now
math.add(2, 4);

// 如何要在函数上实现类似装饰器功能
function doSomething(name) {
    console.log('name: ', name);
}

function funcDecorator(func) {
    return function(...args) {
        console.log('start');
        const res = func.apply(this, args);
        console.log('end');
        return res;
    }
}

const decoratedFn = funcDecorator(doSomething);
decoratedFn('liz');

// 第三方装饰器模块 core-decorators.js   https://github.com/jayphelps/core-decorators

