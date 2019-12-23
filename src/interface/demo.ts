interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

function createClock(clock: ClockConstructor, h: number, m: number): ClockInterface {
    return new clock(h, m);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log('digital');
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log('analog');
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

digital.tick();
analog.tick();

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void
}

function getCounter(): Counter {
    const counter = function(start: number): string {return 'counter'} as Counter;
    counter.interval = 0;
    counter.reset = function() {console.log('reset');};
    return counter;
}

const counter = getCounter();
console.log(counter(1));
console.log(counter.interval);
console.log(counter.reset());

// 接口继承了类，且类中有私有属性，那么只有子类能实现接口
class Base {
    public state: string = '';
    private status: any;
}

interface BaseInterface extends Base {
    select(): string;
}

class FailClass implements BaseInterface {
    public state: any;
    private status: any;
    select() {
        return 'select';
    }
}

class SuccessClass extends Base implements BaseInterface {
    public state: any;
    select() {
        return 'select';
    }
}