const loadingScreen = document.getElementById("loading-screen");
const loadingPercent = document.querySelector(".loading-percent");

function setLoadingProgress(percent) {
    if (!loadingPercent) return;
    const clamped = Math.min(100, Math.max(0, Math.round(percent)));
    loadingPercent.textContent = `${clamped}%`;
}
function hideLoadingScreen() {
    if (!loadingScreen) return;
    setLoadingProgress(100);
    loadingScreen.classList.add("is-hidden");
    loadingScreen.addEventListener(
        "transitionend",
        () => {
            loadingScreen.remove();
        },
        {once: true}
    );
}
function trackImageLoad(img) {
    if (img.complete) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        img.addEventListener("load", resolve, {once: true});
        img.addEventListener("error", resolve, {once: true});
    });
}
function waitForPageReady() {
    const images = Array.from(document.querySelectorAll("img"));
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const totalTasks = images.length + 1;
    let completedTasks = 0;
    function taskDone() {
        completedTasks += 1;
        setLoadingProgress((completedTasks / totalTasks) * 100);
    }
    const imageTasks = images.map(img => trackImageLoad(img).then(taskDone));
    const fontTask = fontsReady.then(taskDone);
    return Promise.all([...imageTasks, fontTask]);
}
if (document.readyState == "complete") {
    hideLoadingScreen();
} else {
    waitForPageReady().then(hideLoadingScreen);
    window.addEventListener("load", hideLoadingScreen, {once: true});
}



console.log("JS IS RUNNING");
console.log("Current hash:", window.location.hash);
const projectData = {
    "01": {
        name: "Macropad",
        year: "2025",
        description: "A custom macropad designed for macOS and the keyboard shortcuts I use most often. It has six programmable keys, with each key supporting both tap and hold actions to trigger different shortcuts. The macropad is built around a XIAO RP2040 and uses KMK firmware to handle the key inputs and custom shortcuts. For a detailed description with code and PCB schematics, check out my GitHub page!!",
        tags: ["RP2040", "KMK", "Hardware"],
        image: "images/project-01.png",
        code: "code/macropad.txt",
        link: "https://github.com/praneelpa/Macropad"
    },
    "02": {
        name: "SAP-X CPU",
        year: "2026",
        description: "A CPU on breadboard that has many functionalities. It can read and write data along with everything else a 16-bit CPU can do. (IN PROGRESS!!!)",
        tags: ["Computer Architecture", "Breadboard", "Hardware"],
        link: "https://github.com/praneelpa/sap-x-cpu"
    },
    "03": {
        name: "Project 3",
        year: "2026",
        description: "Description for Project 3",
        tags: ["Tag", "Tag", "Tag"],
    },
    "04": {
        name: "Project 4",
        year: "2025",
        description: "Description for Project 4",
        tags: ["Tag", "Tag", "Tag"],
    }
};
const navLinks = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".logo");
const pages = document.querySelectorAll(".page");
const projectList = document.querySelector(".project-list");
const projectDetail = document.querySelector(".project-detail");
const backButton = document.querySelector(".back-button");
const projectDetailNumber = document.querySelector(".project-detail-number");
const projectDetailYear = document.querySelector(".project-detail-year");
const projectDetailName = document.querySelector(".project-detail-name");
const projectDetailDescription = document.querySelector(".project-detail-description");
const projectTags = document.querySelector(".project-tags");
const projectDetailImage = document.querySelector(".project-detail-image");
const projectCode = document.querySelector(".project-code");
const projectCodeContent = document.querySelector(".project-code-content");
const copyCodeButton = document.querySelector(".copy-code");
const projectDetailLink = document.querySelector(".project-detail-link");
const projectImageContainer = document.querySelector(".project-image");


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
    if (project.link) {
        projectDetailLink.href=project.link;
        projectDetailLink.hidden = false;
    } else{
        projectDetailLink.hidden=true;
    }
    projectImageContainer.classList.add("is-empty");
    projectDetailImage.src = project.image;
    projectDetailImage.alt = project.name;
    if (project.code) {
        projectCode.hidden = false;
        projectCodeContent.textContent = project.code;
        fetch(project.code)
            .then(response=>{
                if (!response.ok) {
                    throw new Error(`Failed to load code: ${response.status}`);
                }
                return response.text();
            })
            .then(code=>{
                projectCodeContent.textContent=code;
            })
            .catch(()=>{
                projectCodeContent.textContent="Could not load code.";
            });
    } else {
        projectCode.hidden = true;
        projectCodeContent.textContent = "";
    }
}
function renderProjectList() {
    Object.keys(projectData).forEach(projectNumber => {
        const project = projectData[projectNumber];
        const button = document.createElement("button");
        button.className = "project";
        button.dataset.project = projectNumber;
        const numberSpan = document.createElement("span");
        numberSpan.className = "project-number";
        numberSpan.textContent = projectNumber;
        const nameSpan = document.createElement("span");
        nameSpan.className = "project-name";
        nameSpan.textContent = project.name;
        const yearSpan = document.createElement("span");
        yearSpan.className = "project-year";
        yearSpan.textContent = project.year;
        button.append(numberSpan, nameSpan, yearSpan);
        button.addEventListener("click", ()=> openProject(projectNumber));
        projectList.appendChild(button);
    });
}
renderProjectList();

projectDetailImage.addEventListener("load", () => {
    if (projectDetailImage.getAttribute("src")) {
        projectImageContainer.classList.remove("is-empty");
    }
});
projectDetailImage.addEventListener("error", ()=> {
    projectImageContainer.classList.add("is-empty");
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
copyCodeButton.addEventListener("click", async () => {
    try{
    await navigator.clipboard.writeText(projectCodeContent.textContent);
    copyCodeButton.textContent="Copied";
    } catch { copyCodeButton.textContent = "Copy error.";}
    setTimeout(()=> {
        copyCodeButton.textContent = "Copy";
    }, 1500);
});