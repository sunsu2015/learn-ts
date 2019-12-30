// 数字枚举
enum Direction {
    Up = 1,
    Down,
    Left = 2,
    Right
}

console.log(Direction.Down);
console.log(Direction['Left']);
console.log(Direction[2]);

// 字符串枚举

enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// 异构枚举
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// 枚举值成为类型举例
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

const circle: Circle = {
    kind: ShapeKind.Circle, // ShapeKind.Square 会报错
    radius: 100,
}
