import { a as e, i as t, n, o as r, r as i, s as a, t as o } from "./dispatcher-D_tcSaMo.js";
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      (t.credentials =
        e.crossOrigin === `use-credentials`
          ? `include`
          : e.crossOrigin === `anonymous`
            ? `omit`
            : `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var s = [
  {
    keys: [`control`, `c`],
    action: () => {
      ((t.abortProgram = !0), a.input.dispatchEvent(new Event(`cancelInput`)));
    },
  },
];
function c() {
  let e = new Set();
  (a.input.addEventListener(`keydown`, (n) => {
    let i = n.key.toLowerCase();
    if ((e.add(i), !t.isInputEnabled || t.activeInputMode === r.INPUTVAR)) {
      let r = s.find(({ keys: t }) => t.length === e.size && t.every((t) => e.has(t)));
      r ? (n.preventDefault(), r.action()) : t.isInputEnabled || n.preventDefault();
    }
  }),
    a.input.addEventListener(`keyup`, (t) => {
      e.delete(t.key.toLowerCase());
    }),
    window.addEventListener(`blur`, () => {
      e.clear();
    }));
}
function l() {
  let { input: e } = a;
  ((e.size = Math.max(e.value.length, 1)), (e.style.width = e.value.length === 0 ? `0px` : `auto`));
}
function u() {
  let e = a.input.value.trim();
  (a.clearInput(), a.outputLine(e), o.dispatchCommand(e));
}
function d() {
  let { input: e } = a;
  (e.addEventListener(`input`, l),
    e.addEventListener(`blur`, () => {
      e.focus();
    }),
    e.addEventListener(`keydown`, (e) => {
      t.isInputEnabled
        ? e.key === `Enter` && (e.preventDefault(), t.activeInputMode === r.PROMPT && u())
        : e.preventDefault();
    }));
}
var f = {
  initialize() {
    (d(), c());
  },
};
async function p() {
  (await i(`"website"`)).type !== e.ERROR && (await n());
}
(f.initialize(), a.resetInput(!0), await p());
