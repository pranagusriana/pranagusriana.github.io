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
        } else if (type == "typedtext"){
            var typed = new Typed('#'+id, {
                strings: value.split("<sp>"),
                typeSpeed: 50,
                backSpeed: 60,
                smartBackspace: true,
                loop: true
            });
        }
    }
}

function loadExperiences(listExperience){
    const expList = document.getElementById('list-experiences');
    expList.innerHTML = '';
    for(let exp of listExperience){
        const expItem = createExperienceItem(exp);
        expList.append(expItem);
    }
}

function createExperienceItem({id, title, company, experienceLevel, startDate, endDate, location, description, skills, companyLogo}){
    const titleExperience = document.createElement('h4');
    titleExperience.innerText = title;

    const companyText = document.createElement("h5");
    companyText.innerText = `${company} · ${experienceLevel}`;

    const dateExp = document.createElement("h5");
    dateExp.classList.add("sub");
    dateExp.innerText = `${startDate} - ${endDate}`;

    const locExp = document.createElement("h5");
    locExp.classList.add("sub");
    locExp.innerText = `${location}`;

    const descriptionText = document.createElement("ul");
    descriptionText.innerHTML = description;

    const skillsText = document.createElement("p");
    skillsText.innerHTML = `<strong>Skills:</strong> ${skills}`;

    const companyImg = document.createElement('img');
    companyImg.width = 48;
    companyImg.height = 48;
    companyImg.src = companyLogo;

    const expDetail = document.createElement("div");
    expDetail.classList.add("experience-detail");
    expDetail.append(titleExperience, companyText, dateExp, locExp, descriptionText, skillsText);

    const compLogo = document.createElement("div");
    compLogo.classList.add("company-logo");
    compLogo.append(companyImg);

    const container = document.createElement("div");
    container.classList.add("flex-container-row");
    container.append(compLogo, expDetail);

    return container;
}

function loadCV(cvUrl){
    document.getElementById("view-cv-button").onclick = ()=>{
        window.open(cvUrl, '_blank'); 
        return false;
    }
}