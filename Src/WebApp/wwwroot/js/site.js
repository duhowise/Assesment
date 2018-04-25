// Write your Javascript code.
$(document).ready( function() {
    var originalFaceId = null;
    var compareFaceId = null;
    $(document).on("change", ".btn-file :file", function() {
        var input = $(this),
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger("fileselect", [label]);
         
    });

    $(".btn-file :file").on("fileselect", function(event, label) {
        
        var input = $(this).parents(".input-group").find(":text"),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });

    function getFaceId(image) {
        fetch("/api/face", {  
                method: "POST",  
                headers: {  
                    'Content-Type': "application/json"  
                },
                body: image
            })
            .then(function (data) {  
                console.log("Request success: ", data);  
            })  
            .catch(function (error) {  
                console.log("Request failure: ", error);  
       });
        

    }




    function readOriginalUrl(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                var data = reader.readAsBinaryString(e.target.result.split(","[1]));
                console.log(data);
                $('#img-original').attr('src', e.target.result);
                //originalFaceId = getFaceId(data);

            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
var readData=null;

    // $("#imgCompare").click();

    function readCompareUrl(input) {
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
        readOriginalUrl(this);
    }); 	

    $("#imgCompare").change(function(){
        readCompareUrl(this);
    }); 	
});