// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    /** 官网例子错误 */
    for (let id in second) {
        console.log('====', id);
        if (!Object.prototype.hasOwnProperty.call(result, id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ..
        console.log('log');
    }
}
const consoleLogger = new ConsoleLogger();
Object.defineProperties(consoleLogger, {log: {enumerable: true, value: ConsoleLogger.prototype.log}});
consoleLogger.log();
var jim = extend(new Person("Jim"), consoleLogger);
var n = jim.name;
console.log('jim.log()'), jim.log();


// 联合类型
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft(value: string, padding: number | string) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
}
padLeft("Hello world", 4);
// padLeft("Hello world", true);

interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    return {
        fly: () => {console.log('fly');},
        layEggs: () => {console.log('layEggs');}
    }
}
let pet = getSmallPet();
    pet.layEggs(); // okay
    // pet.swim();    // errors

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

if(isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

// 可为null的类型, strictNullChecks设置为true，可以避免null的赋值问题
// let s = 'foo';
// s = null;   // 不能将类型“null”分配给类型“string”。ts(2322)

let s: string | null = 'foo';
s = null;


// 使用类型断言手动去除null或 undefined
function broken(name: string | null): string {
    function postfix(epithet: string) {
        //   return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
        return name!.charAt(0) + '.  the ' + epithet;
    }
    name = name || 'Bob';
    return postfix("great");
}

console.log(broken(null));

// 类型别名
type MyFunc = () => string;
// 泛型
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;

// 字符串字面量类型
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
let esaing: Easing = 'ease-in';
// easing = '';

// 数字字面量类型
type MyNum = 1 | 2 | 3 | 4 | 5;
let myNum: MyNum = 1;
// myNum = 6;

// 索引类型
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }
  
  interface Person {
      name: string;
      age: number;
  }
  type Person1<T, K extends keyof T> = {
      [P in K]: T[P]
  }
  let person: Person1<{name: string, age: number}, keyof {name: string, age: number}> = {
      name: 'Jarid',
      age: 35
  };
let pluckRes: (Person[keyof Person]) [] = pluck(person, ['name', 'age']); // ok, string[]
console.log(pluckRes);

type Key = keyof Person;

interface MyMap<T> {
    [key: string]: T;
}
let keys: keyof MyMap<number>; // string
let value: MyMap<number>['foo']; // number

const myMap: MyMap<number> = {
    age: 12,
    money: 10000
}

let keyAge: keyof MyMap<number> = 'age';
let valueAge: MyMap<number>['age'] = 12;

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
}
type MyPartial<T> = {
    [P in keyof T]?: T[P];
}

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };