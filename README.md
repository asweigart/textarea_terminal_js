# Textarea_Terminal_JS 

Textarea_Terminal_JS provides Python-style `print()`, `input()`, and `sleep()` functions in JavaScript that treat a &lt;textarea&gt; element as a sort of terminal window and a &lt;input type="text"&gt; element as a keyboard input interface.

This example has a simple "Hello, world!" program:

    <html>

    <textarea id="outputTextarea" class="tatjsOutput" readonly></textarea><br />
    <input type="text" id="inputText" class="tatjsInput" readonly />

    <script src="textarea_terminal.js"></script>
    <link rel="stylesheet" href="textarea_terminal.css">

    <script>
    tat = new Tatjs('outputTextarea', 'inputText');
    async function main() {
        // input() and sleep() must be called from inside an async function.
        tat.print('Hello, what is your name?');
        let name = await tat.input();  // input() requries `away`

        // Pass a blank string as the last argument if you don't want a newline automatically added.
        tat.print('Well...', '');
        await sleep(1000);  // sleep() requires `await`
        tat.print('...it is good to meet you, ', name, '.');
    }
    main();
    </script>

    </body>
    </html>

Place the `textarea_terminal.js` and `textarea_terminal.css` in the same folder as your HTML file.

Bext supplies `print()`, `input()`, and `sleep()` functions that are similar to Python's functions.

# print()

The `print()` function makes text appear in the "screen" text field. A newline is automatically appended to the end of this text. Multiple arguments can be passed to `print()`. No separation character will be inserted in between these arguments. If the last argument to `print()` is a blank string, the automatic newline character is supressed.

# input()

The `input()` function focuses the keyboard input into the user input text field. The user can type text here, and upon pressing enter, it's returned from the `input()` call. This text is also automatically displayed in the "screen" text field.

Note that you must always insert the `await` keyword before the call to `input()`.

# sleep()

The `sleep()` function is passed the number of seconds it should pause before returning.

Note that you must always insert the `await` keyword before the call to `sleep()`.

# clear()

The `clear()` function erases all the text in the "screen" text field.

# Examples

See the demos in this repo or online:

* [Cho Han Game](https://inventwithpython.com/bextjsdemos/chohan.html)
* [Guess the Number](https://inventwithpython.com/bextjsdemos/guess.html)
* [Cube Wall Animation](https://inventwithpython.com/bextjsdemos/cubewall.html)
* [Zigzag Animation](https://inventwithpython.com/bextjsdemos/zigzag.html)

BextJS is used for all the demos at [The Scroll Art Museum](https://scrollart.org).


Support
-------

If you find this project helpful and would like to support its development, [consider donating to its creator on Patreon](https://www.patreon.com/AlSweigart).
