document.addEventListener('DOMContentLoaded', function() {
    let addRecord = function() {
        console.log("@nr Add record");
        let table = document.getElementById('myTable');
        let tbody = table.querySelector('tbody');
        // get the last Student Table row index
        let lastRow = tbody.lastElementChild;
        let studentCell = lastRow?.children[1];
        let lastRowIndex = studentCell ? parseInt(studentCell.textContent.replace(/\D/g, '')) : 0;
        // create the new row
        let newRow = document.createElement('tr');
        let newCheckboxCell = document.createElement('td');
        newCheckboxCell.innerHTML = '<input type="checkbox" onclick="onClickCheckbox(this)">';
        let newstudentCell = document.createElement('td');
        newstudentCell.textContent = `Student ${lastRowIndex + 1}`;
        let newAuthorCell = document.createElement('td');
        newAuthorCell.textContent = `Teacher ${lastRowIndex + 1}`;
        newRow.appendChild(newCheckboxCell);
        newRow.appendChild(newstudentCell);
        newRow.appendChild(newAuthorCell);
        tbody.appendChild(newRow);
    };
    // expose globally
    window.addRecord = addRecord;
    window.onClickCheckbox = function(checkbox) {
        let selectedRow = checkbox.closest('tr');
        if (checkbox.checked) {
            // highlight the row
            selectedRow.style.backgroundColor = '#fff200ff';
            // create a delete button cell
            let deleteCell = document.createElement('td');
            deleteCell.innerHTML = '<button onclick="onClickDelete(this)">Delete</button>';
            selectedRow.appendChild(deleteCell);
        } else {
            // remove highlight
            selectedRow.style.backgroundColor = 'white';
            // remove delete cell if it exists
            let deleteButton = selectedRow.querySelector('button');
            if (deleteButton) {
                deleteButton.closest('td').remove();
            }
        }
    }
    window.onClickDelete = function(deleteButton) {
        let rowToDelete = deleteButton.closest('tr');
        let studentCell = rowToDelete.children[1];
        let index = studentCell.textContent.split(' ')[1];
        rowToDelete.remove(); // remove the row
        alert(`Student ${index} Record deleted successfully!`);
    }
});