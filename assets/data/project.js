const projectData = [
    {
        "id": 0,
        "name": "Image Filtering Project",
        "image": "./assets/image/project-1.gif",
        "desc": "This project aims to create an image filtering application using MATLAB based on a GUI",
        "repo": "https://github.com/pranagusriana/image-filtering-apps",
        "deploy": null
    },
    {
        "id": 1,
        "name": "Image Enhancement Project",
        "image": "./assets/image/project-2.gif",
        "desc": "This project aims to create an image enhancement application using MATLAB based on a GUI",
        "repo": "https://github.com/pranagusriana/image-enhancement-apps",
        "deploy": null
    }
];

const nCol = 2;
const nProject = projectData.length;
const nRow = Math.floor(nProject/nCol);

function createProjectItem({id, name, image, desc, repo, deploy}){
    return `<div class="project-item card">
        <img src="${image}" class="project-image">
        <p class="pointer project-title" id=${id}>${name}</p>
    </div>`;
};

function loadProject(){
    let loadedProject = '';
    let id = 0;
    for(let i = 0; i < nRow; i++){
        loadedProject += '<div class="flex-container-row">';
        for(let j = 0; j < nCol; j++){
            if (id < nProject) {
                loadedProject += createProjectItem(projectData[id]);
            }
            id += 1;
        }
        loadedProject += '</div>';
    }
    return loadedProject;
}

function createModalProject({id, name, image, desc, repo, deploy}){
    return `<div class="modal-content">
        <div class="modal-header">
            <span class="close">&times;</span>
            <p class="project-title">${name}</p>
        </div>
        <div class="modal-body">
            <img src="${image}" class="featured-image">
            <p>${desc}</p>
            ${repo? '<p>You can see repository of this project <a href="'+ repo + '">here</a></p>' : ''}
            ${deploy? '<p>You can see deployed of this project <a href="' + deploy + '">here</a></p>' : ''}
        </div>
            <div class="modal-footer"></div>
        </div>
    </div>
    `;
}

