/* ==========================================================================
   imdtho — contact form
   Validates, then POSTs the submission to a Google Sheet via a Google Apps
   Script Web App. See assets/backend/google-apps-script.gs for the backend
   and the step-by-step setup at the bottom of that file.

   >>> ONE THING TO CONFIGURE: paste your deployed Web App URL below. <<<
   Until then the form runs in "stub" mode: it validates and shows success,
   but only logs the payload to the console (nothing is sent).
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    // Paste the "/exec" URL from your Apps Script deployment here:
    endpoint: "https://script.google.com/macros/s/AKfycbytMlbNptfAnONfHEi7_MLLE7wgtBolXGwvD87sdY0P2Vp3SOLNPwuhj_Q2vrvO4Msu/exec"
  };

  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("submit-btn");
  var btnLabel = submitBtn.querySelector(".btn__label");

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var RULES = {
    name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
    email: function (v) { return EMAIL_RE.test(v.trim()) ? "" : "Please enter a valid email address."; },
    role: function (v) { return v ? "" : "Please choose one."; },
    message: function (v) { return v.trim().length >= 10 ? "" : "A little more detail, please (10+ characters)."; }
  };

  function setFieldError(name, msg) {
    var input = form.elements[name];
    var field = input.closest(".field");
    var errEl = document.getElementById(name + "-error");
    field.setAttribute("data-invalid", msg ? "true" : "false");
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (errEl) errEl.textContent = msg;
    return !msg;
  }

  function validate() {
    var firstInvalid = null;
    Object.keys(RULES).forEach(function (name) {
      var ok = setFieldError(name, RULES[name](form.elements[name].value));
      if (!ok && !firstInvalid) firstInvalid = form.elements[name];
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  // Clear a field's error as the user fixes it.
  Object.keys(RULES).forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener("input", function () {
      if (input.closest(".field").getAttribute("data-invalid") === "true") {
        setFieldError(name, RULES[name](input.value));
      }
    });
  });

  function showStatus(kind, msg) {
    statusEl.className = "form__status is-visible form__status--" + kind;
    statusEl.textContent = msg;
  }

  function setSending(sending) {
    submitBtn.disabled = sending;
    btnLabel.textContent = sending ? "Sending…" : "Send message";
  }

  function payload() {
    return {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      role: form.elements.role.value,
      message: form.elements.message.value.trim(),
      submittedAt: new Date().toISOString(),
      source: "imdtho.com/contact"
    };
  }

  function onSuccess() {
    form.reset();
    Object.keys(RULES).forEach(function (name) { setFieldError(name, ""); });
    showStatus("success", "Thanks — your message is in. We’ll get back to you within a day or two.");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      showStatus("error", "Please fix the highlighted fields and try again.");
      return;
    }

    var data = payload();
    setSending(true);

    // Stub mode — no endpoint configured yet.
    if (!CONFIG.endpoint) {
      // eslint-disable-next-line no-console
      console.warn("[imdtho] Contact form is in STUB mode (no endpoint set). Payload:", data);
      setSending(false);
      onSuccess();
      return;
    }

    // Google Apps Script Web Apps don't return CORS headers, so we send as a
    // "simple" request (text/plain, no preflight) with no-cors. The row still
    // lands in the Sheet; we can't read the response, so we treat a resolved
    // fetch as success and a thrown fetch (e.g. offline) as failure.
    fetch(CONFIG.endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    })
      .then(function () {
        setSending(false);
        onSuccess();
      })
      .catch(function () {
        setSending(false);
        showStatus("error", "Something went wrong sending your message. Please email hello@imdtho.com instead.");
      });
  });
})();
