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

// 访问器装饰器
// 传入下列3个参数：
// 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 2.成员的名字。
// 3.成员的属性描述符。

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target, descriptor);
        console.log(propertyKey);
        descriptor.configurable = value;
        console.log(descriptor);
        // return descriptor;
    };
}

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

const point = new Point(1,2);
console.log(point.x);
console.log(point.y);

let config = Object.getOwnPropertyDescriptor(point, '_y');
console.log(config);
// 为什么没变成false
console.log('111',point.__proto__);
Object.defineProperty(point, '_y', {configurable: false});
config = Object.getOwnPropertyDescriptor(point, '_y');
console.log(config);



// 属性装饰器
// 两个参数，1、对于静态成员是构造函数，对于实例成员是类的原型对象
// 2、成员名字

function DefaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}

class Hello {
    @DefaultValue("hello world") greeting: string;
}

console.log(new Hello().greeting);// 输出: hello world

// 参数装饰器
// 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
// 1.对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 2.成员的名字。
// 3.参数在函数参数列表中的索引。


import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}

const greeterEntity = new Greeter('hhh');
console.log(greeterEntity.greet('1'));