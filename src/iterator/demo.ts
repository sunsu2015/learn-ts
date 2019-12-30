// 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。
// Array，Map，Set，String，Int32Array，Uint32Array已经实现各自的Symbol.iterator
const arr = [1,2,3,4];
console.log(arr[Symbol.iterator]);

// for...of
for(let entry of arr) {
    console.log(entry);
}

// for...in
for(let key in arr) {
    console.log(key);
}

// for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。


// Object没有实现Symbol.iterator属性，所以无法使用以上的for...of for...in
Object.prototype[Symbol.iterator] = function * (...args) {
    const keys = Object.keys(this);
    for(let i=0; i<keys.length; i++) {
        yield this[keys[i]];
    }
}

const iteratorObject: any = new Object();
iteratorObject.a = 1;
iteratorObject.c = 3;
iteratorObject.d = 2;
for(let value of iteratorObject) {
    console.log('+++', value);
}
console.log(...iteratorObject)