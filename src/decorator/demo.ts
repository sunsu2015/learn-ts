function testable(isTestable) {
return function(target) {
    target.prototype.isTestable = isTestable;
}
}

@testable(true)
class MyTestableClass1 {}
const class1 = new MyTestableClass1();
console.log(class1.isTestable); // true

@testable(false)
class MyTestableClass2 {}
const class2 = new MyTestableClass2();
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