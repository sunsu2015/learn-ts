interface MyConstructor {
    // 构造函数类型
    new (): {foo: ()=> void};
}

// 能匹配{new (): {foo: ()=> void}}，说明 class extends superclass 返回的是类类型
let MyMixin = (superclass): {new (): {foo: ()=> void}} => class extends superclass {
    foo() {
        console.log('foo from MyMixin');
    }
};

class MyBaseClass {

}


const MyClass1: MyConstructor = MyMixin(MyBaseClass);
console.log(MyClass1);

const myClass1 = new MyClass1();

myClass1.foo()