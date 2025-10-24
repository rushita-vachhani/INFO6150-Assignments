/* Part A — Login page logic using jQuery */
$(function () {
  const $email = $('#email');
  const $password = $('#password');
  const $loginBtn = $('#loginBtn');
  const $emailError = $('#emailError');
  const $passwordError = $('#passwordError');
  const $credError = $('#credentialError');
  const $success = $('#successMsg');

  // Hardcoded users
  const USERS = [
    { email: 'student1@northeastern.edu', password: 'Password123' },
    { email: 'student2@northeastern.edu', password: 'Se@123456' },
    { email: 'you1@northeastern.edu', password: '12345678' }
  ];

  const isValidEmail = (v) => /^[\w.+-]+@northeastern\.edu$/i.test(v || '');
  const validateEmail = () => {
    const v = $email.val().trim();
    $emailError.text(''); $credError.text('');
    if (!v || !isValidEmail(v)) {
      $emailError.text('Please enter a valid Northeastern email');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const v = $password.val();
    $passwordError.text(''); $credError.text('');
    if (!v) { $passwordError.text('Password is required'); return false; }
    if (v.length < 8) { $passwordError.text('Password must be at least 8 characters'); return false; }
    return true;
  };

  const enableIfValid = () => {
    const ok = validateEmail() && validatePassword();
    $loginBtn.prop('disabled', !ok);
    return ok;
  };

  $email.on('keyup blur focus', function (e) {
    if (e.type !== 'focus') validateEmail();
    $loginBtn.prop('disabled', !(isValidEmail($email.val().trim()) && $password.val().length >= 8));
  });
  $password.on('keyup blur focus', function (e) {
    if (e.type !== 'focus') validatePassword();
    $loginBtn.prop('disabled', !(isValidEmail($email.val().trim()) && $password.val().length >= 8));
  });

  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    if (!enableIfValid()) return;

    const email = $email.val().trim();
    const pass = $password.val();
    const found = USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);

    if (!found) {
      $credError.hide().text('Invalid email or password').fadeIn(150);
      return;
    }

    const username = email.split('@')[0];
    const payload = {
      username, email, loginAt: new Date().toISOString(), isLoggedIn: true
    };
    const remember = $('#rememberMe').is(':checked');
    const store = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    other.removeItem('a6_user'); // ensure single source
    store.setItem('a6_user', JSON.stringify(payload));

    $success.fadeIn(150);
    setTimeout(() => { window.location.href = 'calculator.html'; }, 1600);
  });
});
