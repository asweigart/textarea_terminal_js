/*
Textarea_Terminal_JS by Al Sweigart al@inventwithpython.com
https://github.com/asweigart/bextjs
*/

/*
When calling input(), you must call it with await:
    await input();
Otherwise, the entire page will freeze. Also, any function that calls input()
must itself be called with an await or else it will be skipped over.

When calling sleep(), you must call it with await:
    await sleep(2);
Or else it will not pause the program. Also, any function that calls input()
must itself be called with an await or else the program won't pause.

The input() and sleep() functions can only be called from an async function:

async main() {
    await input();
    await sleep(2);
    print('Hello');
}
*/

"use strict";


function _countNewlines(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '\n') {
            count++;
        }
    }
    return count;
}

function _truncateForRowBuffer(outputElem, rowBufferSize) {
    if (rowBufferSize === null) {
        return;  // a null row buffer size means never truncate
    }

    let totalNewlines = _countNewlines(outputElem.value);
    if (totalNewlines >= rowBufferSize) {
        let newlineCount = 0;
        let cutAt = 0;
        for (cutAt = 0; cutAt < outputElem.value.length; cutAt++) {
            if (outputElem.value[cutAt] === '\n') {
                if (newlineCount == totalNewlines - rowBufferSize) {
                    break;
                } else {
                    newlineCount++;
                }
            }
        }
        outputElem.value = outputElem.value.substring(cutAt + 1);
    }
}

function _processBackspaces(input) {
    let stack = [];
    for (let char of input) {
        if (char === '\b') {
            // If it's a backspace and there's something in the stack, pop the stack.
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            // Otherwise, push the current character to the stack.
            stack.push(char);
        }
    }
    return stack.join('');
}

function sleep(delayInMilliseconds) {
    // Pause the program.
    return new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
}


class Tatjs {
    constructor(outputElem=null, inputElem=null, rowBufferSize=256) {
        this.rowBufferSize = rowBufferSize;
        this.outputElem = outputElem;
        this.inputElem = inputElem;

        if (this.outputElem !== null) {
            this.outputElem.readOnly = true;
        }
        if (this.inputElem !== null) {
            this.inputElem.readOnly = true; 
        }
        this.clear();
    }

    print() {
        // Pass a blank string as the last argument if you don't want a newline automatically added.
        if (this.outputElem === null) {
            throw "print() has been called but this.outputElem does not exist.";
        }

        let args = Array.prototype.slice.call(arguments);
        let newline = "\n";
        if (args.length !== 1 && args[args.length - 1] == "") {
            // If the last argument is a blank string, suppress the newline character we automatically add to the end.
            newline = "";
        }

        this.outputElem.value = _processBackspaces(this.outputElem.value + args.join("")) + newline;
        _truncateForRowBuffer(this.outputElem, this.rowBufferSize);
        this.outputElem.scrollTop = this.outputElem.scrollHeight; // Scroll to the bottom of the text field.
    }

    input() {
        if (this.inputElem === null) {
            throw "input() has been called but this.inputElem does not exist.";
        }

        // Wait for the user to type something into the input text field and press Enter. Return this string.
        this.inputElem.readOnly = false;
        this.inputElem.focus();

        let that = this;
        return new Promise((resolve) => {
            function handleKeypress(e) {
                if (e.key === "Enter") {
                    that.print(e.target.value);
                    resolve(e.target.value);
                    e.target.value = "";  // Blank the input text field
                    that.inputElem.removeEventListener('keypress', handleKeypress)
                    that.inputElem.readOnly = true;
                }
            }
            this.inputElem.addEventListener('keypress', handleKeypress)
        });
    }

    sleep(delayInMilliseconds) { // This is here just in case the user calls this method instead of the function by accident.
        // Pause the program.
        return new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
    }

    clear() {
        // Erase all the text in the output text field:
        if (this.outputElem === null) {
            throw "clear() has been called but this.outputElem does not exist.";
        }
        this.outputElem.value = "";
    }

}


