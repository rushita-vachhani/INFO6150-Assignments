document.addEventListener('DOMContentLoaded', function () {
  // --- Form + Fields ---
  const form = document.querySelector('form');
  if (!form) return;

  const submitBtn = form.querySelector('input[type="submit"]');
  const resetBtn = form.querySelector('input[type="reset"]');

  const titleRadios = Array.from(form.querySelectorAll('input[name="title"]'));
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const emailId = document.getElementById('emailId');
  const phone = document.getElementById('phoneNumber');
  const zipcode = document.getElementById('zipcode');
  const comments = document.getElementById('comments');
  const sources = Array.from(form.querySelectorAll('input[name="source"]'));

  // NEW FIELDS
  const address2 = document.getElementById('address2');
  const address2Counter = document.getElementById('address2Counter');
  const drinksSelect = document.getElementById('drinks');
  const dynamicContentContainer = document.getElementById('dynamicContentContainer');

  // --- Rules ---
  const NAME_MIN = 2, NAME_MAX = 30;
  const CMNT_MIN = 10, CMNT_MAX = 500;
  const EMAIL_NEU = /^[a-z0-9._%+-]+@northeastern\.edu$/i; // Requirement 21
  const PHONE_FMT = /^\(\d{3}\)\s\d{3}-\d{4}$/; // Requirement 9, 26
  const ZIP_6 = /^\d{6}$/; // Based on your placeholder

  // --- First-blur Gating ---
  const touched = new Set();
  let showAllErrors = false;
  const KEYS = {
    title: 'group:title',
    sources: 'group:sources',
    firstName: firstName?.id || 'firstName',
    lastName: lastName?.id || 'lastName',
    emailId: emailId?.id || 'emailId',
    phone: phone?.id || 'phoneNumber',
    zipcode: zipcode?.id || 'zipcode',
    comments: comments?.id || 'comments',
    drinks: drinksSelect?.id || 'drinks',
    address2: address2?.id || 'address2',
    upgradeDetails: 'upgradeDetails'
  };
  const markTouched = k => touched.add(k);
  const shouldShow = k => showAllErrors || touched.has(k);

  // --- Inline Error Helpers ---
  function ensureErrorAfter(target) {
    if (!target) return null;
    let next = target.nextElementSibling;
    // Find the pre-created error holder or insert one if missing (layout stabilization)
    if (next && next.classList?.contains('js-error')) {
      return next;
    }
    // Fallback if structure is wrong
    let holder = document.createElement('div');
    holder.className = 'js-error';
    target.after(holder);
    return holder;
  }
  function setError(el, msg, key, holderTarget) {
    const target = holderTarget || el;
    if (shouldShow(key)) {
      const holder = ensureErrorAfter(target);
      if (holder) holder.textContent = msg || '\u00A0';
      el?.classList?.add('invalid');
      el?.setAttribute?.('aria-invalid', 'true');
    } else {
      clearError(el, target);
    }
  }
  function clearError(el, holderTarget) {
    const target = holderTarget || el;
    const holder = target.nextElementSibling;
    if (holder && holder.classList?.contains('js-error')) {
      holder.textContent = '\u00A0'; // Keep height, prevent layout jump
    }
    el?.classList?.remove('invalid');
    el?.removeAttribute?.('aria-invalid');
  }

  // --- Validators ---
  function requireRadioGroup(radios, msg) {
    const ok = radios.some(r => r.checked);
    const holderTarget = radios[radios.length - 1];
    if (!ok && radios[0]) setError(radios[0], msg, KEYS.title, holderTarget);
    else if (radios[0]) clearError(radios[0], holderTarget);
    radios[0]?.setCustomValidity(ok ? '' : msg);
    return ok;
  }
  function requireAtLeastOne(checkboxes, msg) {
    const ok = checkboxes.some(c => c.checked);
    const holderTarget = checkboxes[checkboxes.length - 1];
    if (!ok && checkboxes[0]) setError(checkboxes[0], msg, KEYS.sources, holderTarget);
    else if (checkboxes[0]) clearError(checkboxes[0], holderTarget);
    checkboxes[0]?.setCustomValidity(ok ? '' : msg);
    return ok;
  }
  function sanitizeAlnum(el) { if (el) el.value = el.value.replace(/[^a-z0-9 ]/gi, ''); } // Requirement 7
  function validateName(el, label, key) {
    if (!el) return true;
    sanitizeAlnum(el);
    const v = (el.value || '').trim();
    let msg = '';
    if (!v) msg = `${label} is required.`;
    else if (v.length < NAME_MIN) msg = `${label} must be at least ${NAME_MIN} characters.`;
    else if (v.length > NAME_MAX) msg = `${label} must be at most ${NAME_MAX} characters.`;
    if (msg) { setError(el, msg, key, el); el.setCustomValidity(msg); return false; }
    clearError(el, el); el.setCustomValidity(''); return true;
  }
  function validateComments() {
    if (!comments) return true;
    const v = (comments.value || '').trim();
    let msg = '';
    if (!v) msg = 'Comments are required.';
    else if (v.length < CMNT_MIN) msg = `Comments must be at least ${CMNT_MIN} characters.`;
    else if (v.length > CMNT_MAX) msg = `Comments must be at most ${CMNT_MAX} characters.`;
    if (msg) { setError(comments, msg, KEYS.comments, comments); comments.setCustomValidity(msg); return false; }
    clearError(comments, comments); comments.setCustomValidity(''); return true;
  }
  function validateEmail() {
    if (!emailId) return true;
    const v = (emailId.value || '').trim();
    let msg = '';
    if (!v) msg = 'Email is required.';
    else if (!EMAIL_NEU.test(v)) msg = 'Use your @northeastern.edu email.';
    if (msg) { setError(emailId, msg, KEYS.emailId, emailId); emailId.setCustomValidity(msg); return false; }
    clearError(emailId, emailId); emailId.setCustomValidity(''); return true;
  }
  function maskPhoneOnInput() {
    if (!phone) return;
    let d = phone.value.replace(/\D/g, '').slice(0, 10);
    let out = d;
    if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
    else if (d.length > 0) out = `(${d}`;
    phone.value = out;
  }
  function validatePhone() {
    if (!phone) return true;
    const v = (phone.value || '').trim();
    let msg = '';
    if (!v) msg = 'Phone Number is required.';
    else if (!PHONE_FMT.test(v)) msg = 'Format must be (XXX) XXX-XXXX.';
    if (msg) { setError(phone, msg, KEYS.phone, phone); phone.setCustomValidity(msg); return false; }
    clearError(phone, phone); phone.setCustomValidity(''); return true;
  }
  function cleanZipOnInput() { if (zipcode) zipcode.value = zipcode.value.replace(/\D/g, '').slice(0, 6); }
  function validateZip() {
    if (!zipcode) return true;
    const v = (zipcode.value || '').trim();
    let msg = '';
    if (!v) msg = 'ZipCode is required.';
    else if (!ZIP_6.test(v)) msg = 'Zip must be exactly 6 digits.';
    if (msg) { setError(zipcode, msg, KEYS.zipcode, zipcode); zipcode.setCustomValidity(msg); return false; }
    clearError(zipcode, zipcode); zipcode.setCustomValidity(''); return true;
  }

  // --- NEW FIELD VALIDATORS ---
  function validateDrinksSelect() {
    if (!drinksSelect) return true;
    const ok = !!drinksSelect.value;
    const msg = 'Please select a drink.';
    if (!ok) setError(drinksSelect, msg, KEYS.drinks, drinksSelect);
    else clearError(drinksSelect, drinksSelect);
    drinksSelect.setCustomValidity(ok ? '' : msg);
    return ok;
  }

  function validateDynamicTextField() { // Requirement 17
    const textField = document.getElementById('upgradeDetails');
    const upgradeCheck = document.getElementById('drinkUpgradeCheck');
    if (!textField || !upgradeCheck?.checked) return true; // Only validate if checkbox is checked

    const msg = 'Special Request is required when Large drink is selected.';
    const ok = !!textField.value.trim();

    if (!ok) { setError(textField, msg, KEYS.upgradeDetails, textField); textField.setCustomValidity(msg); return false; }
    clearError(textField, textField); textField.setCustomValidity(''); return true;
  }

  function validateAll() {
    // Note: address2 is omitted from validation as it is not mandatory (Requirement 22)
    const ok =
      requireRadioGroup(titleRadios, 'Please select a title.') &
      validateName(firstName, 'First Name', KEYS.firstName) &
      validateName(lastName, 'Last Name', KEYS.lastName) &
      validateEmail() &
      validatePhone() &
      validateZip() &
      validateDrinksSelect() & // New Check
      validateDynamicTextField() & // New Check
      requireAtLeastOne(sources, 'Select at least one source.') &
      validateComments();

    const allValid = !!ok && form.checkValidity();
    if (submitBtn) submitBtn.disabled = !allValid; // Requirement 3, 8
    return allValid;
  }

  // --- Dynamic Content Handlers ---
  function handleDrinkSelection() { // Requirement 12, 13
    dynamicContentContainer.innerHTML = ''; // Clear previous
    const selectedDrink = drinksSelect.value;
    const selectedOption = drinksSelect.options[drinksSelect.selectedIndex];
    const selectedDrinkName = selectedOption ? selectedOption.textContent : '';

    if (selectedDrink) {
        // Create Checkbox (Example Requirement 16)
        dynamicContentContainer.innerHTML = `
            <div class="select-upgrade-group">
                <input type="checkbox" id="drinkUpgradeCheck" name="drinkUpgradeCheck" value="large" />
                <label for="drinkUpgradeCheck">Large drink (75¢ extra) for ${selectedDrinkName}</label>
            </div>
            <div id="upgradeTextHost"></div>
            <div class="js-error" id="err-upgradeDetails-host">&nbsp;</div>
        `;
        
        const upgradeCheck = document.getElementById('drinkUpgradeCheck');
        const upgradeTextHost = document.getElementById('upgradeTextHost');
        const upgradeErrorHost = document.getElementById('err-upgradeDetails-host');

        upgradeCheck.addEventListener('change', () => {
            upgradeTextHost.innerHTML = ''; // Clear previous content
            if (upgradeCheck.checked) {
                // Create mandatory text field (Requirement 17)
                upgradeTextHost.innerHTML = `
                    <label for="upgradeDetails" style="width: auto; margin-top: 10px;">Special Request*:</label>
                    <input type="text" id="upgradeDetails" required placeholder="e.g., Extra sugar" />
                `;
                // Wire validation event
                const textField = document.getElementById('upgradeDetails');
                textField.addEventListener('input', validateAll);
                textField.addEventListener('blur', () => { markTouched(KEYS.upgradeDetails); validateAll(); });
            }
            validateAll(); // Re-validate the entire form
        });
        
        // Ensure error holder for checkbox group is initialized
        upgradeCheck.dataset.errId = upgradeErrorHost.id;
    }
    validateAll(); 
  }
  if (drinksSelect) drinksSelect.addEventListener('change', handleDrinkSelection);

  // Live Character Counter (Requirement 31, 32)
  if (address2) {
    const MAX_CHARS = address2.maxLength || 20;
    address2.addEventListener('input', () => {
      address2Counter.textContent = `${address2.value.length}/${MAX_CHARS} characters used`;
      validateAll();
    });
    // Initial call
    address2Counter.textContent = `${address2.value.length}/${MAX_CHARS} characters used`;
  }

  // --- Results Table Logic (Requirement 18, 19) ---
  const resultsHost = document.getElementById('results');
  const rows = []; // Stores previous data

  function collectFormData() {
    const title = (titleRadios.find(r => r.checked) || {}).value || '';
    const srcs = sources.filter(c => c.checked).map(c => c.value).join(', ');
    
    // Collect dynamic field data
    const drinkUpgradeCheck = document.getElementById('drinkUpgradeCheck');
    const upgradeDetails = document.getElementById('upgradeDetails');
    let upgrade = 'No';
    if (drinkUpgradeCheck?.checked) {
        upgrade = `Yes, Special Request: ${(upgradeDetails?.value || 'N/A').trim()}`;
    }

    return {
      'Title': title,
      'First Name': (firstName?.value || '').trim(),
      'Last Name': (lastName?.value || '').trim(),
      'Email': (emailId?.value || '').trim(),
      'Phone': (phone?.value || '').trim(),
      'Zip': (zipcode?.value || '').trim(),
      'Address 2': (address2?.value || '').trim(), // Requirement 22, 23
      'Drink': drinksSelect?.value || '',
      'Drink Upgrade': upgrade,
      'Sources': srcs,
      'Comments': (comments?.value || '').trim()
    };
  }

  function renderTable() {
    if (!rows.length) { resultsHost.innerHTML = ''; return; }
    const headers = ['Title', 'First Name', 'Last Name', 'Email', 'Phone', 'Zip', 'Address 2', 'Drink', 'Drink Upgrade', 'Sources', 'Comments'];
    const thead = '<thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';
    const tbody = '<tbody>' + rows.map(r => (
      '<tr>' + headers.map(h => `<td>${(r[h] ?? '').replace(/</g, '&lt;')}</td>`).join('') + '</tr>'
    )).join('') + '</tbody>';
    resultsHost.innerHTML = `<h3>Submitted Entries</h3><div class="muted">Previous rows are kept.</div><table>${thead}${tbody}</table>`;
  }

  function hardResetForm() { // Requirement 20
    form.reset();
    touched.clear();
    showAllErrors = false;

    // Reset fields and clear custom validity
    [firstName, lastName, emailId, phone, zipcode, comments, address2, drinksSelect].forEach(el => {
      if (!el) return;
      el.setCustomValidity('');
      clearError(el, el);
    });

    // Clear radio/checkbox errors
    const holderTargetRadios = titleRadios[titleRadios.length - 1];
    const holderTargetSources = sources[sources.length - 1];
    if (titleRadios[0]) clearError(titleRadios[0], holderTargetRadios);
    if (sources[0]) clearError(sources[0], holderTargetSources);
    
    // Clear dynamic content
    if (dynamicContentContainer) dynamicContentContainer.innerHTML = '';
    
    // Reset counter
    if (address2Counter) address2Counter.textContent = '0/20 characters used';

    if (submitBtn) submitBtn.disabled = true;
  }

  // --- Event Wiring --- (Validation on Key Events - Requirement 10)
  [firstName, lastName, comments, emailId, drinksSelect, address2].forEach(el => {
    if (!el) return;
    el.addEventListener('input', validateAll);
    el.addEventListener('blur', () => { markTouched(el.id || el.name); validateAll(); });
  });

  if (phone) { phone.addEventListener('input', () => { maskPhoneOnInput(); validateAll(); }); phone.addEventListener('blur', () => { markTouched(phone.id); validateAll(); }); }
  if (zipcode) { zipcode.addEventListener('input', () => { cleanZipOnInput(); validateAll(); }); zipcode.addEventListener('blur', () => { markTouched(zipcode.id); validateAll(); }); }
  titleRadios.forEach(r => r.addEventListener('change', () => { markTouched(KEYS.title); validateAll(); }));
  sources.forEach(c => c.addEventListener('change', () => { markTouched(KEYS.sources); validateAll(); }));
  

  // Submit Handler
  form.addEventListener('submit', (e) => {
    showAllErrors = true;
    if (!validateAll()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }
    e.preventDefault();
    rows.push(collectFormData());
    renderTable();
    hardResetForm();
  });

  // Reset Handler
  resetBtn && resetBtn.addEventListener('click', () => setTimeout(hardResetForm));

  // Initial setup: ensure all error holders exist for stable layout
  [firstName, lastName, emailId, phone, zipcode, comments, address2, drinksSelect].forEach(el => el && ensureErrorAfter(el));
  if (titleRadios.length) ensureErrorAfter(titleRadios[titleRadios.length - 1]);
  if (sources.length) ensureErrorAfter(sources[sources.length - 1]);

  if (submitBtn) submitBtn.disabled = true;
  validateAll();
});


