function formSubmit(event) {
    event.preventDefault();
    var url = "https://script.google.com/macros/s/AKfycbzPFMSI512-INdf6RBw3zILC4yt1f49a7NoBYsZQt0GnO1McbI-ntgGVkyyjqS3dKo/exec";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.setRequestHeader("Access-Control-Allow-Headers", "Accept, X-Requested-With, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    request.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    request.onload = function() { 
        // request successful
        // we can use server response to our request now
        alert(request.responseText);
        event.target.reset();
    };

    request.onerror = function() {
        alert(request.responseText)
        // console.log(request);
    };

    // console.log(new FormData(event.target));
    // console.log(request);

    request.send(new FormData(event.target)); // create FormData from form that triggered event
}

document.getElementById("contact-form").addEventListener("submit", formSubmit);