

 
const calculate = (num1, num2, operation) => {
    

    
    if (operation === 'divide' && num2 === 0) {
        return "Error: Cannot divide by zero";
    }

    switch (operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            return num1 / num2;
        default:
            return NaN;
    }
    
};

$(document).ready(function() {
   
    $('#logoutButton').on('click', function() {
    });
});