// === AI ASSISTANT (Form Helper - Requirements 33-77) ===========================================
(function initAssistant(){
  const btn = document.getElementById('aiBtn');
  const panel = document.getElementById('aiPanel');
  if (!btn || !panel) return;

  // Simple FAQ intents (Requirement 56, 57)
  const FAQS = [
    {
      q: /email|format|northeastern/i,
      a: "Use your university email: it must end with @northeastern.edu (e.g., jane.doe@northeastern.edu)." // Requirement 60, 61
    },
    {
      q: /phone|format|number/i,
      a: "Phone format should be (XXX) XXX-XXXX. The field auto-formats as you type." // Requirement 62, 63
    },
    {
      q: /zip|zipcode|postal|digits/i,
      a: "ZipCode must be exactly 6 digits. Only numbers are allowed." // Requirement 64, 65
    },
    {
      q: /required|mandatory|fields|which/i,
      a: "All fields are required except Street Address 2." // Requirement 66, 67
    },
    {
      q: /address\s*2|optional|blank|mandatory/i,
      a: "Street Address 2 is optional. If left blank, it will remain empty in the results table." // Requirement 68, 69
    }
  ];

  function matchFaq(text){ // Requirement 71
    for (const {q,a} of FAQS) {
      if (q.test(text)) return a;
    }
    return "Sorry, I don't know that yet. Please check the instructions."; // Requirement 74, 75
  }

  function addMsg(role, text){ // Requirement 45, 77
    const body = panel.querySelector('.ai-body');
    if (!body) return;
    const row = document.createElement('div');
    row.className = `ai-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  function send(text){
    const input = panel.querySelector('.ai-input');
    const msg = (text ?? input.value).trim();
    if (!msg) return;
    addMsg('user', msg);
    input.value = '';

    const reply = matchFaq(msg);
    setTimeout(() => addMsg('bot', reply), 80);
  }

  function buildPanel(){
    // Header
    panel.innerHTML = `
      <div class="ai-header">
        <span>Form Assistant</span>
        <button type="button" class="ai-close" aria-label="Close">×</button>
      </div>
      <div class="ai-body"></div>
      <div class="ai-footer">
        <input type="text" class="ai-input" placeholder="Ask about the form…" />
        <button type="button" class="ai-send">Send</button>
      </div>
    `;

    // Initial greeting
    addMsg('bot', "Hi! I can help with the form’s rules. Try asking about email requirements, phone format, or any other form-related questions!");

    // Wire events (Requirement 47, 49)
    panel.querySelector('.ai-send').addEventListener('click', ()=> send());
    panel.querySelector('.ai-input').addEventListener('keydown', (e)=> {
      if (e.key === 'Enter') { e.preventDefault(); send(); }
    });
    panel.querySelector('.ai-close').addEventListener('click', ()=>{
      panel.style.display = 'none'; // Closes window
    });
  }

  btn.addEventListener('click', ()=>{ // Requirement 43
    if (panel.innerHTML === '') buildPanel();
    panel.style.display = (panel.style.display === 'none' || !panel.style.display) ? 'block' : 'none';
    if (panel.style.display === 'block') panel.querySelector('.ai-input')?.focus();
  });
})();