document.addEventListener('DOMContentLoaded', function() {
    let addRecord = function() {
        console.log("@nr Add record");
        let table = document.getElementById('myTable');
        let tbody = table.querySelector('tbody');
        // get the last Book row index
        let lastRow = tbody.lastElementChild;
        let bookCell = lastRow?.children[1];
        let lastRowIndex = bookCell ? parseInt(bookCell.textContent.replace(/\D/g, '')) : 0;
        // create the new row
        let newRow = document.createElement('tr');
        let newCheckboxCell = document.createElement('td');
        newCheckboxCell.innerHTML = '<input type="checkbox" onclick="onClickCheckbox(this)">';
        let newBookCell = document.createElement('td');
        newBookCell.textContent = `Book ${lastRowIndex + 1}`;
        let newAuthorCell = document.createElement('td');
        newAuthorCell.textContent = `Author ${lastRowIndex + 1}`;
        newRow.appendChild(newCheckboxCell);
        newRow.appendChild(newBookCell);
        newRow.appendChild(newAuthorCell);
        tbody.appendChild(newRow);
    };
    // expose globally
    window.addRecord = addRecord;
    window.onClickCheckbox = function(checkbox) {
        let selectedRow = checkbox.closest('tr');
        if (checkbox.checked) {
            // highlight the row
            selectedRow.style.backgroundColor = '#d97676ff';
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
        let bookCell = rowToDelete.children[1];
        let index = bookCell.textContent.split(' ')[1];
        rowToDelete.remove(); // remove the row
        alert(`Book ${index} deleted!`);
    }
});