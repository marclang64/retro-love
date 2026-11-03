function e(e) {
  let t = document.querySelector(e);
  if (!t) throw Error(`Element not found: ${e}`);
  return t;
}
function t() {
  let t = e(`.input`),
    n = e(`.output`);
  function r(e) {
    ((n.value += `\n${e}`), (n.scrollTop = n.scrollHeight));
  }
  function i() {
    n.value = ``;
  }
  function a() {
    ((t.value = ``), (t.style.width = `0px`));
  }
  function o(e = !1) {
    e &&
      r(`
Ready.`);
  }
  return { input: t, output: n, outputLine: r, clearOutput: i, clearInput: a, resetInput: o };
}
var n = t(),
  r = (function (e) {
    return (
      (e[(e.DEFAULT = 0)] = `DEFAULT`),
      (e[(e.GOTO = 1)] = `GOTO`),
      (e[(e.INPUT = 2)] = `INPUT`),
      (e[(e.ERROR = 3)] = `ERROR`),
      e
    );
  })({}),
  i = (function (e) {
    return ((e[(e.PROMPT = 0)] = `PROMPT`), (e[(e.INPUTVAR = 1)] = `INPUTVAR`), e);
  })({}),
  a = { activeInputMode: i.PROMPT, isInputEnabled: !0, abortProgram: !1 };
async function o() {
  return (n.clearOutput(), n.clearInput(), { type: r.DEFAULT, value: null });
}
async function s() {
  return { type: r.DEFAULT, value: null };
}
async function c(e) {
  return { type: r.DEFAULT, value: null };
}
var l = [],
  u = {},
  d = (e) => {
    let t = l.findIndex((t) => t.lineNumber === e.lineNumber);
    (t !== -1 && l.splice(t, 1), l.push(e), l.sort((e, t) => e.lineNumber - t.lineNumber));
  },
  f = (e) => {
    l = l.filter((t) => t.lineNumber !== e);
  },
  p = (e, t) => {
    u[e.toLowerCase()] = t;
  },
  m = () => {
    l = [];
  };
