console.log("JS IS RUNNING");
console.log("Current hash:", window.location.hash);
const projectData = {
    "01": {
        name: "Project 1",
        year: "2026",
        description: "Description for Project 1",
        tags: ["Tag", "Tag", "Tag"],
        image: "images/project-01.png"
    },
    "02": {
        name: "Project 2",
        year: "2025",
        description: "Description for Project 2",
        tags: ["Tag", "Tag", "Tag"],
        image: "images/project-02.png"
    },
    "03": {
        name: "Project 3",
        year: "2026",
        description: "Description for Project 3",
        tags: ["Tag", "Tag", "Tag"],
        image: "images/project-03.png"
    },
    "04": {
        name: "Project 4",
        year: "2025",
        description: "Description for Project 4",
        tags: ["Tag", "Tag", "Tag"],
        image: "images/project-04.png"
    }
};
const navLinks = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".logo");
const pages = document.querySelectorAll(".page");
const projectButtons = document.querySelectorAll(".project");
const projectList = document.querySelector(".project-list");
const projectDetail = document.querySelector(".project-detail");
const backButton = document.querySelector(".back-button");
const projectDetailNumber = document.querySelector(".project-detail-number");
const projectDetailYear = document.querySelector(".project-detail-year");
const projectDetailName = document.querySelector(".project-detail-name");
const projectDetailDescription = document.querySelector(".project-detail-description");
const projectTags = document.querySelector(".project-tags");
const projectDetailImage = document.querySelector(".project-detail-image");


function openProject(projectNumber) {
    const project = projectData[projectNumber];
    projectList.style.display = "none";
    projectDetail.style.display = "block";
    projectDetailNumber.textContent = projectNumber;
    projectDetailYear.textContent = project.year;
    projectDetailName.textContent = project.name;
    projectDetailDescription.textContent = project.description;
    projectTags.innerHTML = "";
    project.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        projectTags.appendChild(tagElement);
    });
    projectDetailImage.src = project.image;
    projectDetailImage.alt = project.name;

}
projectButtons.forEach(button => {
    button.addEventListener(
        "click",
        () => {
            const projectNumber = button.dataset.project;
            openProject(projectNumber);
        }
    );
});
backButton.addEventListener(
    "click",
    () => {
        projectList.style.display = "block";
        projectDetail.style.display = "none";
    }
);

function openPage(pageName) {
    pages.forEach(page => {
        page.classList.remove("active");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
    });
    const page = document.getElementById(pageName);
    const link = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (page) {
        page.classList.add("active");
    }
    if (link) {
        link.classList.add("active");
    }
    history.replaceState(
       null,
        "",
       `#${pageName}`
    );
}

navLinks.forEach(link => {
    link.addEventListener(
        "click",
        () => {
            openPage(link.dataset.page);
        }
    );
});
logo.addEventListener(
    "click",
    event => {
        event.preventDefault();
        openPage(logo.dataset.page);
    }
);

const startingPage = window.location.hash.substring(1);
if (
    startingPage === "home" || 
    startingPage === "projects"
) { 
    openPage(startingPage);
}