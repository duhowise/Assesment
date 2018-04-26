// Write your Javascript code.
$(document).ready(function() {
    var originalFaceId = null;
    var compareFaceId = null;
    $(document).on("change",
        ".btn-file :file",
        function() {
            var input = $(this),
                label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
            input.trigger("fileselect", [label]);

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
            })
            .catch(function(error) {
                console.log("Request failure: ", error);
            });


    }

    function getFaceIdLocal(image) {
        fetch("/api/face/detect",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: JSON.stringify(image)
            })
            .then(function(data) {
                console.log("Request success: ", data);
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

            //var imageData = e.target.result.split(",")[1];
               var faceId = getFaceId(input.files[0]);
            };

        }
    }

    // $("#imgCompare").click();

    function readCompareUrl(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $("#img-compare").attr("src", e.target.result);
                var imageData = e.target.result.split(",")[1];
                var faceId = getFaceId(imageData);
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