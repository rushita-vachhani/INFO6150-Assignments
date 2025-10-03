document.addEventListener('DOMContentLoaded', function () {
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

  // === Limits (Step 2) ===
  const NAME_MIN = 2,  NAME_MAX = 30;
  const CMNT_MIN = 2, CMNT_MAX = 500;

  // --- Not-null validators (Step 1) ---
  function requireRadioGroup(radios, msg) {
    const ok = radios.some(r => r.checked);
    if (radios[0]) radios[0].setCustomValidity(ok ? '' : msg);
    return ok;
  }

  function requireText(el, label) {
    if (!el) return true;
    const v = (el.value || '').trim();
    el.setCustomValidity(v ? '' : `${label} is required.`);
    return !!v;
  }

  function requireAtLeastOne(checkboxes, msg) {
    const ok = checkboxes.some(c => c.checked);
    if (checkboxes[0]) checkboxes[0].setCustomValidity(ok ? '' : msg);
    return ok;
  }

  // --- Step 2: sanitize + min/max ---
  function sanitizeAlnum(el) {
    if (!el) return;
    el.value = el.value.replace(/[^a-z0-9 ]/gi, '');
  }

  function validateName(el, label) {
    if (!el) return true;
    sanitizeAlnum(el);
    const v = (el.value || '').trim();

    if (!v) { el.setCustomValidity(`${label} is required.`); return false; }
    if (v.length < NAME_MIN) { el.setCustomValidity(`${label} must be at least ${NAME_MIN} characters.`); return false; }
    if (v.length > NAME_MAX) { el.setCustomValidity(`${label} must be at most ${NAME_MAX} characters.`); return false; }

    el.setCustomValidity('');
    return true;
  }

  function validateComments() {
    if (!comments) return true;
    const v = (comments.value || '').trim();

    if (!v) { comments.setCustomValidity('Comments are required.'); return false; }
    if (v.length < CMNT_MIN) { comments.setCustomValidity(`Comments must be at least ${CMNT_MIN} characters.`); return false; }
    if (v.length > CMNT_MAX) { comments.setCustomValidity(`Comments must be at most ${CMNT_MAX} characters.`); return false; }

    comments.setCustomValidity('');
    return true;
  }

  // Validate everything (Step 1 + Step 2)
  function validateAll() {
    const ok =
      requireRadioGroup(titleRadios, 'Please select a title.') &
      validateName(firstName, 'First Name') &
      validateName(lastName, 'Last Name') &
      requireText(emailId, 'Email') &
      requireText(phone, 'Phone Number') &
      requireText(zipcode, 'ZipCode') &
      requireAtLeastOne(sources, 'Select at least one source.') &
      validateComments();

    const allValid = !!ok && form.checkValidity();
    if (submitBtn) submitBtn.disabled = !allValid;
    return allValid;
  }

  // Live validation
  [firstName,lastName,emailId,phone,zipcode,comments].forEach(el => {
    if (!el) return;
    el.addEventListener('input', validateAll);
    el.addEventListener('blur', validateAll);
  });
  titleRadios.forEach(r => r.addEventListener('change', validateAll));
  sources.forEach(c => c.addEventListener('change', validateAll));

  // Submit check
  form.addEventListener('submit', (e) => {
    if (!validateAll()) {
      e.preventDefault();
      form.reportValidity();
    }
  });

  // Reset: clear messages + disable submit
  resetBtn?.addEventListener('click', () => {
    setTimeout(() => {
      titleRadios.forEach(el => el.setCustomValidity(''));
      sources.forEach(el => el.setCustomValidity(''));
      [firstName,lastName,emailId,phone,zipcode,comments].forEach(el => el?.setCustomValidity(''));
      if (submitBtn) submitBtn.disabled = true;
    });
  });

  // Initial disable
  if (submitBtn) submitBtn.disabled = true;
});
