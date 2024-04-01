$(document).ready(function(){
    let firstOperand = ''; // Variable to store the first operand
    let operator = ''; // Variable to store the operator
    const PAKULO = "Miss na kita! 🥺";

     // Function to play the audio
     function playAudio() {
        $('#audio').trigger('play'); // Trigger the 'play' event on the audio element
    }

     // Function to pause the audio
     function pauseAudio() {
        $('#audio').trigger('pause'); // Trigger the 'pause' event on the audio element
    }

      // Function to reset the audio (stop and start from the beginning)
      function resetAudio() {
        pauseAudio(); // Pause the audio
        $('#audio').prop('currentTime', 0); // Set the audio's current time to 0 (start from the beginning)
        playAudio(); // Play the audio again
    }


    let checkboxEl = $('#version');
    checkboxEl.change(function(){
        let value = $(this).prop('checked') ? 1 : 0;
        if(value == 1){
            $('body').addClass('pro-version');
            $('.container').addClass('animation');

            if ($(window).width() <= 768) {
                $('#bear_gif').css('display', 'none');
            }else{
                $('#bear_gif').css('display', 'block');
            }
        }else{
            $('body').removeClass('pro-version');
            $('.container').removeClass('animation');
            $('.PAKULO').removeClass('PAKULO_ANIMATION');
            $('#bear_gif').css('display', 'none');
            resetAudio();
            pauseAudio();
        }
    });

    // Function to display inputted button value in screen
    function displayInput(buttonValue) {
        let currentInput = $('#screen').val(); // Get current value on screen

        // Check if the current input is '0', and replace it with the buttonValue
        if (currentInput === '0') {
            $('#screen').val(buttonValue); // Set the screen value to the buttonValue
        } else {
            // Check if the last character in the current input is already an operand
            let lastCharIsOperand = ['+', '-', '*', '/'].includes(currentInput.slice(-1));
            
            // If the last character is not an operand, or if the buttonValue is not an operand, concatenate button value to current value
            if (!lastCharIsOperand || !['+', '-', '*', '/'].includes(buttonValue)) {
                let newInput = currentInput + buttonValue; // Concatenate button value to current value
                $('#screen').val(newInput); // Update screen with new value
            }
        }
    }

    // Event listener for button clicks
    $('.calculator__buttons button').click(function(){
        let buttonValue = $(this).text(); // Get the value of the clicked button
       
        if (buttonValue === 'AC') {
            $('#screen').val('0'); // Clear the screen
        } else if (buttonValue === 'DEL') {
            let currentInput = $('#screen').val(); // Get current value on screen
            $('#screen').val(currentInput.slice(0, -1)); // Remove the last character from the current value
        }else if (buttonValue === '=') {
            if ($('#version').prop('checked')) {

                $('.PAKULO').toggleClass('PAKULO_ANIMATION');
                playAudio(); 

            } else {
                let expression = $('#screen').val();
                let result = eval(expression); // Use eval to evaluate the expression
                $('#screen').val(result); // Display the result on the screen
            }
        } else {
            displayInput(buttonValue); // Call the displayInput function with the button value
        }
    });

})