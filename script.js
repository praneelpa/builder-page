/* =========================
   LOADER
========================= */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1200);

});


/* =========================
   PAGE NAVIGATION
========================= */

const navLinks = document.querySelectorAll(".nav-link, .logo");
const pages = document.querySelectorAll(".page");

function openPage(pageName) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    const link = document.querySelector(
        `.nav-link[data-page="${pageName}"]`
    );

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

    link.addEventListener("click", event => {

        event.preventDefault();

        openPage(
            link.dataset.page
        );

    });

});


/* =========================
   STARTING PAGE
========================= */

const startingPage =
    window.location.hash.substring(1);

if (startingPage === "projects") {
    openPage(startingPage);
}


/* =========================
   NAV BACKGROUND ON SCROLL
========================= */

const nav = document.querySelector(".nav");

pages.forEach(page => {

    page.addEventListener("scroll", () => {

        nav.classList.toggle(
            "scrolled",
            page.scrollTop > 8
        );

    });

});


/* =========================
   PROJECT DETAILS
========================= */

const projectButtons =
    document.querySelectorAll(".project");

const projectDetail =
    document.getElementById("projectDetail");

const detailBack =
    document.getElementById("detailBack");

const detailTitle =
    document.getElementById("detailTitle");

const detailCategory =
    document.getElementById("detailCategory");

const detailDescription =
    document.getElementById("detailDescription");

const detailCode =
    document.getElementById("detailCode");


/*
  PROJECT DATA
  ------------
  Edit this object to update project content. Each key matches a
  data-project attribute on a .project button in index.html.
    title       - shown as the detail page heading
    category    - short label + year, shown above the title
    description - first paragraph in the detail view
    code        - link for the "View code" button (e.g. a GitHub repo)
*/
const projectData = {

    cpu: {
        title: "8-bit computer",
        category: "Hardware, 2026",
        description:
            "A breadboard computer built from logic gates, registers, an ALU, and 256 bytes of memory.",
        code: "https://github.com/yourusername/8bit-computer"
    },

    imu: {
        title: "IMU visualizer",
        category: "Embedded, 2026",
        description:
            "Custom motion hardware streaming orientation data into a real-time 3D visualization.",
        code: "https://github.com/yourusername/imu-visualizer"
    },

    macropad: {
        title: "Macropad",
        category: "Hardware, software, 2025",
        description:
            "A small programmable keyboard designed around the shortcuts I actually use.",
        code: "https://github.com/yourusername/macropad"
    },

    secret: {
        title: "Secret box",
        category: "Digital logic, 2025",
        description:
            "A physical puzzle box with a password, display, servo lock, and a few secrets.",
        code: "https://github.com/yourusername/secret-box"
    }

};


projectButtons.forEach(project => {

    project.addEventListener("click", () => {

        const data =
            projectData[
                project.dataset.project
            ];

        if (!data) return;

        detailCategory.textContent = data.category;
        detailTitle.textContent = data.title;
        detailDescription.textContent = data.description;
        detailCode.href = data.code || "#";

        projectDetail.classList.add("active");

    });

});


detailBack.addEventListener("click", () => {

    projectDetail.classList.remove("active");

});


/* =========================
   ESCAPE
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        projectDetail.classList.contains("active")
    ) {

        projectDetail.classList.remove("active");

    }

});