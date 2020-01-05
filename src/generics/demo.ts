function identity<T> (arg: T) : T {
    return arg;
}

function loggingIdentity<T> (arg: Array<T>) : Array<T> {
    console.log(arg.length);
    return arg;
}
// 泛型接口
interface MyIdentity<T> {(arg: T): T};

let myIdentity: MyIdentity<number>;
myIdentity = identity;

myIdentity(1);
identity('1');
// 报错
// myIdentity('1');

// 泛型类
class GenericsClass<T> {
    public defaultValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericsClass<number>();
myGenericNumber.defaultValue = 0;
myGenericNumber.add = (x: number, y: number): number => {return x+y;}


// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity1<T extends Lengthwise> (arg: T) : T {
    console.log(arg.length);
    return arg;
}
// 参数没有length属性，报错
// loggingIdentity1(3);
loggingIdentity1('string');

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T> (obj: T, key: K) {
    return obj[key];
}

let obj = { a: 1, b: 2, c: 3, d: 4 };
getProperty(obj, "a");
// 'm'不在obj的key中，报错
// getProperty(obj, "m");


// 在泛型里使用类类型 
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T> (constructor: {new(): T;}): T {
    return new constructor();
}

class BeeKeeper {
    hasMask: boolean = false;
}

class ZooKeeper {
    nametag: string = 'zoo';
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
