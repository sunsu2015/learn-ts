// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    /** 官网例子错误 */
    // for (let id in second) {
    //     console.log('====', id);
    //     // if (!result.hasOwnProperty(id)) {
            
    //     // }
    // }
    const keys = Object.getOwnPropertyNames(second);
    console.log(keys);
    for(let i=0;i<keys.length;i++) {
        console.log('second.log', second[keys[i]])
        result[keys[i]] = second[keys[i]]
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
Object.defineProperties(consoleLogger, {log: {enumerable: true}});
console.log(consoleLogger.log());
// var jim = extend(new Person("Jim"), consoleLogger);
// var n = jim.name;
// jim.log();


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

// 可为null的类型, strictNullChecks设置为true，可以避免null的复制问题
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