
$(function () {
  // DOM
  const $timer = $('#timer');
  const $date = $('#date');
  const $event = $('#event');
  const $dateErr = $('#dateError');
  const $eventErr = $('#eventError');
  const $start = $('#startBtn');
  const $pause = $('#pauseBtn');
  const $stop = $('#stopBtn');
  const $reset = $('#resetBtn');
  const $history = $('#history');
  const $empty = $('#emptyHistory');
  const $stats = $('#stats');
  const $filter = $('#filterDate');
  const $clearFilter = $('#clearFilter');
  const $activeEventDisplay = $('#activeEventDisplay');
  

  // State
  let seconds = 0;
  let intervalId = null;
  let running = false;
  let paused = false;

  // Helpers
  const pad = (n) => String(n).padStart(2,'0');
  const fmt = (s) => {
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), ss = s%60;
    return `${pad(h)}:${pad(m)}:${pad(ss)}`;
  };
  const todayISO = () => new Date().toISOString().slice(0,10);

  // Validation (jQuery)
  const validateDate = () => {
    $dateErr.text('');
    if (!$date.val()) { $dateErr.text('Please select a date'); return false; }
    return true;
  };
  const nameRegex = /^[A-Za-z0-9 '\-]{3,100}$/;
  const validateEvent = () => {
    const v = ($event.val()||'').trim();
    $eventErr.text('');
    if (!v) { $eventErr.text('Event name is required'); return false; }
    if (v.length < 3) { $eventErr.text('Event name must be at least 3 characters'); return false; }
    if (v.length > 100) { $eventErr.text('Event name too long (max 100 characters)'); return false; }
    if (!nameRegex.test(v)) { $eventErr.text('Event name contains invalid characters'); return false; }
    return true;
  };

  $date.on('focus', ()=> $dateErr.text(''));
  $event.on('focus', ()=> $eventErr.text(''));

  // Core logic uses Promises + async/await
  const tick = () => {
    seconds += 1;
    $timer.text(fmt(seconds));
  };

  const startInterval = () => new Promise((resolve) => {
    intervalId = setInterval(() => {
      tick();
      if (!running) { clearInterval(intervalId); resolve(); }
    }, 1000);
  });

  async function startTimer() {
    
    if (!validateDate() || !validateEvent()) return; 

    const eventName = $event.val().trim();
    const eventDate = $date.val(); 
    
    $activeEventDisplay.html(`Currently Tracking: <strong>${eventName}</strong> on ${eventDate}`);

    running = true; paused = false;
    disableInputs(true);
    $start.prop('disabled', true);
    $pause.prop('disabled', false).text('Pause');
    $stop.prop('disabled', false);
    
    await startInterval(); 
    
    $activeEventDisplay.empty();
    $('.details label').css('visibility', 'visible');
}

  function pauseOrResume() {
    if (!running) return;
    if (!paused) {
      paused = true;
      clearInterval(intervalId);
      $pause.text('Resume');
      
    } else {
      paused = false;
      $pause.text('Pause');
      startInterval();
      
    }
  }

  // Storage
  const KEY = 'stopwatch_history';
  const loadHistoryAsync = () => {
    return new Promise((resolve) => {
      try {
        const data = JSON.parse(localStorage.getItem(KEY) || '[]');
        resolve(data);
      } catch {
        resolve([]);
      }
    });
  };

  const saveItemAsync = (item) => {
    return new Promise(async (resolve) => {
      const list = await loadHistoryAsync();
      list.push(item);
      localStorage.setItem(KEY, JSON.stringify(list));
      resolve();
    });
  };


const $backdrop = $('#modalBackdrop');
const $modalContent = $('#modalDialog .modal-content');


function showModalConfirmation(msg, duration) {
    $modalContent.html(`<p>${msg}</p>`);
    $backdrop.css('display', 'flex').fadeIn(100); 

    setTimeout(() => {
        $backdrop.fadeOut(200, function() {            
            $modalContent.empty(); 
        }); 
    }, duration);
}

  async function stopAndSave() {
    if (!running) return;
    running = false; 
    paused = false;
    clearInterval(intervalId);
    
    const item = { 
      id: cryptoRandom(), 
      date: $date.val(), 
      name: $event.val().trim(), 
      seconds, 
      savedAt: new Date().toISOString() 
    };
    
    await saveItemAsync(item);
    seconds = 0;
    $timer.text('00:00:00');
    disableInputs(false);
    $start.prop('disabled', false);
    $pause.prop('disabled', true).text('Pause');
    $stop.prop('disabled', true);
    $activeEventDisplay.empty();
$('.details label').css('visibility', 'visible');
    await refreshHistory();
    // Clear the event name after saving
    $event.val('').trigger('input');   // clears the field (trigger updates if you listen to input/keyup)
    $eventErr.text('');                // clear any error message
    $event.focus();                    // optional: put cursor back in the field

  }

  function resetTimer() {
    running = false; 
    paused = false;
    clearInterval(intervalId);
    seconds = 0;
    $timer.text('00:00:00');
    disableInputs(false);
    $start.prop('disabled', false);
    $pause.prop('disabled', true).text('Pause');
    $stop.prop('disabled', true);
    showModalConfirmation(`Timer Reset Done!`, 700);
  }

  function disableInputs(disabled) {
    $date.prop('disabled', disabled);
    $event.prop('disabled', disabled);
  }

  // UI: history + stats - async version
  async function refreshHistory() {
    const list = await loadHistoryAsync();
    const sorted = list.sort((a,b) => new Date(b.savedAt) - new Date(a.savedAt));
    const filter = $filter.val();
    const filtered = filter ? sorted.filter(i => i.date === filter) : sorted;

    $clearFilter.prop('disabled', !filter);
    $history.empty();
    
    if (!filtered.length) {
      $empty.show();
    } else {
      $empty.hide();
      filtered.forEach(i => {
        const li = $('<li/>');
        li.append(`<span> ${i.name} on<strong> ${i.date} </strong></span>`);
        li.append(`<span class="badge">${fmt(i.seconds)}</span>`);
        $history.append(li);
      });
    }

    const totalSessions = filtered.length;
    const totalSeconds = filtered.reduce((acc,i) => acc + i.seconds, 0);
    $stats.html(`
      <span class="badge">Total Sessions: ${totalSessions}</span>
      <span class="badge">Total Time: ${fmt(totalSeconds)}</span>
    `);
  }

  // Simple random id without crypto API requirement
  function cryptoRandom() { 
    return 'id-' + Math.random().toString(36).slice(2,9); 
  }
  // Initialize with async/await
  const initialize = async () => {
    $date.val(todayISO());
    await refreshHistory();
  };

  // Events
  $start.on('click', startTimer);
  $pause.on('click', pauseOrResume);
  $stop.on('click', stopAndSave);
  $reset.on('click', resetTimer);
  $filter.on('change', () => refreshHistory());
  $clearFilter.on('click', async () => { 
    $filter.val(''); 
    await refreshHistory(); 
  });
  initialize();
});


