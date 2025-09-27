document.addEventListener('DOMContentLoaded', () => {
  
  
  const ICON_DOWN = "assets/down.png";
  const ICON_UP   = "assets/up.png"; 

  // Banner
 

  const table = document.getElementById('myTable');
  const tbody = table.querySelector('tbody');
  const addBtn = document.getElementById('addBtn');
  const submitBtn = document.getElementById('submitBtn');

  const getDataRows = () => Array.from(tbody.querySelectorAll('tr.data-row'));
  const getCheckedRows = () => getDataRows().filter(r => r.querySelector('.row-check')?.checked);

  function updateSubmitState() {
    const anyChecked = getCheckedRows().length > 0;
    submitBtn.disabled = !anyChecked;
    submitBtn.classList.toggle('enabled', anyChecked);
  }
  updateSubmitState();

  // --- Utilities to read numbers from the last row (no renumbering elsewhere) ---
  function getLastRowInfo() {
    const rows = getDataRows();
    if (rows.length === 0) return { studentIndex: 0, teacherIndex: 0, budget: 12000 };
    const last = rows[rows.length - 1];

    const studentText = last.querySelector('.student')?.textContent || "";
    const teacherText = last.querySelector('.advisor')?.textContent || "";
    const budgetText  = last.querySelector('.budget')?.textContent || "";

    const nums = (txt) => {
      const m = txt.match(/\d+/g);
      return m ? parseInt(m[m.length - 1], 10) : 0; // use the last number found
    };
    const studentIndex = nums(studentText);
    const teacherIndex = nums(teacherText);

    const budgetNum = parseInt(String(budgetText).replace(/\D/g, ''), 10);
    const budget = Number.isFinite(budgetNum) ? budgetNum : 12000;

    return { studentIndex, teacherIndex, budget };
  }

  // Details row uses the row's current Student label (not a recalculated index)
  function buildDetailsRow(studentLabel) {
    const details = document.createElement('tr');
    details.className = 'details-row';
    const td = document.createElement('td');
    td.colSpan = 10; // table has 10 columns
    td.innerHTML = `
      <strong>${studentLabel} Details:</strong><br/>
      Award Details: Honors Student<br/>
      Semester: Fall 1-2024 (TA)<br/>
      Comments: Outstanding<br/>
      Award Status: A
    `;
    details.appendChild(td);
    return details;
  }

  // Expand/collapse a row via the SVG button
  function toggleExpand(btn) {
  const row = btn.closest('tr');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const icon = btn.querySelector('.expand-icon');
  const label = row.querySelector('.student')?.textContent || 'Student';

  if (expanded) {
    // collapse
    const next = row.nextElementSibling;
    if (next && next.classList.contains('details-row')) next.remove();
    btn.setAttribute('aria-expanded', 'false');
    icon.src = ICON_DOWN;               // show "closed" image
  } else {
    // expand
    row.after(buildDetailsRow(label));
    btn.setAttribute('aria-expanded', 'true');
    icon.src = ICON_UP;                 // show "open" image
  }
}

  // Add a new record: based on the last existing row (no reindexing of others)
  function addRecord() {
    try {
    const { studentIndex, teacherIndex, budget } = getLastRowInfo();
    const nextStudent = (studentIndex || 0) + 1;
    const nextTeacher = (teacherIndex || 0) + 1;
    const nextBudget  = (budget || 12000) + 1111; // continue budget sequence; tweak as needed

    const tr = document.createElement('tr');
    tr.className = 'data-row';
    tr.innerHTML = `
      <td class="ctrl-cell">
        <button class="expand-btn" title="Expand row" aria-label="Expand row" aria-expanded="false">
          <img src="${ICON_DOWN}" alt="" class="expand-icon" />
        </button>
        <input type="checkbox" class="row-check" aria-label="Select row" />
      </td>
      <td class="student">Student ${nextStudent}</td>
      <td class="advisor">Teacher ${nextTeacher}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td class="budget">${nextBudget}</td>
      <td>100%</td>
      <td class="delete-cell"></td>
      <td class="edit-cell"></td>
    `;
    tbody.appendChild(tr);

    alert(`Student ${nextStudent} Record added successfully`);
    } catch (err) {
      alert(`Error: Could not add Student ${nextStudent}.`); }
    updateSubmitState();
  }

  // Delete a record: remove only that row (do NOT touch other rows)
  function deleteRecord(btn) {
    const row = btn.closest('tr.data-row');
    const label = row.querySelector('.student')?.textContent || 'Student';
    const next = row.nextElementSibling;
    if (next && next.classList.contains('details-row')) next.remove(); // close details if open
    row.remove();
    updateSubmitState();
    alert(`${label} Record deleted successfully`);
  }

  // Edit a record (mock)
  function editRecord(btn) {
    const row = btn.closest('tr.data-row');
    const label = row.querySelector('.student')?.textContent || 'Student';
    const value = prompt(`Edit details of ${label}\n\nEnter any text and click OK to simulate save:`, "");
    if (value !== null && value.trim().length > 0) {
      alert(`${label} data updated successfully`);
    }
  }

  // Row selection toggle
  function handleCheck(chk) {
    const row = chk.closest('tr.data-row');
    if (chk.checked) {
      row.classList.add('row-checked');

      if (!row.querySelector('.delete-btn')) {
        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.className = 'delete-btn';
        row.querySelector('.delete-cell').appendChild(del);
      }
      if (!row.querySelector('.edit-btn')) {
        const edt = document.createElement('button');
        edt.textContent = 'Edit';
        edt.className = 'edit-btn';
        row.querySelector('.edit-cell').appendChild(edt);
      }
    } else {
      row.classList.remove('row-checked');
      row.querySelector('.delete-cell').innerHTML = '';
      row.querySelector('.edit-cell').innerHTML = '';
    }
    updateSubmitState();
  }

  // Delegated events
  tbody.addEventListener('click', (e) => {
    const exp = e.target.closest('.expand-btn');
    if (exp) { e.preventDefault(); toggleExpand(exp); return; }
    if (e.target.classList.contains('delete-btn')) { deleteRecord(e.target); return; }
    if (e.target.classList.contains('edit-btn')) { editRecord(e.target); return; }
  });

  tbody.addEventListener('change', (e) => {
    if (e.target.matches('.row-check')) handleCheck(e.target);
  });

  addBtn.addEventListener('click', addRecord);

  // Submit mock
  submitBtn.addEventListener('click', () => {
    const selected = getCheckedRows().map(r => r.querySelector('.student').textContent);
    alert(`Submitting: ${selected.join(', ')}`);
  });
});
