let timerInterval = null; 
let totalSeconds = 0;
let isRunning = false;


const formatTime = (totalSeconds) => { 

};


const validateDetails = () => { 

};


const handleStart = async () => {

    if (!validateDetails()) {
        return; 
    }
    
    await new Promise(resolve => {
    
        setTimeout(resolve, 500); 
    });
};

const handleStopAndSave = () => {
    
};

$(document).ready(function() {
    
    $('#eventDate').val(new Date().toISOString().split('T')[0]);
    
    
    
    $('#startButton').on('click', handleStart);
    $('#stopSaveButton').on('click', handleStopAndSave);
    
});