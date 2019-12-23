class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
console.log(greeter.greet());

abstract class ABClass {
    private _name: string;
    get name(): string {
        console.log('get');
        return this._name;
    }
    set name(value: string) {
        console.log('set');
        this._name = value;
    }
    abstract sing(): void;
    constructor(name: string) {
        this._name = name;
    }
}
// 抽象类不能被实例化
// const ab = new ABClass('张三');

class ABCClass extends ABClass {
    constructor(name: string) {
        super(name);
    }
    sing() {
        console.log(this.name, ' is singing');
    }
}
const abc = new ABCClass('张三');
console.log(abc.name);
abc.name = '李四';
abc.sing();
// 然后我们使用 typeof ABCClass，意思是取ABCClass类的类型，而不是实例的类型。
// 或者更确切的说，"告诉我 ABCClass标识符的类型"，也就是【构造函数的类型】。 这个类型包含了类的所有静态成员和构造函数。

console.log(typeof ABCClass);