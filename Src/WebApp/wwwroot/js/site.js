// Write your Javascript code.
var validIds=[];
var originalImage = null;

$(document).ready(function() {
    var compareFaceId = null;
    $(document).on("change",
        ".btn-file :file",
        function() {
            var input = $(this),
                label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
            input.trigger("fileselect", [label]);

        });

    $("#comparer").on("click",
        function() {
            compare(validIds);
        });

   $(".btn-file :file").on("fileselect",
        function(event, label) {

            var input = $(this).parents(".input-group").find(":text"),
                log = label;

            if (input.length) {
                input.val(log);
            } else {
                if (log) alert(log);
            }

        });

   function getFaceId(image) {
        fetch("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Ocp-Apim-Subscription-Key":"1c8723038192418da1e15f8a1f052a9e"
                },
                body: image
            })
            .then(function(data) {
                console.log("Request success: ", data);
                return data.json();
            }).then(function(json) {
                // var result= JSON.stringify(json);
                    json.forEach(element => {
                validIds.push(element.faceId);
                        
                    });


                console.log(validIds);


            })
            .catch(function(error) {
                console.log("Request failure: ", error);
        });

    } 
    
   function compare(valids) {
        fetch("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key":"1c8723038192418da1e15f8a1f052a9e"
                },
                body: JSON.stringify({faceId1:valids[1], faceId2:valids[2],faceId:valids[0],personGroupId:"aweome_face_list"})
            })
            .then(function(data) {
                console.log("Request success: ", data);
                return data.json();
            }).then(function(json) {
                $("#alertText").text(JSON.stringify(json));

                console.log(validIds);
            })
            .catch(function(error) {
                console.log("Request failure: ", error);
        });


    }

   function addToFacelist(image) {
        fetch("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/aweome_face_list/persistedFaces",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Ocp-Apim-Subscription-Key":"1c8723038192418da1e15f8a1f052a9e"
                },
                body: image
            })
            .then(function(data) {
                console.log("Request success: ", data);
                return data.json();
            }).then(function(json) {
                console.log(json);
            })
            .catch(function(error) {
                console.log("Request failure: ", error);
        });


   }
    
   function addToPersonGroup(image,id) {
        fetch("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/aweome_face_list/persons/"+id+"/persistedFaces",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Ocp-Apim-Subscription-Key":"1c8723038192418da1e15f8a1f052a9e"
                },
                body: image
            })
            .then(function(data) {
                console.log("Request success: ", data);
                return data.json();
            }).then(function(json) {
                console.log(json);
            })
            .catch(function(error) {
                console.log("Request failure: ", error);
            });


   }

   function readOriginalUrl(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);

            reader.onload = function(e) {
                $("#img-original").attr("src", e.target.result);
                getFaceId(input.files[0]);
                originalImage = input.files[0];
                console .log("this");
            };

           
           
            console .log("that");

        }
       console .log("that too");

    }

   function readCompareUrl(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $("#img-compare").attr("src", e.target.result);
                getFaceId(input.files[0]);
            };
            reader.readAsDataURL(input.files[0]);

        }
    }
    
    $("#imgInp").change(function() {
        readOriginalUrl(this);
    });

    $("#imgCompare").change(function() {
        readCompareUrl(this);
    });
});