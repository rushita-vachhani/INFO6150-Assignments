// form-validation.js — with "show after first blur" + fixed group clearing
document.addEventListener('DOMContentLoaded', function () {
  // Inject minimal CSS once
  (function injectErrorStyles(){
    if (document.getElementById('js-inline-error-style')) return;
    const style = document.createElement('style');
    style.id = 'js-inline-error-style';
    style.textContent = `
      .js-error{color:#b00020;font-size:.9em;margin-top:4px}
      .invalid{outline:2px solid #b00020;outline-offset:1px}
    `;
    document.head.appendChild(style);
  })();

  // Form + fields
  const form = document.querySelector('form');
  if (!form) return;

  const submitBtn = form.querySelector('input[type="submit"]');
  const resetBtn  = form.querySelector('input[type="reset"]');

  const titleRadios = Array.from(form.querySelectorAll('input[name="title"]'));
  const firstName   = document.getElementById('firstName');
  const lastName    = document.getElementById('lastName');
  const emailId     = document.getElementById('emailId');
  const phone       = document.getElementById('phoneNumber');
  const zipcode     = document.getElementById('zipcode');
  const comments    = document.getElementById('comments');
  const sources     = Array.from(form.querySelectorAll('input[name="source"]'));

  // Rules
  const NAME_MIN = 2,  NAME_MAX = 30;
  const CMNT_MIN = 10, CMNT_MAX = 500;

  const EMAIL_NEU = /^[a-z0-9._%+-]+@northeastern\.edu$/i;
  const PHONE_FMT = /^\(\d{3}\)\s\d{3}-\d{4}$/;
  const ZIP_6     = /^\d{6}$/; // change to 6 digits if you need

  // ------------------------------------------------------------------
  // "Show message after first blur" support
  // ------------------------------------------------------------------
  const touched = new Set();          // field keys that have blurred at least once
  let showAllErrors = false;          // becomes true on submit attempt
  const KEYS = {
    title: 'group:title',
    sources: 'group:sources',
    firstName: firstName?.id || 'firstName',
    lastName:  lastName?.id  || 'lastName',
    emailId:   emailId?.id   || 'emailId',
    phone:     phone?.id     || 'phoneNumber',
    zipcode:   zipcode?.id   || 'zipcode',
    comments:  comments?.id  || 'comments'
  };
  const markTouched = k => touched.add(k);
  const shouldShow  = k => showAllErrors || touched.has(k);

  // ------------------------------------------------------------------
  // Inline error helpers (no HTML edits)
  // ------------------------------------------------------------------
  function ensureErrorAfter(target){
    if (!target) return null;
    let id = target.dataset.errId;
    let holder = id ? document.getElementById(id) : null;
    if (!holder) {
      holder = document.createElement('div');
      holder.className = 'js-error';
      holder.id = 'err-' + Math.random().toString(36).slice(2,9);
      target.after(holder);
      target.dataset.errId = holder.id; // store on the *target we place after*
    }
    return holder;
  }

  // note: pass the element that should get the red outline as `el`,
  // and the element after which the text should appear as `holderTarget`
  function setError(el, msg, holderKey, holderTarget){
    // only show text/outline if user has interacted with this field/group
    if (shouldShow(holderKey)) {
      const holder = ensureErrorAfter(holderTarget || el);
      if (holder) holder.textContent = msg || '';
      el?.classList?.add('invalid');
      el?.setAttribute?.('aria-invalid','true');
    } else {
      // keep the validity state, but don't show visuals yet
      clearError(el, holderTarget);
    }
  }

  function clearError(el, holderTarget){
    const target = holderTarget || el;
    if (target?.dataset?.errId) {
      const holder = document.getElementById(target.dataset.errId);
      if (holder) holder.textContent = '';
    }
    el?.classList?.remove('invalid');
    el?.removeAttribute?.('aria-invalid');
  }

  // ------------------------------------------------------------------
  // Step 1: required checks (with proper group targeting)
  // ------------------------------------------------------------------
  function requireRadioGroup(radios, msg){
    const ok = radios.some(r => r.checked);
    const holderTarget = radios[radios.length - 1]; // place error after the last radio
    if (!ok && radios[0]) {
      setError(radios[0], msg, KEYS.title, holderTarget);
    } else if (radios[0]) {
      clearError(radios[0], holderTarget); // <-- clear using the same holder target
    }
    radios[0]?.setCustomValidity(ok ? '' : msg);
    return ok;
  }

  function requireAtLeastOne(checkboxes, msg){
    const ok = checkboxes.some(c => c.checked);
    const holderTarget = checkboxes[checkboxes.length - 1]; // place after last checkbox
    if (!ok && checkboxes[0]) {
      setError(checkboxes[0], msg, KEYS.sources, holderTarget);
    } else if (checkboxes[0]) {
      clearError(checkboxes[0], holderTarget); // <-- clear properly
    }
    checkboxes[0]?.setCustomValidity(ok ? '' : msg);
    return ok;
  }

  // function requireText(el, label, key){
  //   if (!el) return true;
  //   const v = (el.value || '').trim();
  //   const ok = !!v;
  //   if (!ok) setError(el, `${label} is required.`, key, el);
  //   else     clearError(el, el);
  //   el.setCustomValidity(ok ? '' : `${label} is required.`);
  //   return ok;
  // }

  // ------------------------------------------------------------------
  // Step 2: names + comments
  // ------------------------------------------------------------------
  function sanitizeAlnum(el){ if (el) el.value = el.value.replace(/[^a-z0-9 ]/gi, ''); }

  function validateName(el, label, key){
    if (!el) return true;
    sanitizeAlnum(el);
    const v = (el.value || '').trim();
    let msg = '';
    if (!v) msg = `${label} is required.`;
    else if (v.length < NAME_MIN) msg = `${label} must be at least ${NAME_MIN} characters.`;
    else if (v.length > NAME_MAX) msg = `${label} must be at most ${NAME_MAX} characters.`;

    if (msg){ setError(el, msg, key, el); el.setCustomValidity(msg); return false; }
    clearError(el, el); el.setCustomValidity(''); return true;
  }

  function validateComments(){
    if (!comments) return true;
    const v = (comments.value || '').trim();
    let msg = '';
    if (!v) msg = 'Comments are required.';
    else if (v.length < CMNT_MIN) msg = `Comments must be at least ${CMNT_MIN} characters.`;
    else if (v.length > CMNT_MAX) msg = `Comments must be at most ${CMNT_MAX} characters.`;

    if (msg){ setError(comments, msg, KEYS.comments, comments); comments.setCustomValidity(msg); return false; }
    clearError(comments, comments); comments.setCustomValidity(''); return true;
  }

  // ------------------------------------------------------------------
  // Step 3: email / phone / zip (masking + regex)
  // ------------------------------------------------------------------
  function validateEmail(){
    if (!emailId) return true;
    const v = (emailId.value || '').trim();
    let msg = '';
    if (!v) msg = 'Email is required.';
    else if (!EMAIL_NEU.test(v)) msg = 'Use your @northeastern.edu email.';

    if (msg){ setError(emailId, msg, KEYS.emailId, emailId); emailId.setCustomValidity(msg); return false; }
    clearError(emailId, emailId); emailId.setCustomValidity(''); return true;
  }

  function maskPhoneOnInput(){
    if (!phone) return;
    let d = phone.value.replace(/\D/g,'').slice(0,10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0,3)}) ${d.slice(3)}`;
    else if (d.length > 0) out = `(${d}`;
    phone.value = out;
  }
  function validatePhone(){
    if (!phone) return true;
    const v = (phone.value || '').trim();
    let msg = '';
    if (!v) msg = 'Phone Number is required.';
    else if (!PHONE_FMT.test(v)) msg = 'Format must be (XXX) XXX-XXXX.';

    if (msg){ setError(phone, msg, KEYS.phone, phone); phone.setCustomValidity(msg); return false; }
    clearError(phone, phone); phone.setCustomValidity(''); return true;
  }

  function cleanZipOnInput(){ if (zipcode) zipcode.value = zipcode.value.replace(/\D/g,'').slice(0,5); }
  function validateZip(){
    if (!zipcode) return true;
    const v = (zipcode.value || '').trim();
    let msg = '';
    if (!v) msg = 'ZipCode is required.';
    else if (!ZIP_6.test(v)) msg = 'Zip must be exactly 6 digits.'; // switch to 6 if needed

    if (msg){ setError(zipcode, msg, KEYS.zipcode, zipcode); zipcode.setCustomValidity(msg); return false; }
    clearError(zipcode, zipcode); zipcode.setCustomValidity(''); return true;
  }

  // Master validator
  function validateAll(){
    const ok =
      requireRadioGroup(titleRadios, 'Please select a title.') &
      validateName(firstName, 'First Name', KEYS.firstName) &
      validateName(lastName,  'Last Name',  KEYS.lastName) &
      validateEmail() &
      validatePhone() &
      validateZip() &
      requireAtLeastOne(sources, 'Select at least one source.') &
      validateComments();

    const allValid = !!ok && form.checkValidity();
    if (submitBtn) submitBtn.disabled = !allValid;
    return allValid;
  }

  // ---------------- Event wiring ----------------
  // input/change keeps submit button state live; errors show only after first blur
  [firstName, lastName, comments].forEach(el => {
    if (!el) return;
    el.addEventListener('input', validateAll);
    el.addEventListener('blur',  () => { markTouched(el.id); validateAll(); });
  });

  if (emailId){
    emailId.addEventListener('input', validateAll);
    emailId.addEventListener('blur',  () => { markTouched(emailId.id); validateAll(); });
  }

  if (phone){
    phone.addEventListener('input', () => { maskPhoneOnInput(); validateAll(); });
    phone.addEventListener('blur',  () => { markTouched(phone.id); validateAll(); });
  }

  if (zipcode){
    zipcode.addEventListener('input', () => { cleanZipOnInput(); validateAll(); });
    zipcode.addEventListener('blur',  () => { markTouched(zipcode.id); validateAll(); });
  }

  // Groups: mark as touched on first interaction; clear messages when valid
  titleRadios.forEach(r => r.addEventListener('change', () => { markTouched(KEYS.title); validateAll(); }));
  sources.forEach(c => c.addEventListener('change', () => { markTouched(KEYS.sources); validateAll(); }));

  // Submit gate: now we want everything visible
  form.addEventListener('submit', (e) => {
    showAllErrors = true; // reveal messages for anything still invalid
    if (!validateAll()) {
      e.preventDefault();
      form.reportValidity(); // native tooltip as a fallback
    }
  });

  // Reset: clear messages/masks and disable submit
  if (resetBtn){
    resetBtn.addEventListener('click', () => {
      setTimeout(() => {
        touched.clear();
        showAllErrors = false;
        // clear custom validity + inline visuals
        const holderTargetRadios   = titleRadios[titleRadios.length - 1];
        const holderTargetSources  = sources[sources.length - 1];
        if (titleRadios[0]) clearError(titleRadios[0], holderTargetRadios);
        if (sources[0])     clearError(sources[0],     holderTargetSources);
        [firstName,lastName,emailId,phone,zipcode,comments].forEach(el => {
          if (!el) return;
          el.setCustomValidity('');
          clearError(el, el);
        });
        titleRadios.forEach(el => el.setCustomValidity(''));
        sources.forEach(el => el.setCustomValidity(''));
        if (phone)   phone.value = '';
        if (zipcode) zipcode.value = '';
        if (submitBtn) submitBtn.disabled = true;
      });
    });
  }

  // Initial state
  if (submitBtn) submitBtn.disabled = true;
  validateAll();
});
