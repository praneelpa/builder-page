/* =========================
   LOADER
========================= */

const loader =
    document.querySelector(".loader");

const loaderCount =
    document.querySelector(".loader-count");


window.addEventListener("load", () => {

    let count = 0;

    const interval =
        setInterval(() => {

            count += 20;

            if (loaderCount) {
                loaderCount.textContent =
                    String(count).padStart(2, "0");
            }

            if (count >= 100) {
                clearInterval(interval);
            }

        }, 90);


    setTimeout(() => {

        loader.classList.add("hidden");

    }, 850);

});


/* =========================
   PAGE NAVIGATION
========================= */

const navLinks =
    document.querySelectorAll(".nav-link");

const pages =
    document.querySelectorAll(".page");


function openPage(
    pageName,
    updateHash = true
) {

    pages.forEach(page => {

        page.classList.toggle(
            "active",
            page.id === pageName
        );

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.page === pageName
        );

    });


    if (updateHash) {

        history.replaceState(
            null,
            "",
            `#${pageName}`
        );

    }


    closeProjectDetail();

}


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            openPage(
                link.dataset.page
            );

        }
    );

});


/* =========================
   STARTING PAGE
========================= */

const startingPage =
    window.location.hash.substring(1);


if (startingPage === "projects") {

    openPage(
        startingPage,
        false
    );

} else {

    openPage(
        "home",
        false
    );

}


/* =========================
   NAV BACKGROUND
========================= */

const nav =
    document.querySelector(".nav");


window.addEventListener("scroll", () => {

    nav.classList.toggle(
        "scrolled",
        window.scrollY > 5
    );

});


/* =========================
   PROJECT DATA
========================= */

const projectData = {

    cpu: {

        number: "01",

        category:
            "HARDWARE / DIGITAL LOGIC / 2026",

        title:
            "8-BIT COMPUTER",

        story:
            "The goal was to understand a computer by building the pieces myself instead of hiding them behind a framework. The machine is assembled around logic gates, registers, an ALU, a program counter, and memory.",

        lesson:
            "The interesting part is the chain of small decisions: timing, buses, control signals, instruction decoding, and making every block agree on what a clock cycle actually means.",

        code:
`// simplified control loop

const uint8_t opcode = instruction >> 4;
const uint8_t operand = instruction & 0x0F;

switch (opcode) {

    case LOAD:
        accumulator = memory[operand];
        break;

    case ADD:
        accumulator += memory[operand];
        break;

    case STORE:
        memory[operand] = accumulator;
        break;
}`
    },


    imu: {

        number: "02",

        category:
            "EMBEDDED / 3D / 2026",

        title:
            "IMU VISUALIZER",

        story:
            "A motion sensor becomes useful when the raw numbers turn into something I can see. This project streams orientation data from embedded hardware into a real-time 3D scene.",

        lesson:
            "The hard part is turning noisy acceleration and angular velocity into stable orientation. Filtering, coordinate systems, and update timing matter just as much as the final rendering.",

        code:
`// simplified orientation update

const dt =
    (now - lastTime) / 1000.0;

lastTime = now;

gyroAngle += gyroRate * dt;

// complementary filter
angle =
    alpha * gyroAngle +
    (1 - alpha) * accelAngle;`
    },


    macropad: {

        number: "03",

        category:
            "HARDWARE / SOFTWARE / 2025",

        title:
            "MACROPAD",

        story:
            "A small keyboard built around the shortcuts I actually use. The project ties physical controls, firmware, and the host computer together without adding hardware that does not earn its place.",

        lesson:
            "Design gets better when the interface starts with a real workflow. The layout, firmware, and enclosure all become easier to reason about when every key has a specific job.",

        code:
`// simplified key action

if (keyPressed("K1")) {

    sendShortcut([
        CTRL,
        SHIFT,
        "P"
    ]);

}

if (keyPressed("K2")) {

    sendShortcut([
        CTRL,
        "K"
    ]);

}`
    },


    secret: {

        number: "04",

        category:
            "DIGITAL LOGIC / MECHANICAL / 2025",

        title:
            "SECRET BOX",

        story:
            "A physical puzzle box that combines a password interface, display, servo lock, and a few hidden interactions. The goal was to make the mechanism feel deliberate rather than like electronics placed inside a box.",

        lesson:
            "Projects like this make software state feel physical. A single state transition can move a servo, change a display, and completely change what the user is allowed to do next.",

        code:
`// simplified lock state

if (enteredCode === secretCode) {

    unlockServo();

    display("OPEN");

} else {

    attempts--;

    if (attempts <= 0) {
        lockout();
    } else {
        display("TRY AGAIN");
    }

}`
    }

};


/* =========================
   PROJECT DETAILS
========================= */

const projectButtons =
    document.querySelectorAll(".project");


const projectDetail =
    document.getElementById(
        "projectDetail"
    );


const detailBack =
    document.getElementById(
        "detailBack"
    );


const detailTitle =
    document.getElementById(
        "detailTitle"
    );


const detailNumber =
    document.getElementById(
        "detailNumber"
    );


const detailCategory =
    document.getElementById(
        "detailCategory"
    );


const detailDescription =
    document.getElementById(
        "detailDescription"
    );


const detailStory =
    document.getElementById(
        "detailStory"
    );


const detailLesson =
    document.getElementById(
        "detailLesson"
    );


const detailCode =
    document.getElementById(
        "detailCode"
    );


const copyCode =
    document.getElementById(
        "copyCode"
    );


/* =========================
   OPEN PROJECT
========================= */

function openProject(
    projectName
) {

    const data =
        projectData[projectName];


    if (!data) return;


    detailNumber.textContent =
        data.number;


    detailCategory.textContent =
        data.category;


    detailTitle.textContent =
        data.title;


    detailDescription.textContent =
        data.story;


    detailStory.textContent =
        data.story;


    detailLesson.textContent =
        data.lesson;


    detailCode.textContent =
        data.code;


    projectDetail.classList.add(
        "active"
    );


    projectDetail.setAttribute(
        "aria-hidden",
        "false"
    );


    projectDetail.scrollTop = 0;

}


/* =========================
   CLOSE PROJECT
========================= */

function closeProjectDetail() {

    projectDetail.classList.remove(
        "active"
    );


    projectDetail.setAttribute(
        "aria-hidden",
        "true"
    );

}


projectButtons.forEach(project => {

    project.addEventListener(
        "click",
        () => {

            openProject(
                project.dataset.project
            );

        }
    );

});


detailBack.addEventListener(
    "click",
    closeProjectDetail
);


/* =========================
   COPY CODE
========================= */

copyCode.addEventListener(
    "click",
    async () => {

        const original =
            copyCode.textContent;


        try {

            await navigator.clipboard.writeText(
                detailCode.textContent
            );


            copyCode.textContent =
                "COPIED";


            setTimeout(() => {

                copyCode.textContent =
                    original;

            }, 1200);


        } catch {

            copyCode.textContent =
                "SELECT";


            setTimeout(() => {

                copyCode.textContent =
                    original;

            }, 1200);

        }

    }
);


/* =========================
   ESCAPE
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectDetail.classList.contains(
                "active"
            )
        ) {

            closeProjectDetail();

        }

    }
);


/* =========================
   HOME PROJECT SHORTCUT
========================= */

document
    .querySelector(".scroll-hint")
    ?.addEventListener(
        "click",
        () => {

            openPage(
                "projects"
            );

        }
    );