async function h(e) {
  let t = e.trim();
  if (!/^\d+$/.test(t)) return { type: r.ERROR, value: null };
  let n = Number(t),
    i = l.findIndex((e) => e.lineNumber === n);
  return i === -1 ? { type: r.ERROR, value: null } : { type: r.GOTO, value: i };
}
async function g() {
  return (n.outputLine(`TBD`), { type: r.DEFAULT, value: null });
}
function _(e) {
  let t = [...e];
  for (let e = 0; e < t.length; e++) {
    let n = t[e];
    if (n.type === `operator` && n.value === `-` && (e === 0 || t[e - 1].type === `operator`)) {
      let n = t[e + 1];
      if (!n || n.type !== `number`) throw Error(`Invalid unary minus`);
      ((t[e] = { type: `number`, value: String(-Number(n.value)) }), t.splice(e + 1, 1));
    }
  }
  if (t.length === 0) throw Error(`Empty arithmetic expression`);
  for (let e = 0; e < t.length; e++) {
    let n = e % 2 == 0 ? `number` : `operator`;
    if (t[e].type !== n) throw Error(`Invalid arithmetic expression`);
  }
  if (t.length % 2 == 0) throw Error(`Incomplete arithmetic expression`);
  for (let e = 0; e < t.length; e++)
    t[e].type === `operator` &&
      (t[e].value === `*` || t[e].value === `/`) &&
      ((t[e] = { value: v(t[e - 1], t[e + 1], t[e]), type: `number` }),
      t.splice(e + 1, 1),
      t.splice(e - 1, 1),
      (e -= 2));
  for (let e = 0; e < t.length; e++)
    t[e].type === `operator` &&
      (t[e].value === `+` || t[e].value === `-`) &&
      ((t[e] = { value: v(t[e - 1], t[e + 1], t[e]), type: `number` }),
      t.splice(e + 1, 1),
      t.splice(e - 1, 1),
      (e -= 2));
  return String(t[0].value);
}
function v(e, t, n) {
  if (n.value === `+`) return Number(e.value) + Number(t.value);
  if (n.value === `-`) return Number(e.value) - Number(t.value);
  if (n.value === `*`) return Number(e.value) * Number(t.value);
  if (n.value === `/`) return Number(e.value) / Number(t.value);
  throw Error(`Invalid arithmetic operator`);
}
function y(e) {
  let t = [`+`, `-`, `*`, `/`],
    n = [`=`, `<>`, `<`, `<=`, `>`, `>=`],
    r = [`;`, `,`],
    i = [`$`, `%`],
    a = [],
    o = ``,
    s = !1,
    c = !1,
    l = !1,
    u = !1;
  for (let d = 0; d <= e.length; d++) {
    let f = e[d];
    if (f === `"` && s) {
      (a.push({ value: o, type: `string` }), (s = !1), (u = !1), (o = ``));
      continue;
    }
    if (
      (!/^[0-9.]$/.test(f) &&
        c &&
        (a.push({ value: Number(o), type: `number` }), (o = ``), (c = !1), (u = !1)),
      !s &&
        !/^[A-Za-z]$/.test(f) &&
        Object.hasOwn(W, o.toLowerCase()) &&
        (a.push({ value: o.toLowerCase(), type: `command` }), (o = ``), (l = !1), (u = !1)),
      !s &&
        !/^[A-Za-z]$/.test(f) &&
        G.includes(o.toLowerCase()) &&
        (a.push({ value: o.toLowerCase(), type: `keyword` }), (o = ``), (l = !1), (u = !1)),
      (!/^[A-Za-z]$/.test(f) || i.includes(f)) && l)
    ) {
      if (i.includes(f)) {
        ((o += f),
          a.push({ value: o.toLowerCase(), type: `variable` }),
          (o = ``),
          (l = !1),
          (u = !1));
        continue;
      }
      (a.push({ value: o.toLowerCase(), type: `variable` }), (o = ``), (l = !1), (u = !1));
    }
    if (!s && f === ` `) continue;
    if (f === `"` && !s && !u) {
      ((s = !0), (u = !0));
      continue;
    }
    if (s && f !== void 0) {
      o += f;
      continue;
    }
    if (/^[0-9.]$/.test(f) && !c && !u) {
      ((c = !0), (u = !0), (o += f));
      continue;
    }
    if (/^[0-9.]$/.test(f) && c) {
      if (f === `.` && o.includes(`.`)) throw Error(`Invalid number`);
      o += f;
      continue;
    }
    if (/^[A-Za-z]$/.test(f) && !l && !u) {
      ((l = !0), (u = !0), (o += f));
      continue;
    }
    if (/^[A-Za-z]$/.test(f) && l) {
      o += f;
      continue;
    }
    if (t.includes(f)) {
      a.push({ value: f, type: `operator` });
      continue;
    }
    let p = n.includes(e.slice(d, d + 2)) ? e.slice(d, d + 2) : f;
    if (n.includes(p)) (a.push({ value: p, type: `comparisonoperator` }), (d += p.length - 1));
    else if (r.includes(f)) a.push({ value: f, type: `separator` });
    else if (f !== void 0) throw Error(`Unexpected character: ${f}`);
  }
  return (s && a.push({ value: o, type: `string` }), a);
}
function b(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    if (r.type === `variable`) {
      let i = t[String(r.value)];
      if (i === void 0) throw Error(`Undefined variable: ${r.value}`);
      e[n] = { value: i, type: typeof i == `number` ? `number` : `string` };
    }
  }
  return e;
}
function x(e) {
  let t = ``,
    n = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    (n.length && i.type !== `number` && i.type !== `operator` && ((t += _(n)), (n = [])),
      i.type === `string`
        ? (t += i.value)
        : i.type === `separator`
          ? (t += ` `)
          : i.type === `number`
            ? n.length || e[r + 1]?.type === `operator`
              ? n.push(i)
              : (t += i.value)
            : i.type === `operator` && n.push(i));
  }
  return (n.length && (t += _(n)), t);
}
function S(e) {
  return e.slice(-1) === `$` ? `string` : e.slice(-1) === `%` ? `integer` : `float`;
}
function C(e) {
  let t = e.trim();
  return /^[-+]?\d+$/.test(t)
    ? `integer`
    : /^[-+]?(?:\d+\.\d*|\.\d+)$/.test(t)
      ? `float`
      : `string`;
}
function w(e, t) {
  let n = S(e),
    r = C(t);
  return n === `string` || r !== `string`;
}
function T(e, t) {
  let n = e.trim();
  if (t === `string`) return n;
  if (t === `integer`) return Math.trunc(Number(n)) || 0;
  if (t === `float`) return parseFloat(n);
  throw Error(`Unknown variable type: ${t}`);
}
async function E(e) {
  try {
    let t = typeof e == `string` ? y(e) : e;
    if (t.length) {
      let e = x(b(t, u));
      n.outputLine(e);
    } else n.outputLine(``);
    return { type: r.DEFAULT, value: null };
  } catch {
    return { type: r.ERROR, value: null };
  }
}
async function D(e) {
  let t,
    n = !1,
    i = { type: `success`, value: !1 };
  try {
    t = y(e);
  } catch {
    return { type: r.ERROR, value: null };
  }
  for (let e = 0; e < t.length;)
    if (e === 0) {
      if (((i = O(t[e], t[e + 2], t[e + 1])), i.type === `error`))
        return { type: r.ERROR, value: null };
      e += 3;
    } else if (t[e].type === `keyword` && t[e].value === `or`) {
      let a = O(t[e + 1], t[e + 3], t[e + 2], !n && !i.value);
      if (a.type === `error`) return { type: r.ERROR, value: null };
      (i.value ? (n = !0) : n || (i = a), (e += 4));
    } else if (t[e].type === `keyword` && t[e].value === `and`) {
      let a = O(t[e + 1], t[e + 3], t[e + 2], !n && i.value);
      if (a.type === `error`) return { type: r.ERROR, value: null };
      (!n && i.value && (i = a), (e += 4));
    } else
      return t[e].type === `keyword` &&
        (t[e].value === `then` || t[e].value === `goto`) &&
        t[e + 1]?.type === `number` &&
        e + 2 === t.length
        ? i.value
          ? h(String(t[e + 1].value))
          : { type: r.DEFAULT, value: null }
        : t[e].type === `keyword` &&
            t[e].value === `then` &&
            t[e + 1]?.type === `command` &&
            t[e + 1].value === `print`
          ? i.value
            ? E(t.slice(e + 2))
            : { type: r.DEFAULT, value: null }
          : { type: r.ERROR, value: null };
  return { type: r.ERROR, value: null };
}
function O(e, t, n, r = !0) {
  let i = [`string`, `number`, `variable`];
  if (
    !e ||
    !t ||
    !n ||
    !i.includes(e.type) ||
    !i.includes(t.type) ||
    n.type !== `comparisonoperator` ||
    ![`=`, `<>`, `<`, `<=`, `>`, `>=`].includes(String(n.value))
  )
    return { type: `error`, value: !1 };
  if (!r) return { type: `success`, value: !1 };
  let a = e.type === `variable` ? u[String(e.value)] : e.value,
    o = t.type === `variable` ? u[String(t.value)] : t.value;
  if (a === void 0 || o === void 0 || typeof a != typeof o) return { type: `error`, value: !1 };
  let s = !1;
  return (
    n.value === `=`
      ? (s = a === o)
      : n.value === `<>`
        ? (s = a !== o)
        : n.value === `<`
          ? (s = a < o)
          : n.value === `<=`
            ? (s = a <= o)
            : n.value === `>`
              ? (s = a > o)
              : n.value === `>=` && (s = a >= o),
    { type: `success`, value: s }
  );
}
async function k(e) {
  let t;
  try {
    t = y(e);
  } catch {
    return { type: r.ERROR, value: null };
  }
  if (t[0]?.type === `string`) {
    if (t[1]?.value !== `;` || t[2]?.type !== `variable`) return { type: r.ERROR, value: null };
    n.outputLine(t[0].value);
  }
  let i = t[0]?.type === `string` ? t.slice(2) : t,
    a = i.slice(-1)[0],
    o = i.every((e, t) => t % 2 != 1 || e.value === `,`),
    s = i.every((e, t) => t % 2 != 0 || e.type === `variable`);
  if (!a || a.type !== `variable` || !o || !s || a.type !== `variable`)
    return { type: r.ERROR, value: null };
  let c = i.filter((e, t) => t % 2 == 0);
  return { type: r.INPUT, value: c };
}
async function A(e) {
  return new Promise((t, r) => {
    let i = () => {
        (n.input.removeEventListener(`keydown`, o), n.input.removeEventListener(`cancelInput`, a));
      },
      a = () => {
        (i(), r(Error(`InputCancelled`)));
      },
      o = (a) => {
        if (a.key === `Enter`) {
          let a = n.input.value.trim(),
            o = w(e, a),
            s = S(e);
          if (!o) {
            (i(),
              n.outputLine(a),
              n.outputLine(`?REDO FROM START`),
              n.clearInput(),
              r(Error(`InvalidType`)));
            return;
          }
          (p(e, T(a, s)), n.outputLine(a), n.clearInput(), i(), t(a));
        }
      };
    (n.input.addEventListener(`keydown`, o), n.input.addEventListener(`cancelInput`, a));
  });
}
async function j(e) {
  try {
    let t = y(e);
    if (
      t.length < 3 ||
      t[0].type !== `variable` ||
      t[1].type !== `comparisonoperator` ||
      t[1].value !== `=`
    )
      return { type: r.ERROR, value: null };
    let n = String(t[0].value),
      i = S(n),
      a = b(t.slice(2), u),
      o;
    if (i === `string`) {
      if (a.length !== 1 || a[0].type !== `string`) return { type: r.ERROR, value: null };
      o = String(a[0].value);
    } else {
      if (a.some((e) => e.type !== `number` && e.type !== `operator`))
        return { type: r.ERROR, value: null };
      o = T(_(a), i);
    }
    return (p(n, o), { type: r.DEFAULT, value: null });
  } catch {
    return { type: r.ERROR, value: null };
  }
}
async function M() {
  for (let e of l)
    n.outputLine(`${e.lineNumber} ${e.name.toUpperCase()}${e.args ? ` ${e.args}` : ``}`);
  return { type: r.DEFAULT, value: null };
}
var N = {
    dev: `1 LET N = 123\r
2 LET F% = 1.23\r
3 LET S$ = "FOO"\r
\r
10 PRINT "Hello World"\r
20 PRINT "Want to read it again?"\r
30 INPUT "Y/N"; A$\r
40 PRINT\r
50 IF A$="Y" OR A$="y" THEN 10\r
60 IF A$="N" OR A$="n" THEN 80\r
70 GOTO 30\r
80 PRINT "ok. bye then"\r
\r
90 PRINT "NUMBER N: "; N\r
100 PRINT "FLOAT F%: "; F%\r
110 PRINT "STRING S$: "; S$\r
`,
    website: `0 CLR
10 PRINT
11 PRINT
12 PRINT
20 PRINT "== WELCOME, TRAVELER =="
30 PRINT
40 PRINT "YOU HAVE ENTERED MY DIGITAL REALM."
50 PRINT "THIS WORLD RUNS ON BASIC V2 AND"
60 PRINT "AND A HEALTHY DOSE OF NOSTALGIA."
61 PRINT
70 PRINT "--------------------------------"
80 PRINT
90 PRINT "1  ABOUT ME"
100 PRINT "2  PROJECTS"
110 PRINT "3  SKILLS"
120 PRINT "4  CONTACT"
130 PRINT "5  SYSTEM INFO"
140 PRINT "6  EXIT"
150 PRINT
160 PRINT "--------------------------------"
170 PRINT
500 PRINT "YOUR ADVENTURE STARTS HERE."
510 PRINT "CHOOSE YOUR NEXT DESTINATION."
511 PRINT
900 INPUT "TYPE A NUMBER TO NAVIGATE."; A
910 IF A=1 THEN 1000
920 IF A=2 THEN 2000
930 IF A=3 THEN 3000
940 IF A=4 THEN 4000
950 IF A=5 THEN 5000
960 IF A=6 THEN 6000
970 GOTO 900
1000 CLR
1010 PRINT
1011 PRINT
1012 PRINT
1020 PRINT "== ABOUT ME =="
1021 PRINT
1030 PRINT "--------------------------------"
1040 PRINT
1050 PRINT "0  HOME"
1060 PRINT "2  PROJECTS"
1070 PRINT "3  SKILLS"
1080 PRINT "4  CONTACT"
1090 PRINT "5  SYSTEM INFO"
1100 PRINT "6  EXIT"
1110 PRINT
1120 PRINT "--------------------------------"
1130 PRINT
1500 PRINT "I'M A SOFTWARE DEVELOPER BASED IN SWITZERLAND."
1501 PRINT
1510 PRINT "MY ADVENTURE BEGAN SHORTLY AFTER THE GOLDEN AGE OF HOME COMPUTERS. ARMED WITH A C=64, MY FIRST EVER PROGRAM WAS A TEXT ADVENTURE WRITTEN IN BASIC V2. ITS INTERFACE LOOKED EERILY SIMILAR TO WHAT YOU ARE STARING AT RIGHT NOW."
1511 PRINT
1520 PRINT "SINCE THEN, I'VE GAINED A FEW EXPERIENCE POINTS. STARTING WITH THE BASE CLASS OF JUNIOR WEB DEVELOPER, I QUICKLY LEVELED UP TO GLOBAL WEB MANAGER, TOOK A DETOUR THROUGH THE LANDS OF EVENT MANAGEMENT, AND EVENTUALLY RETURNED TO WEB DEVELOPMENT."
1521 PRINT
1530 PRINT "OUTSIDE THE DIGITAL REALM, I SPEND MY TIME WITH FRIENDS AND FAMILY, AT THE GYM, EXPLORING ESCAPE ROOMS OR PLAYING MAGIC THE GATHERING. RECENTLY, I ALSO STARTED A NEW SIDE QUEST: SYSTEMS PROGRAMMING. THE LEARNING CURVE IS STEEP, BUT THE XP IS WORTH IT."
1531 PRINT
1540 PRINT "THE QUEST CONTINUES..."
1541 PRINT
1900 INPUT "TYPE A NUMBER TO NAVIGATE."; A
1910 IF A=0 THEN 0
1920 IF A=2 THEN 2000
1930 IF A=3 THEN 3000
1940 IF A=4 THEN 4000
1950 IF A=5 THEN 5000
1960 IF A=6 THEN 6000
1970 GOTO 1900
2000 CLR
2010 PRINT
2011 PRINT
2012 PRINT
2020 PRINT "== QUEST LOG =="
2021 PRINT
2030 PRINT "--------------------------------"
2040 PRINT
2050 PRINT "0  HOME"
2060 PRINT "1  ABOUT ME"
2070 PRINT "3  SKILLS"
2080 PRINT "4  CONTACT"
2090 PRINT "5  SYSTEM INFO"
2100 PRINT "6  EXIT"
2110 PRINT
2120 PRINT "--------------------------------"
2130 PRINT
2500 PRINT "EVERY ADVENTURE LEAVES A TRAIL."
2510 PRINT "HERE ARE SOME OF THE QUESTS I'VE TAKEN ON."
2511 PRINT
2520 PRINT "QUEST 001: THE BASIC PORTFOLIO"
2530 PRINT "STATUS: IN PROGRESS"
2540 PRINT "A TRIBUTE TO THE MACHINE THAT STARTED IT ALL. A WEB PORTFOLIO POWERED BY A JAVASCRIPT IMPLEMENTATION OF COMMODORE 64 BASIC V2."
2541 PRINT
2550 PRINT "QUEST 002: CLASSIFIED"
2560 PRINT "STATUS: NOT YET REVEALED"
2570 PRINT "SOME ADVENTURES ARE STILL WAITING TO BE DOCUMENTED."
2571 PRINT
2580 PRINT "MORE QUESTS WILL BE ADDED AS THE JOURNEY CONTINUES."
2581 PRINT
2590 PRINT "QUEST LOG UPDATED."
2591 PRINT
2900 INPUT "TYPE A NUMBER TO NAVIGATE."; A
2910 IF A=0 THEN 0
2920 IF A=1 THEN 1000
2930 IF A=3 THEN 3000
2940 IF A=4 THEN 4000
2950 IF A=5 THEN 5000
2960 IF A=6 THEN 6000
2970 GOTO 2900
3000 CLR
3010 PRINT
3011 PRINT
3012 PRINT
3020 PRINT "== CHARACTER STATS =="
3021 PRINT
3030 PRINT "--------------------------------"
3040 PRINT
3050 PRINT "0  HOME"
3060 PRINT "1  ABOUT ME"
3070 PRINT "2  PROJECTS"
3080 PRINT "4  CONTACT"
3090 PRINT "5  SYSTEM INFO"
3100 PRINT "6  EXIT"
3110 PRINT
3120 PRINT "--------------------------------"
3130 PRINT
3500 PRINT "CLASS: SOFTWARE DEVELOPER"
3510 PRINT "LOCATION: SWITZERLAND"
3520 PRINT "ALIGNMENT: CURIOUS NEUTRAL"
3521 PRINT
3530 PRINT "PRIMARY ABILITIES"
3540 PRINT "------------------------"
3550 PRINT "WEB DEVELOPMENT"
3560 PRINT "WEB MANAGEMENT"
3570 PRINT "PROBLEM SOLVING"
3580 PRINT "CREATIVE THINKING"
3581 PRINT
3590 PRINT "SECONDARY ABILITIES"
3600 PRINT "------------------------"
3610 PRINT "EVENT MANAGEMENT"
3620 PRINT "SYSTEMS PROGRAMMING (LEARNING)"
3630 PRINT "RETRO COMPUTING"
3631 PRINT
3640 PRINT "SPECIAL EQUIPMENT"
3650 PRINT "------------------------"
3660 PRINT "COMMODORE 64"
3670 PRINT "BASIC V2"
3680 PRINT "A KEYBOARD AND TOO MANY IDEAS"
3681 PRINT
3690 PRINT "NEW SKILLS ARE UNLOCKED THROUGH"
3700 PRINT "EXPERIMENTATION, FAILURE AND XP."
3701 PRINT
3900 INPUT "TYPE A NUMBER TO NAVIGATE."; A
3910 IF A=0 THEN 0
3920 IF A=1 THEN 1000
3930 IF A=2 THEN 2000
3940 IF A=4 THEN 4000
3950 IF A=5 THEN 5000
3960 IF A=6 THEN 6000
3970 GOTO 3900
4000 CLR
4010 PRINT
4011 PRINT
4012 PRINT
4020 PRINT "== COMMUNICATION PORTAL =="
4021 PRINT
4030 PRINT "--------------------------------"
4040 PRINT
4050 PRINT "0  HOME"
4060 PRINT "1  ABOUT ME"
4070 PRINT "2  PROJECTS"
4080 PRINT "3  SKILLS"
4090 PRINT "5  SYSTEM INFO"
4100 PRINT "6  EXIT"
4110 PRINT
4120 PRINT "--------------------------------"
4130 PRINT
4500 PRINT "EVERY GREAT ADVENTURE BEGINS"
4510 PRINT "WITH A CONVERSATION."
4511 PRINT
4520 PRINT "HAVE A PROJECT IN MIND?"
4530 PRINT "FOUND A BUG IN THIS REALM?"
4540 PRINT "OR JUST WANT TO SAY HELLO?"
4541 PRINT
4550 PRINT "THE COMMUNICATION PORTAL IS OPEN."
4551 PRINT
4560 PRINT "EMAIL: INFO@MARCLANG.CH"
4570 PRINT "WEBSITE: MARCLANG.CH (DUH)"
4580 PRINT "GITHUB: GITHUB.COM/MARCLANG64"
4581 PRINT
4590 PRINT "NO CARRIER PIGEONS REQUIRED."
4591 PRINT
4900 INPUT "TYPE A NUMBER TO NAVIGATE."; A
4910 IF A=0 THEN 0
4920 IF A=1 THEN 1000
4930 IF A=2 THEN 2000
4940 IF A=3 THEN 3000
4950 IF A=5 THEN 5000
4960 IF A=6 THEN 6000
4970 GOTO 4900
5000 CLR
5010 PRINT
5011 PRINT
5012 PRINT
5020 PRINT "== SYSTEM INFORMATION =="
5021 PRINT
5030 PRINT "--------------------------------"
5040 PRINT
5050 PRINT "0  HOME"
5060 PRINT "1  ABOUT ME"
5070 PRINT "2  PROJECTS"
5080 PRINT "3  SKILLS"
5090 PRINT "4  CONTACT"
5100 PRINT "6  EXIT"
5110 PRINT
5120 PRINT "--------------------------------"
5130 PRINT
5500 PRINT "SYSTEM: MARC'S PORTFOLIO"
5510 PRINT "INTERFACE: COMMODORE 64 INSPIRED"
5520 PRINT "LANGUAGE: BASIC V2"
5530 PRINT "RUNTIME: JAVASCRIPT"
5540 PRINT "PLATFORM: YOUR BROWSER"
5541 PRINT
5550 PRINT "THIS WEBSITE IS MORE THAN A"
5560 PRINT "RETRO-INSPIRED USER INTERFACE."
5570 PRINT "IT IS A SMALL EXPERIMENT IN"
5580 PRINT "BRINGING CLASSIC COMPUTING TO"
5590 PRINT "THE MODERN WEB."
5591 PRINT
5600 PRINT "THE COMMANDS MAY BE OLD, BUT"
5610 PRINT "THE CURIOSITY IS STILL ALIVE."
5611 PRINT
5620 PRINT "NO FLOPPY DISKS WERE HARMED"
5630 PRINT "IN THE MAKING OF THIS WEBSITE."
5631 PRINT
5640 PRINT "READY."
5641 PRINT
5900 INPUT "TYPE A NUMBER TO NAVIGATE."; A
5910 IF A=0 THEN 0
5920 IF A=1 THEN 1000
5930 IF A=2 THEN 2000
5940 IF A=3 THEN 3000
5950 IF A=4 THEN 4000
5960 IF A=6 THEN 6000
5970 GOTO 5900
6000 CLR
6010 EXIT
`,
  },
  P = `modulepreload`,
  F = function (e) {
    return `/` + e;
  },
  I = {},
  L = function (e) {
    return e.pathname.endsWith(`.css`);
  },
  R = function (e, t, n) {
    if (t in e) return e[t];
    let r = n();
    if (!r) {
      e[t] = void 0;
      return;
    }
    let i = r.then(
      () => {
        e[t] = void 0;
      },
      (n) => {
        throw ((e[t] = void 0), n);
      },
    );
    return ((e[t] = i), i);
  },
  z = function (e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e,
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        );
      }
      function s(e) {
        return import.meta.resolve ? new URL(import.meta.resolve(e)) : new URL(e, import.meta.url);
      }
      r = o(
        t
          .map((t) => {
            t = F(t, n);
            let r = s(t),
              i = L(r);
            return R(I, r.href, () => {
              if (e === void 0) {
                e = { all: new Set(), styles: new Set() };
                let t = document.getElementsByTagName(`link`);
                for (let n = t.length - 1; n >= 0; n--) {
                  let r = t[n];
                  (e.all.add(r.href), r.rel === `stylesheet` && e.styles.add(r.href));
                }
              }
              if ((i ? e.styles : e.all).has(r.href)) return;
              let t = document.createElement(`link`);
              if (
                ((t.rel = i ? `stylesheet` : P),
                i || (t.as = `script`),
                (t.crossOrigin = ``),
                (t.href = r.href),
                a && t.setAttribute(`nonce`, a),
                document.head.appendChild(t),
                i)
              )
                return new Promise((e, n) => {
                  (t.addEventListener(`load`, e),
                    t.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${r}`))));
                });
            });
          })
          .filter((e) => e !== void 0),
      );
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e;
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i);
    });
  };
async function B(e) {
  let t = e.trim().match(/^"([^"]+)"$/);
  if (!t) return { type: r.ERROR, value: null };
  let n = N[t[1].toLowerCase()];
  if (n === void 0) return { type: r.ERROR, value: null };
  let { dispatcher: i } = await z(async () => {
    let { dispatcher: e } = await import(`./dispatcher-B9i40hER.js`);
    return { dispatcher: e };
  }, []);
  m();
  for (let e of n.split(/\r?\n/)) e.trim() && i.dispatchCommand(e);
  return { type: r.DEFAULT, value: null };
}
async function V() {
  return { type: r.DEFAULT, value: null };
}
var H = (e) => new Promise((t) => setTimeout(t, e));
async function U() {
  if (!l.length) return { type: r.DEFAULT, value: null };
  let e = l.length;
  a.isInputEnabled = !1;
  try {
    for (let t = 0; t < e; t++) {
      let o = await l[t].fn(l[t].args),
        s = 10;
      if ((n.clearInput(), a.abortProgram))
        return ((a.abortProgram = !1), { type: r.DEFAULT, value: null });
      if (o.type === r.ERROR)
        return (n.outputLine(`?Syntax Error`), { type: r.ERROR, value: null });
      if ((o.type === r.GOTO && ((t = o.value - 1), (s = 0)), o.type === r.INPUT)) {
        ((a.activeInputMode = i.INPUTVAR), (a.isInputEnabled = !0));
        for (let e = 0; e < o.value.length; e++)
          try {
            await A(String(o.value[e].value));
          } catch {
            if (a.abortProgram) return ((a.abortProgram = !1), { type: r.DEFAULT, value: null });
            e--;
          }
        ((a.activeInputMode = i.PROMPT), (a.isInputEnabled = !1));
      }
      t < e - 1 && (await H(s));
    }
  } finally {
    ((a.activeInputMode = i.PROMPT), (a.isInputEnabled = !0));
  }
  return { type: r.DEFAULT, value: null };
}
var W = {
    clr: { args: `none`, fn: o },
    exit: { args: `none`, fn: s },
    get: { args: `required`, fn: c },
    goto: { args: `required`, fn: h },
    help: { args: `none`, fn: g },
    if: { args: `required`, fn: D },
    input: { args: `required`, fn: k },
    let: { args: `required`, fn: j },
    list: { args: `none`, fn: M },
    load: { args: `required`, fn: B },
    print: { args: `optional`, fn: E },
    rem: { args: `none`, fn: V },
    run: { args: `none`, fn: U },
  },
  G = [`or`, `and`, `then`];
function K() {
  function e(e) {
    let i = e.match(/^(\d+)(?:\s|$)/),
      a = i ? e.slice(i[0].length) : e;
    if (a === ``) {
      (i && f(Number(i[1])), n.resetInput(!1));
      return;
    }
    let o = t(a);
    if (!o || !o.valid) (n.outputLine(`?Syntax Error`), n.resetInput(!0));
    else if (i !== null) {
      let e = Number(i[1]),
        { name: t, fn: r, args: a } = o;
      (d({ lineNumber: e, name: t, fn: r, args: a }), n.resetInput(!1));
    } else
      o.fn(o.args)
        .then((e) => {
          (e.type === r.ERROR && n.outputLine(`?Syntax Error`), n.resetInput(!0));
        })
        .catch((e) => {
          (console.error(`Command execution failed:`, e), n.resetInput(!0));
        });
  }
  function t(e) {
    let t = e.indexOf(` `),
      n = e.slice(0, t === -1 ? void 0 : t).toLowerCase(),
      r = t === -1 ? `` : e.slice(t + 1);
    if (!i(n)) return !1;
    let a = W[n];
    return {
      valid:
        a.args === `optional` ||
        (a.args === `required` && r.trim() !== ``) ||
        (a.args === `none` && r.trim() === ``),
      name: n,
      fn: a.fn,
      args: r,
    };
  }
  function i(e) {
    return Object.prototype.hasOwnProperty.call(W, e);
  }
  return { dispatchCommand: e };
}
var q = K();
export { r as a, a as i, U as n, i as o, B as r, n as s, q as t };
