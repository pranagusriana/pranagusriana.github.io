function loadPages() {
    var url = "https://script.google.com/macros/s/AKfycbx5xuNHUMwVwuhUoL6JJjGf6Y8qa8DxklJ1Wtuc0PCztr8bPzj1tOMLg1gJ65pN7nIDeQ/exec";
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() { 
        // request successful
        // we can use server response to our request now
        let response = JSON.parse(request.responseText);
        let data = response["data"];
        loadPersonalInformation(data["personal-information"])
        loadProject(data["projects"]);
    };

    request.onerror = function() {
        let response = JSON.parse(request.responseText);
        alert(response)
    };

    request.send(null);
}