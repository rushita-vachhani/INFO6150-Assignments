/* Part A — Calculator page logic using jQuery and a single arrow function */
$(function () {
  const sessionStr = sessionStorage.getItem('user_data') || localStorage.getItem('user_data');
  if (!sessionStr) {
    window.location.replace('login.html');
    return;
  }
  const user = JSON.parse(sessionStr);
  $('#welcome').text(`Welcome, ${user.username}!`);

  // Single arrow function for all operations
  const calculate = (num1, num2, operation) => {
    const a = Number(num1), b = Number(num2);
    switch (operation) {
      case 'add': return a + b;
      case 'subtract': return a - b;
      case 'multiply': return a * b;
      case 'divide':
        if (b === 0) return '∞ (Divide by zero is not possible)'; // graceful
        return a / b;
      default: return NaN;
    }
  };

  const $n1 = $('#num1'), $n2 = $('#num2');
  const $n1Err = $('#num1Error'), $n2Err = $('#num2Error');

  const numRegex = /^-?\d*\.?\d*$/; // allows decimals & negatives
  const validateField = ($el, $err) => {
    const v = $el.val().trim();
    $err.text('');
    if (!v.length) { $err.text('Number input is required'); return false; }
    if (!numRegex.test(v)) { $err.text('Please enter a valid number'); return false; }
    if (v === '.' || v === '-.' || v === '-') {
      $err.text('Please enter a valid number'); 
      return false; 
    }
    return true;
  };

  $n1.on('focus', () => $n1Err.text(''));
  $n2.on('focus', () => $n2Err.text(''));
  // Validate on keyup in real-time
$n1.on('keyup', () => validateField($n1, $n1Err));
$n2.on('keyup', () => validateField($n2, $n2Err));


  $('.btn-row .btn').on('click', function () {
    const op = $(this).data('op');
    const ok1 = validateField($n1, $n1Err);
    const ok2 = validateField($n2, $n2Err);
    if (!ok1 || !ok2) return;

    const result = calculate($n1.val().trim(), $n2.val().trim(), op);
    $('#result').val(result).fadeOut(70).fadeIn(70);
  });

  $('#logoutBtn').on('click', function () {
    sessionStorage.removeItem('user_data');
    localStorage.removeItem('user_data');
    $('main, .topbar').fadeOut(400, () => window.location.replace('login.html'));
  });
});
