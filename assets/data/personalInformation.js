function loadPersonalInformation(listInfo){
    const lenInfo = listInfo.length;
    for (let info of listInfo){
        ({id, type, value} = info);
        if (type == "text"){
            const textDoc = document.getElementById(id);
            textDoc.innerText = value;
        } else if (type == "html"){
            const textDoc = document.getElementById(id);
            textDoc.innerHTML = value;
        } else if (type == "img"){
            const textDoc = document.getElementById(id);
            textDoc.src = value;
        } else if (type == "css"){
            const textDoc = document.getElementById(id);
            textDoc.style.backgroundImage = value;
        }
    }
}