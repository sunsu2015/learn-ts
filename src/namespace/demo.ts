/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// 编译时需要使用tsc --outFile distFile sourceFile命令，这样文件会按照上面注释的顺序将全部文件写到目标文件中

// Some samples to try
let strings = ["Hello", "98052", "101"];

// 别名 注意区分 import xx = require('xx');
import StringValidator = Validation.StringValidator;
import ZipCodeValidator = Validation.ZipCodeValidator;
import LettersOnlyValidator = Validation.LettersOnlyValidator;

// Validators to use
let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}