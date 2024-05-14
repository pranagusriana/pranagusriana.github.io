function createProjectItem({id, name, year, image, desc}){
    const imgProject = document.createElement('img');
    imgProject.classList.add('project-image');
    imgProject.src = image;
    
    const titleProject = document.createElement('p');
    titleProject.classList.add('project-title')
    titleProject.innerText = name;

    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');
    projectItem.classList.add('card');
    projectItem.classList.add('pointer');
    projectItem.setAttribute('id', `project-${id}`);
    projectItem.append(imgProject, titleProject);

    projectItem.addEventListener('click', function(){
        const eventName = "CLICK_PROJECT";
        const value = `project-${id}`;
        updateSession();
        trackEvent(eventName, value);

        const modal = document.getElementById('myModal');
        modal.innerHTML = '';
        
        modal.append(createModalProject({id, name, year, image, desc}));
        modal.style.display = "block";
    })

    return projectItem;
};

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function loadProject(projectData){
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projectData = sortByKey(projectData, "id");
    const nCol = 2;
    const nProject = projectData.length;
    const nRow = Math.ceil(nProject/nCol);
    let id = 0;
    for(let i = 0; i < nRow; i++){
        const containerRow = document.createElement('div');
        containerRow.classList.add('flex-container-row');
        for(let j = 0; j < nCol; j++){
            if (id < nProject) {
                const projectItem = createProjectItem(projectData[id]);
                containerRow.append(projectItem);
            }
            id += 1;
        }
        projectList.append(containerRow);
    }
}

function createModalProject({id, name, year, image, desc}){
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('custom-close');
    closeBtn.classList.add('mt-2');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function(){
        document.getElementById('myModal').style.display = "none";
    });

    const titleProject = document.createElement('p');
    titleProject.classList.add('project-title');
    titleProject.classList.add('mt-4');
    titleProject.innerText = name;

    const modalHeaderContainer = document.createElement('div');
    modalHeaderContainer.classList.add('custom-modal-header');
    // modalHeaderContainer.classList.add('pt-4');
    modalHeaderContainer.append(closeBtn, titleProject);

    const imgProject = document.createElement('img');
    imgProject.classList.add('detail-project-image');
    imgProject.src = image;

    const descItem = document.createElement('div');
    descItem.innerHTML = desc;

    const modalBodyContainer = document.createElement('div');
    modalBodyContainer.classList.add('custom-modal-body');
    modalBodyContainer.append(imgProject, descItem);
    
    const yearProject = document.createElement('p');
    yearProject.classList.add('year-project');
    yearProject.classList.add('mt-4');
    yearProject.innerText = year;

    const modalFooterContainer = document.createElement('div');
    modalFooterContainer.classList.add('custom-modal-footer');
    modalFooterContainer.append(yearProject);

    const modalContentElement = document.createElement('div');
    modalContentElement.classList.add('custom-modal-content');
    modalContentElement.append(modalHeaderContainer, modalBodyContainer, modalFooterContainer);

    return modalContentElement;
}

