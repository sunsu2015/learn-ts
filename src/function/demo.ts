// 完全定义函数
// 两种定义函数类型的方式
// 1、(形参: 形参类型) => 返回值类型，多个形参逗号分隔
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
// 2、{(形参: 形参类型): 返回值类型}，多个形参逗号分隔
let myMinus: {(x: number, y: number): number} =
    function(x: number, y: number): number { return x - y; };

let mySquare1: (x: number) => number = 
    function (x: number) : number { return x * x; }
let mySquare2: {(x: number): number} = 
    function (x: number) : number { return x * x; }
// 剩余参数
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
    
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;

// this
// 定义一个函数，其中一个参数是函数
const addClickListener: (e: Event, callback: (this: void, e: Event) => void) => void
    = (e: Event, onclick: (this: void, e: Event) => void): void => {
        onclick(e);
    }

class Handler {
    info: string = 'handler';
    // 类中的函数可以指定this的类型
    onClickBad(this: Handler, e: Event): void {
        this.info = (<any>e).message;
    };
    // 如果用函数定义的方式，在函数体内就不能使用this
    onClickGood(/*this: void, */e: Event): void {
        console.log('handler');
    }
    // 如果想在函数体内使用this，就要使用箭头函数，且函数作为一个属性，
    // 缺点是每个实例都会实现一遍箭头函数
    onClickArrow = (e: Event) => {
        this.info = (<any>e).message;
    }
}

let h = new Handler();
let evt = new Event('click');
h.onClickBad(evt);
// h.onClickBad作为参数会报错
// addClickListener(evt, h.onClickBad)
addClickListener(evt, h.onClickGood);
addClickListener(evt, h.onClickArrow);

// 重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
// 重载列表
function pickCard(x: {suit: string; card: number;}[]) : number;
function pickCard(x: number) : {suit: string; card: number;};

function pickCard(x: any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
// 形参为string不在重载列表里，报错
// let pickedCard3 = pickCard('123');