const projectData = [
    {
        "id": 0,
        "name": "Bookshelf Apps Project",
        "year": 2022,
        "image": "./assets/image/project-bookshelf.gif",
        "desc": "This project aims to build a web-based bookshelf application using HTML, CSS, and JavaScript",
        "repo": "https://github.com/pranagusriana/bookshelf-apps",
        "deploy": "https://pranagusriana.github.io/bookshelf-apps/"
    },
    {
        "id": 1,
        "name": "Image Filtering Project",
        "year": 2022,
        "image": "./assets/image/project-1.gif",
        "desc": "This project aims to create an image filtering application using MATLAB based on a GUI",
        "repo": "https://github.com/pranagusriana/image-filtering-apps",
        "deploy": null
    },
    {
        "id": 2,
        "name": "Image Enhancement Project",
        "year": 2022,
        "image": "./assets/image/project-2.gif",
        "desc": "This project aims to create an image enhancement application using MATLAB based on a GUI",
        "repo": "https://github.com/pranagusriana/image-enhancement-apps",
        "deploy": null
    }
];

const nCol = 2;
const nProject = projectData.length;
const nRow = Math.ceil(nProject/nCol);

function createProjectItem({id, name, year, image, desc, repo, deploy}){
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
        const modal = document.getElementById('myModal');
        modal.innerHTML = '';
        
        modal.append(createModalProject(projectData[id]));
        modal.style.display = "block";
    })

    return projectItem;
};

function loadProject(){
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
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

function createModalProject({id, name, year, image, desc, repo, deploy}){
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function(){
        document.getElementById('myModal').style.display = "none";
    });

    const titleProject = document.createElement('p');
    titleProject.classList.add('project-title')
    titleProject.innerText = name;

    const modalHeaderContainer = document.createElement('div');
    modalHeaderContainer.classList.add('modal-header');
    modalHeaderContainer.append(closeBtn, titleProject);

    const imgProject = document.createElement('img');
    imgProject.classList.add('detail-project-image');
    imgProject.src = image;

    const descItem = document.createElement('p');
    descItem.innerText = desc;

    const modalBodyContainer = document.createElement('div');
    modalBodyContainer.classList.add('modal-body');
    modalBodyContainer.append(imgProject, descItem);
    if (repo){
        const repoItem = document.createElement('p');
        repoItem.innerText = 'You can see repository of this project ';

        const repoLink = document.createElement('a');
        repoLink.href = repo;
        repoLink.innerText = 'here';

        repoItem.append(repoLink);

        modalBodyContainer.append(repoItem);
    }

    if (deploy){
        const deployItem = document.createElement('p');
        deployItem.innerText = 'You can see deployed this project ';

        const deployLink = document.createElement('a');
        deployLink.href = deploy;
        deployLink.innerText = 'here';

        deployItem.append(deployLink);

        modalBodyContainer.append(deployItem);
    }

    const yearProject = document.createElement('p');
    yearProject.classList.add('year-project');
    yearProject.innerText = year;

    const modalFooterContainer = document.createElement('div');
    modalFooterContainer.classList.add('modal-footer');
    modalFooterContainer.append(yearProject);

    const modalContentElement = document.createElement('div');
    modalContentElement.classList.add('modal-content');
    modalContentElement.append(modalHeaderContainer, modalBodyContainer, modalFooterContainer);

    return modalContentElement;
}

