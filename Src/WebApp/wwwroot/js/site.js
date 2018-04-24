// Write your Javascript code.
$(document).ready( function() {
    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });
    function readOriginalURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-original').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
var readData=null;

    // $("#imgCompare").click();

    function readCompareURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-compare').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
         
        }
        input=null;
    }

    $("#imgInp").change(function(){
        readOriginalURL(this);
    }); 	

    $("#imgCompare").change(function(){
        readCompareURL(this);
    }); 	
});