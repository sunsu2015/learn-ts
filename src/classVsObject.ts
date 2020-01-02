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
    prop: 1,
    get() {
        return this.prop;
    },
    set(val) {
        this.prop = val;
    }
}
const myObj = Object.create(myPrototype);
// myObj的原型是myPrototype
console.log(Object.getPrototypeOf(myObj) === myPrototype);

myObj.set(2);
console.log(myObj.prop);
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

console.log(myObj.prop);
myObj.set(3);
console.log(myObj.prop);
console.log(Object.getPrototypeOf(myObj).prop);
console.log(myObj.__proto__.prop);
console.log(myPrototype.isPrototypeOf(myObj))





/**
 * 3、ES6 class
 * */ 
var __obj= {};
console.log(__obj.constructor);
console.log(Object.getPrototypeOf(__obj).constructor === __obj.constructor);


class T {
    private _prop: string;
    get prop() {
        console.log('getter');
        return this._prop;
    }
    set prop(val: string) {
        console.log('setter');
        this._prop = val;
    }
    constructor() {

    }
    func() {
        console.log('func');
    }
}

const t = new T();

console.log(T.prototype === Object.getPrototypeOf(t));
console.log(T.prototype.isPrototypeOf(t));




console.log(T.prototype.constructor === T);
