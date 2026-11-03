# C=64 BASIC V2 Interpreter

_A little piece of 1982, running in your browser._

A browser-based **Commodore 64 BASIC V2 interpreter**, built from scratch with **TypeScript**.

Write and execute BASIC commands directly, create programs using classic line numbers and experience a little 8-bit nostalgia with a retro-inspired interface, authentic-looking typography, and the iconic blinking block cursor.

The interpreter also powers an interactive portfolio written in BASIC.

Check it out [here](https://www.marclang.ch).

## Features

- **Interactive BASIC interpreter** — execute commands directly in the browser.
- **Line-numbered programs** — write, store, list, and run BASIC programs.
- **Control flow** — conditional statements with `IF`, `THEN`, `AND`, `OR`, and jumps with `GOTO`.
- **Variables** — numeric, integer (`%`), and string (`$`) variables, including assignment with `LET`.
- **Arithmetic evaluator** — operator precedence, negative numbers, and arithmetic expressions without JavaScript's `eval()`.
- **Interactive input** — prompt users with `INPUT` and resume execution when they respond.
- **Program loading** — load bundled `.bas` files using `LOAD`.
- **Execution interruption** — stop a running program with `Ctrl+C`.
- **Retro interface** — Commodore 64-inspired typography, colors, and blinking cursor.
- **Automated testing** — unit and integration tests for BASIC commands and program execution.

## Getting started

### Prerequisites

- Node.js
- Vite+ (`vp`)

### Installation

Clone the repository:

```bash
git clone https://github.com/marclang64/retro-love.git
cd retro-love
```

Install dependencies:

```bash
vp install
```

Start the development server:

```bash
vp dev
```

Open the local URL displayed in your terminal.

### Production build

Build the application:

```bash
vp build
```

Preview the production build locally:

```bash
vp preview
```

The application can load different startup BASIC programs depending on whether it runs in development or production mode.

## Usage

### Direct commands

Enter BASIC commands directly into the terminal:

```basic
PRINT "HELLO WORLD"
PRINT 2+3*4
```

### Writing and running programs

Add line numbers to store commands as a program:

```basic
10 PRINT "HELLO WORLD"
20 INPUT "WHAT IS YOUR NAME"; N$
30 PRINT "HELLO "; N$
40 PRINT "WELCOME TO THE C64!"
```

Execute the program:

```basic
RUN
```

Use `LIST` to inspect stored program lines.

### Variables and arithmetic

Assign values with `LET` and use them in expressions:

```basic
10 LET A=10
20 LET B=A*2+5
30 PRINT B
```

Output:

```text
25
```

String variables use the `$` suffix, while integer variables use `%`.

```basic
10 LET NAME$="COMMODORE"
20 LET COUNT%=3
30 PRINT NAME$
40 PRINT COUNT%
```

### Conditional execution

Use `IF` statements to control program flow:

```basic
10 PRINT "HELLO WORLD"
20 INPUT "READ IT AGAIN? Y/N"; A$
30 IF A$="Y" THEN 10
40 IF A$="N" THEN 60
50 GOTO 20
60 PRINT "OK. BYE THEN!"
```

String comparisons are case-sensitive, as in the original BASIC V2.

### Loading BASIC programs

Load a bundled BASIC program into memory:

```basic
LOAD "WEBSITE"
```

Then execute it:

```basic
RUN
```

`LOAD` loads the program into memory without executing it. `RUN` starts execution.

### Interrupting execution

Press **Ctrl+C** to interrupt a running program, including one waiting for `INPUT`.

## How it works

The interpreter is organized into several components:

| Component                   | Responsibility                                                           |
| --------------------------- | ------------------------------------------------------------------------ |
| **Dispatcher**              | Processes entered BASIC commands and numbered program lines              |
| **Tokenizer**               | Converts BASIC expressions into typed tokens                             |
| **Command implementations** | Execute instructions such as `PRINT`, `LET`, `INPUT`, and `GOTO`         |
| **Arithmetic evaluator**    | Evaluates expressions with operator precedence and unary minus           |
| **Program storage**         | Stores numbered BASIC lines and variables                                |
| **Execution engine**        | Runs programs, handles jumps, waits for input, and supports interruption |

The interpreter evaluates arithmetic expressions without using JavaScript's `eval()`.

Bundled BASIC programs are stored in `.bas` files and imported as raw text through Vite+.

## Testing

Run the test suite:

```bash
vp test
```

The tests cover tokenization, arithmetic evaluation, BASIC commands, and integration scenarios involving `RUN`, `GOTO`, `INPUT`, and Ctrl+C.

## Tech stack

- **TypeScript** — interpreter implementation
- **Vite+** — development tooling and builds
- **Vitest** — automated testing
- **HTML & CSS** — retro terminal interface

## Project scope

This project is a tribute to the Commodore 64 and an exploration of how a programming language interpreter works.

It aims to recreate the core experience of programming in **Commodore 64 BASIC V2** inside a modern web browser.

It is not a hardware emulator, and not every original BASIC V2 command or hardware-specific feature is implemented (yet).

## Why I built this

The Commodore 64 comes from an era when programming was part of the experience of using a computer.

I wanted to bring that feeling into the browser while building something more interesting than a conventional portfolio website.

Rather than simply recreating the appearance of a retro terminal, I built an interpreter that can actually execute BASIC programs.

The result is both a programming experiment and an interactive portfolio.

---

_READY._ █
