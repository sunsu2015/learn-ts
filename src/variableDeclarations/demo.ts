// 暂存死区

function test() {
    var foo = 33;
    {
        // Block-scoped variable 'foo' used before its declaration
        // let foo = foo + 55;
    }
}

test();


function go(n: Object) {
    // n here is defined!
    console.log(n); // Object {a: [1,2,3]}

    // for (let n of n.a) { // ReferenceError
    //     console.log(n);
    // }
}

go({a: [1, 2, 3]});

// 解构

// 对象解构-属性重命名 + 限定类型
type TYPE1 = {a: number, b: number}
let {a: prop1, b: prop2}: TYPE1 = {a:1, b:2};
console.log(prop1, prop2); // 1 2

// 默认值
function f({ a="a", b=0 }: any = {}): void {
    console.log(a, b);
}
f(); // 默认值不设置为{}，则此行报错
f({})
f({b: 1});

var {c, d='d'} = {c: 1};