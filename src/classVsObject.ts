/**
 * 通过查看编译后的文件，可以看出ES6 class中的getter和setter 
 * 其实就是defineProperty里的get和set方法 
 * */ 

/**
 * 创建对象的方法
 * */ 

/**
 * 1、定义构造函数，使用new创建对象
*/

function Class1() {
    this.prop = 1;
}
const class1Obj = new Class1();

// 构造函数有原型，确切的说是每个函数都有原型
// 对象都有原型指针，指向构造函数的原型
console.log('##Class1.prototype === class1Obj.__proto__##', Class1.prototype === class1Obj.__proto__);
console.log('##Object.getPrototypeOf(class1Obj) === class1Obj.__proto__##', Object.getPrototypeOf(class1Obj) === class1Obj.__proto__);
// 每个对象都有constructor属性，是指针，指向构造函数
console.log('##class1Obj.constructor === Class1##', class1Obj.constructor === Class1);
// 构造函数的原型是一个对象
console.log('##Class1.prototype##', Class1.prototype);
// 构造函数的原型的constructor属性，指向的也是构造函数，无限循环 通过控制台也可以看出这种特点
console.log('##Class1.prototype.constructor === Class1##', Class1.prototype.constructor === Class1);
// 构造函数的原型的原型指针
console.log('##Class1.prototype.__proto__##', Class1.prototype.__proto__);
// 构造函数的原型的 原型指针 等于 实例的原型指针的原型指针
console.log('##Class1.prototype.__proto__ === class1Obj.__proto__.__proto__##', Class1.prototype.__proto__ === class1Obj.__proto__.__proto__);
// 构造函数的原型的 构造函数的原型 的原型指针
console.log('##Class1.prototype.__proto__.__proto__##', Class1.prototype.__proto__.__proto__);
// 原型链就是原型指针形成的链表，一直到为null时结束

console.log('----------------------------------');
/**
 * 2、Object.create(prototype)
 * */ 
const myPrototype = {
    prop: 1
}
const myObj = Object.create(myPrototype);
// myObj的原型是myPrototype
console.log('##Object.getPrototypeOf(myObj) === myPrototype##', Object.getPrototypeOf(myObj) === myPrototype);
console.log('##myObj.__proto__ === myPrototype##', myObj.__proto__ === myPrototype);
console.log('myPrototype.isPrototypeOf(myObj)', myPrototype.isPrototypeOf(myObj));
console.log('myObj.prop 当前值为 ', myObj.prop);
console.log('此时取的prop是原型中的prop ');
console.log('Object.getOwnPropertyNames(myObj) ', Object.getOwnPropertyNames(myObj));
console.log('Object.getOwnPropertyNames(myPrototype) ', Object.getOwnPropertyNames(myPrototype));
console.log('Object.getOwnPropertyDescriptors(myPrototype) ', Object.getOwnPropertyDescriptors(myPrototype));
console.log('myObj.prop = 2'), myObj.prop = 2;
console.log('此时设置的是myObj的prop ');
console.log('Object.getOwnPropertyNames(myObj) ', Object.getOwnPropertyNames(myObj));
console.log('Object.entries(myObj) ', Object.entries(myObj)); // [['prop', 2]]
console.log(`Object.defineProperty(myObj, 'prop', ...) `, Object.entries(myObj));
Object.defineProperty(myObj, 'prop', {
    get: () => {
        console.log('prop get invoke');
        return this.value;
    },
    set: (val) => {
        console.log('prop set invoke');
        this.value = val;
    }
});
console.log('myObj.prop = 3'), myObj.prop = 3;
console.log('myObj.prop值为 ', myObj.prop);

// const entries = new Map([
//     ['foo', 'bar'],
//     ['baz', 42]
// ]);
// console.log('Object.fromEntries(entries)', Object.fromEntries(entries));
console.log('----------------------------------');
/**
 * 3、ES6 class
 * */ 

class T {
    private value: string;
    get prop() {
        console.log('getter');
        return this.value;
    }
    set prop(val: string) {
        console.log('setter');
        this.value = val;
    }
    constructor() {

    }
    func() {
        console.log('func');
    }
}

const t = new T();

console.log('##T.prototype === Object.getPrototypeOf(t)##', T.prototype === Object.getPrototypeOf(t));
console.log('##T.prototype.isPrototypeOf(t)##', T.prototype.isPrototypeOf(t));
console.log('##T.prototype.constructor === T##', T.prototype.constructor === T);
console.log('##t.constructor === T##', t.constructor === T);
console.log('##Object.getOwnPropertyNames(T.prototype)##', Object.getOwnPropertyNames(T.prototype));
console.log('##Object.getOwnPropertyNames(t)##', Object.getOwnPropertyNames(t));
console.log('t.prop = ', t.prop = '1');
console.log('##Object.getOwnPropertyNames(T.prototype)##', Object.getOwnPropertyNames(T.prototype));
console.log('##Object.getOwnPropertyNames(t)##', Object.getOwnPropertyNames(t));
console.log('t.value = ', t.value);
console.log('T.prototype.prop = ', T.prototype.prop);