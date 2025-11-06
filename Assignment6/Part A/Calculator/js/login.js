
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
    { email: 'rv@northeastern.edu', password: 'va@@@5495' },
    { email: 'vachhani.r@northeastern.edu', password: '12345678' },
    { email: 'demo@northeastern.edu', password: '12345678' }
  ];

  const isValidEmail = (v) => /^[\w.+-]+@northeastern\.edu$/i.test(v || '');
  const isEmailFormatValid = () => isValidEmail($email.val().trim());
  const isPasswordLengthValid = () => $password.val().length >= 8;

  const validateEmail = () => {
    const v = $email.val().trim();
    $emailError.text(''); $credError.text('');
    if (!v) {
      $emailError.text('Email is required');
      return false;
    }
    if (!isEmailFormatValid()) {
      $emailError.text('Please enter a valid Northeastern email');
      return false;
    }
    if (!isValidEmail(v)) {
      $emailError.text('Please enter a valid Northeastern email');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const v = $password.val();
    $passwordError.text(''); $credError.text('');
    if (!v) { $passwordError.text('Password is required'); return false; }
    if (!isPasswordLengthValid()) { 
      $passwordError.text('Password must be at least 8 characters'); 
      return false; 
    }
    return true;
  };




const enableIfValid = () => {
    const ok = isEmailFormatValid() && isPasswordLengthValid();
    $loginBtn.prop('disabled', !ok);
    return ok;
  };

  const handleInputValidation = (e) => {
    const $field = $(e.currentTarget);
    const $errorField = $field.next('small.error');

    if (e.type === 'focus') {
      
      $errorField.text('');
      $credError.text('');
    } 
    
    else if (e.type === 'keyup' || e.type === 'blur') {
      if ($field.is('#email')) {
        validateEmail();
      } else if ($field.is('#password')) {
        validatePassword();
      }
    }
 
    enableIfValid();
  };    
    
  $email.on('keyup blur focus', handleInputValidation);
  $password.on('keyup blur focus', handleInputValidation);

  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    const isFormValid = validateEmail() && validatePassword();
    if (!isFormValid) {
       $loginBtn.prop('disabled', true);
       return;
    }

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
    other.removeItem('user_data'); // ensure single source
    store.setItem('user_data', JSON.stringify(payload));

    $success.fadeIn(150);
    setTimeout(() => { window.location.href = 'calculator.html'; }, 2000);
  });
});
