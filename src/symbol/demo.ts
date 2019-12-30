const sym1 = Symbol('key');
const sym2 = Symbol('key');

console.log(sym1 === sym2);
// symbols做对象属性的键
let sym = Symbol();
const objWithSym = {
    [sym]: "value",
    key: "value"
}

console.log(objWithSym[sym]);

const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let cClass = new C();
let className = cClass[getClassNameSymbol](); // "C"
console.log(className);

// Object.keys | for..in | Object.getOwnPropertyNames不会包含symbol类型的key
console.log(Object.keys(objWithSym));
for(let key in objWithSym) {
    console.log(key);
}
console.log(Object.getOwnPropertyNames(objWithSym));

// Symbol.for
let gs1 = Symbol.for('global_symbol');
let gs2 = Symbol.for('global_symbol');
console.log(gs1 === gs2);

// 内置symbols
// -----------------
// Symbol.hasInstance
class SymbolInstanceClass {

}
let symInstance = new SymbolInstanceClass();
console.log('class Symbol.hasInstance', SymbolInstanceClass[Symbol.hasInstance](symInstance));
symInstance = new Object();
console.log('object Symbol.hasInstance', Object[Symbol.hasInstance](symInstance));

// -----------------
// Symbol.isConcatSpreadable 设置concat方法的参数是否展开数组元素
const arrIsConcatSpreadable = [1,2,3,4,5,6];
const isConcatSpreadable = [7,8,9,0];
// 设为true或不设置都是展开
arrIsConcatSpreadable[Symbol.isConcatSpreadable] = true;
const result1 = arrIsConcatSpreadable.concat(isConcatSpreadable);
arrIsConcatSpreadable[Symbol.isConcatSpreadable] = false;
const result2 = arrIsConcatSpreadable.concat(isConcatSpreadable);
console.log('isConcatSpreadable true', JSON.stringify(result1));
console.log('isConcatSpreadable false', JSON.stringify(result2));

var alpha = [1, 2, 3], 
    numeric = [4, 5, 6]; 
numeric[Symbol.isConcatSpreadable] = false;
alpha[Symbol.isConcatSpreadable] = false;
var alphaNumeric = alpha.concat(numeric); 

console.log(JSON.stringify(alphaNumeric));

// -----------------
// Symbol.iterator
// 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。
// Array，Map，Set，String，Int32Array，Uint32Array已经实现各自的Symbol.iterator
const arrIterator = [1,2,3,4];
console.log(arrIterator[Symbol.iterator]);

// -----------------
// Symbol.match
const matchString = '12345';
const matchRegExp = /1(\d+)/;
console.log(matchString.match(matchRegExp));
console.log(matchRegExp[Symbol.match](matchString));
console.log(matchRegExp[Symbol.match]);

// Symbol.match 指定了匹配的是正则表达式而不是字符串。
const regexp1 = /foo/;
regexp1[Symbol.match] = false; // 测设置指定了regexp1不是正则表达式，而是字符串
console.log('/foo/'.startsWith(regexp1));
console.log('/baz/'.endsWith(regexp1));

// -----------------
// Symbol.replace 被String.prototype.replace调用
// String.prototype.replace(searchValue, replaceValue)
// 等同于
// searchValue[Symbol.replace](this, replaceValue)
const replaceSourceString = '123451';
const replaceRegExp = /1/g; // 正则表达式内置Symbol.replace，所以replaceResult1那行可以正常运行
const replaceString = '1';
const replaceResult1 = replaceRegExp[Symbol.replace](replaceSourceString, '');
const replaceResult2 = replaceSourceString.replace(replaceRegExp, '');

String.prototype[Symbol.replace] = function(...args) {
    console.log('args:', args, 'this: ', this);
    if (args[0].indexOf(this) !== -1) {
        const arr = Array.from(args[0]);
        arr.splice(args[0].indexOf(this), this.length, args[1]);
        return arr.join('');
    } else {
        return args[0]
    }
}
// 如果没有上面String.prototype[Symbol.replace]这段代码，
// 下面的代码会报错。不能理解，为什么replace的第一个参数可以用string，这里却报错
const replaceResult3 = replaceString[Symbol.replace](replaceSourceString, '');
console.log(replaceResult1, replaceResult2, replaceResult3);

// 只要有 Symbol.replace 属性，就能够处理replace
const objX = {};
objX[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(objX, 'World') // ["Hello", "World"]

// -----------------
// Symbol.search
const searchRegExp = /34/;
const searchString = '123456';
console.log(searchString.search(searchRegExp));
console.log(searchRegExp[Symbol.search](searchString));

// -----------------
// Symbol.species
// 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性
/*
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

const myArray = new MyArray(1, 2, 3);
const myArrayMap = myArray.map(x => x);
const myArrayFilter = myArray.filter(x => x > 1);

console.log(myArrayMap instanceof MyArray); // true
console.log(myArrayFilter instanceof MyArray); // true
*/
class MyArray extends Array {
    static get [Symbol.species] () {
        return Array;
    }
    constructor(...args) {
        super(...args);
    }
}
const myArray = new MyArray(1, 2, 3);
// map,filter 会衍生出新的对象
const myArrayMap = myArray.map(x => x);
const myArrayFilter = myArray.filter(x => x > 1);
myArray.splice(0, 1);
console.log(myArray instanceof MyArray); // true
console.log(myArrayMap instanceof MyArray); // true
console.log(myArrayFilter instanceof MyArray); // true
console.log(myArray instanceof Array); // true
console.log(myArrayMap instanceof Array); // true
console.log(myArrayFilter instanceof Array); // true

// -----------------
// Symbol.split
const splitRegExp = /2/;
const splitStr = '2';
const splitSourceStr = '12121212121';
console.log(splitSourceStr.split(splitRegExp));
console.log(splitSourceStr.split(splitStr));
console.log(splitRegExp[Symbol.split](splitSourceStr));
String.prototype[Symbol.split] = function(...args) {
    // 具体split未实现
    // let sourceStr = args[0];
    // const _this = this;
    // const result = [];
    // function _split(sourceStr, splitStr) {
    //     if (sourceStr.indexOf(splitStr) !== -1) {
    //         if (sourceStr.indexOf(splitStr) !== sourceStr.lastIndexOf(splitStr)) {
                
    //         } else {

    //         }
    //     } else {
    //         if (result.length) {

    //         }
    //     }
    // }
    console.log(this, args);
}

console.log(splitStr[Symbol.split](splitSourceStr));