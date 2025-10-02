(function () {
  const form = document.querySelector('form');
  if (!form) return; // nothing to do

  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

  const firstName = form.querySelector('#firstName, [name="firstName"]');
  const lastName  = form.querySelector('#lastName, [name="lastName"]');
  const emailId   = form.querySelector('#emailId, [name="emailId"], input[type="email"]');
  const phone     = form.querySelector('#phoneNumber, [name="phoneNumber"]');
  const zipcode   = form.querySelector('#zipcode, [name="zipcode"]');
  const comments  = form.querySelector('#comments, [name="comments"], textarea');
  const titleRadios = Array.from(form.querySelectorAll('input[type="radio"][name="title"]'));
  const sourceChecks = Array.from(form.querySelectorAll('input[type="checkbox"][name="source"]'));

  function sanitizeAlnum(el) {
    if (!el) return;
    const before = el.value;
    el.value = before.replace(/[^a-z0-9 ]/gi, '');
  }

  
  function sanitizeDigitsAndDash(el) {
    if (!el) return;
    el.value = el.value.replace(/[^0-9-]/g, '');
  }
  function sanitizeDigits(el) {
    if (!el) return;
    el.value = el.value.replace(/\D/g, '');
  }

  
  function validateTitleGroup() {
    if (!titleRadios.length) return true;
    const anyChecked = titleRadios.some(r => r.checked);
    const anchor = titleRadios[0];
    anchor.setCustomValidity(anyChecked ? '' : 'Please select a title.');
    return anyChecked;
  }

  function validateSourceGroup() {
    if (!sourceChecks.length) return true; 
    const anyChecked = sourceChecks.some(c => c.checked);
    const anchor = sourceChecks[0];
    
    anchor.setCustomValidity(anyChecked ? '' : 'Select at least one option.');
    return anyChecked;
  }

  
  function validatePhone() {
    if (!phone) return true;
    sanitizeDigitsAndDash(phone);
    const v = phone.value.trim();
    const ok = /^\d{3}-\d{3}-\d{4}$/.test(v);
    const required = phone.hasAttribute('required');
    phone.setCustomValidity((v || required) && !ok ? 'Use xxx-xxx-xxxx.' : '');
    return !phone.validationMessage;
  }

  function validateZip() {
    if (!zipcode) return true;
    sanitizeDigits(zipcode);
    const v = zipcode.value.trim();
    const ok = /^\d{6}$/.test(v);
    const required = zipcode.hasAttribute('required');
    zipcode.setCustomValidity((v || required) && !ok ? 'Zip must be 6 digits.' : '');
    return !zipcode.validationMessage;
  }

  function validateNames() {
    
    if (firstName) {
      sanitizeAlnum(firstName);
      const v = firstName.value.trim();
      const required = firstName.hasAttribute('required');
      const min = +(firstName.getAttribute('minlength') || 2);
      const max = +(firstName.getAttribute('maxlength') || 30);
      let msg = '';
      if ((v || required) && v.length < min) msg = `First name must be at least ${min} characters.`;
      else if (v.length > max) msg = `First name must be at most ${max} characters.`;
      firstName.setCustomValidity(msg);
    }
    if (lastName) {
      sanitizeAlnum(lastName);
      const v = lastName.value.trim();
      const required = lastName.hasAttribute('required');
      const min = +(lastName.getAttribute('minlength') || 2);
      const max = +(lastName.getAttribute('maxlength') || 30);
      let msg = '';
      if ((v || required) && v.length < min) msg = `Last name must be at least ${min} characters.`;
      else if (v.length > max) msg = `Last name must be at most ${max} characters.`;
      lastName.setCustomValidity(msg);
    }
    return (!firstName || !firstName.validationMessage) &&
           (!lastName  || !lastName.validationMessage);
  }

  function validateComments() {
    if (!comments) return true;
    const v = comments.value.trim();
    const required = comments.hasAttribute('required');
    const min = +(comments.getAttribute('minlength') || 10);
    const max = +(comments.getAttribute('maxlength') || 500);
    let msg = '';
    if ((v || required) && v.length < min) msg = `Comments must be at least ${min} characters.`;
    else if (v.length > max) msg = `Comments must be at most ${max} characters.`;
    comments.setCustomValidity(msg);
    return !comments.validationMessage;
  }

  function validateAll() {
    validateTitleGroup();
    validateSourceGroup();
    validateNames();
    validatePhone();
    validateZip();
    validateComments();

    
    const allGood = form.checkValidity();

    if (submitBtn) submitBtn.disabled = !allGood;
    return allGood;
  }

  const onChange = () => validateAll();

  
  [firstName, lastName, emailId, phone, zipcode, comments]
    .filter(Boolean)
    .forEach(el => {
      el.addEventListener('input', onChange);
      el.addEventListener('blur', onChange);
    });

  titleRadios.forEach(r => r.addEventListener('change', onChange));
  sourceChecks.forEach(c => c.addEventListener('change', onChange));

  // Block submit if something invalid; show native messages
  form.addEventListener('submit', function (e) {
    if (!validateAll()) {
      e.preventDefault();
      form.reportValidity(); // shows the relevant message without adding HTML
    }
  });

  // Initial state
  validateAll();
})();