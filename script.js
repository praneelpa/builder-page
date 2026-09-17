console.log("JS IS RUNNING");
console.log("Current hash:", window.location.hash);
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const projectButtons = document.querySelectorAll(".project");
const projectList = document.querySelector(".project-list");
const projectDetail = document.querySelector(".project-detail");
const backButton = document.querySelector(".back-button");
const projectDetailNumber = document.querySelector(".project-detail-number");

function openProject(projectNumber) {
    projectList.style.display = "none";
    projectDetail.style.display = "block";
    projectDetailNumber.textContent = projectNumber;
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
    //history.replaceState(
    //   null,
    //    "",
     //   `#${pageName}`
    //);
}

navLinks.forEach(link => {
    link.addEventListener(
        "click",
        () => {
            openPage(link.dataset.page);
        }
    );
});

const startingPage = window.location.hash.substring(1);
if (
    startingPage === "home" || 
    startingPage === "projects"
) { 
    openPage(startingPage);
}
const contactLinks = document.querySelectorAll(".contact-link");
contactLinks.forEach(link => {
    link.addEventListener(
        "click",
        event => {
            if (link.getAttribute("href") === "#"){
                event.preventDefault();
                console.log(`${link.textContent.trim()} link clicked`);
            }
        }
    );
});