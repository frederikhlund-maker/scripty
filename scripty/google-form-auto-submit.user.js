// ==UserScript==
// @name         Google Form Auto-Submit
// @namespace    http://tampermonkey.net/
// @version      4.2
// @description  Auto-fill and submit a Google Form as fast as the browser allows.
// @author       You
// @match        *://docs.google.com/forms/*
// @include      /^https?:\/\/docs\.google\.com\/forms\/.*/
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  // ╔════════════════════════════════════════════════════════════════╗
  // ║  SETTINGS                                                      ║
  // ╠════════════════════════════════════════════════════════════════╣
  // ║  WHAT_TO_WRITE : The text submitted each time                  ║
  // ║  ENABLED       : true = running, false = off                   ║
  // ╚════════════════════════════════════════════════════════════════╝

  var WHAT_TO_WRITE = 'jordan belfort';
  var ENABLED = true;

  if (!ENABLED || !WHAT_TO_WRITE) return;

  var href = location.href;
  var isForm = href.indexOf('/viewform') !== -1;
  var isConfirm = href.indexOf('/formResponse') !== -1;

  if (!isForm && !isConfirm) return;

  // On confirmation page: navigate back to form ASAP
  if (isConfirm) {
    var back = href.replace(/\/formResponse.*/, '/viewform');
    location.replace(back);
    return;
  }

  // On form page: poll for the form element, fill + submit the instant it exists
  var poll = setInterval(function () {
    var form = document.querySelector('form');
    if (!form) return;

    var entries = form.querySelectorAll('input[name^="entry."]');
    if (!entries.length) return;

    clearInterval(poll);

    // Fill hidden entry fields
    for (var i = 0; i < entries.length; i++) {
      entries[i].value = WHAT_TO_WRITE;
    }

    // Fill visible inputs
    var visible = form.querySelectorAll('input.whsOnd, input[type="text"], textarea');
    for (var j = 0; j < visible.length; j++) {
      if (visible[j].type === 'hidden') continue;
      try {
        var s = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
        if (s && s.set) s.set.call(visible[j], WHAT_TO_WRITE);
        else visible[j].value = WHAT_TO_WRITE;
      } catch (e) { visible[j].value = WHAT_TO_WRITE; }
      visible[j].dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Click submit
    var btns = document.querySelectorAll('[role="button"]');
    for (var k = 0; k < btns.length; k++) {
      var t = (btns[k].textContent || '').trim().toLowerCase();
      if (t === 'submit' || t === 'enviar') { btns[k].click(); return; }
    }
    var sub = form.querySelector('[type="submit"]');
    if (sub) sub.click();
    else form.submit();
  }, 10);
})();
