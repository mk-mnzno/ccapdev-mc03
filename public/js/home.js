$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#number').keyup(function () {
        // your code here
        var numInput = $('#number').val();

        $.get('/getCheckNumber', {number: numInput}, function (result) {
            if(result !== ''){
                $('#number').css('background-color', 'red');
                $('#error').text('Number already registered');
                $('#submit').prop('disabled', true);
            } else {
                $('#number').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#submit').prop('disabled', false);
            }
        });
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if both text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The name and the number fields are reset to empty values.
    */
    $('#submit').click(function () {
        // your code here
        var nameInput = $('#name').val();
        var numInput = $('#number').val();

        if (nameInput !== '' && numInput !== ''){
            $.get('/add', {name: nameInput, number: numInput}, function (result) {
                $('#contacts').append(result);
                // resets the form
                $('#name').val('');
                $('#number').val('');    
            });


        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */

    $('#contacts').on('click', '.remove', function () {
        // your code here
        var button = $(this);
        var arrTags = $(this).siblings('div.info').children();

        $.get('/delete', {number: arrTags[1].innerHTML}, function(result) {
            if(result) //if result is true
                button.parent().remove();
        });
    });
})
