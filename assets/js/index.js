const projectList = document.querySelector('#project-list');

projectList.innerHTML = loadProject();

const projectItems = document.querySelectorAll('.project-item');

// Get the modal
var modal = document.getElementById("myModal");

for(const projectItem of projectItems){
    projectItem.addEventListener('click', (event)=>{
        if (event.target.id){
            modal.innerHTML = createModalProject(projectData[event.target.id]);
            modal.style.display = "block";
    
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
    
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }
        } else{
            alert('Klik pada nama project');
        }

    })
}