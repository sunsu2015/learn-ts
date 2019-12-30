namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// Some samples to try
let testStrings = ["Hello", "98052", "101"];
// Validators to use
let testValidators: { [s: string]: Validation.StringValidator; } = {};
testValidators["ZIP code"] = new Validation.ZipCodeValidator();
testValidators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
testStrings.forEach(s => {
    for (let name in testValidators) {
        console.log(`"${ s }" - ${ testValidators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
});