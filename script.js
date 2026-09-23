// ============================================
// NETBALL // NEXT
// Website interactions
// ============================================


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    menuToggle.textContent = navMenu.classList.contains("open")
        ? "✕"
        : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});


// DARK MODE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☾" : "☀";

    localStorage.setItem("netballTheme", isDark ? "dark" : "light");
});

const savedTheme = localStorage.getItem("netballTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☾";
}


// POSITION SELECTOR

const positions = [
    {
        short: "GS",
        name: "Goal Shooter",
        description: "The goal shooter focuses on scoring goals and creating opportunities close to the post.",
        skill: "Shooting",
        area: "Attacking third"
    },
    {
        short: "GA",
        name: "Goal Attack",
        description: "The goal attack works with the goal shooter, creating chances and scoring from different areas.",
        skill: "Movement",
        area: "Attacking third"
    },
    {
        short: "WA",
        name: "Wing Attack",
        description: "The wing attack helps move the ball into the attacking third and creates passing opportunities.",
        skill: "Passing",
        area: "Attacking third"
    },
    {
        short: "C",
        name: "Centre",
        description: "The centre connects the whole team and helps control the speed and flow of the game.",
        skill: "Endurance",
        area: "Centre third"
    },
    {
        short: "WD",
        name: "Wing Defence",
        description: "The wing defence challenges the opposing wing attack and works to stop attacking passes.",
        skill: "Defending",
        area: "Centre third"
    },
    {
        short: "GD",
        name: "Goal Defence",
        description: "The goal defence protects the goal circle and works with the goalkeeper to prevent scoring chances.",
        skill: "Interceptions",
        area: "Defensive third"
    },
    {
        short: "GK",
        name: "Goal Keeper",
        description: "The goal keeper defends the goal post, challenges the goal shooter and protects the defensive circle.",
        skill: "Rebounding",
        area: "Defensive third"
    }
];

let currentPosition = 0;

const positionName = document.getElementById("positionName");
const positionShort = document.getElementById("positionShort");
const positionDescription = document.getElementById("positionDescription");
const positionSkill = document.getElementById("positionSkill");
const positionArea = document.getElementById("positionArea");
const positionNumber = document.getElementById("positionNumber");
const positionCounter = document.getElementById("positionCounter");

const positionButtons = document.querySelectorAll(".position-dot");

function updatePosition(index) {
    currentPosition = index;

    const position = positions[currentPosition];

    positionName.textContent = position.name;
    positionShort.textContent = position.short;
    positionDescription.textContent = position.description;
    positionSkill.textContent = position.skill;
    positionArea.textContent = position.area;

    positionNumber.textContent = String(currentPosition + 1).padStart(2, "0");
    positionCounter.textContent = `${currentPosition + 1} / ${positions.length}`;

    positionButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.position === position.short
        );
    });
}

positionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const index = positions.findIndex(
            position => position.short === button.dataset.position
        );

        updatePosition(index);
    });
});

document.getElementById("previousPosition").addEventListener("click", () => {
    const newIndex = (currentPosition - 1 + positions.length) % positions.length;
    updatePosition(newIndex);
});

document.getElementById("nextPosition").addEventListener("click", () => {
    const newIndex = (currentPosition + 1) % positions.length;
    updatePosition(newIndex);
});

updatePosition(0);


// JOIN BUTTON

const joinButton = document.getElementById("joinButton");
const toast = document.getElementById("toast");

joinButton.addEventListener("click", () => {
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
});


// SCROLL ANIMATIONS

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".about-card, .skill-card, .match-card, .section-heading"
).forEach(element => {
    element.classList.add("scroll-reveal");
    observer.observe(element);
});


// KEYBOARD NAVIGATION

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        const newIndex =
            (currentPosition - 1 + positions.length) % positions.length;

        updatePosition(newIndex);
    }

    if (event.key === "ArrowRight") {
        const newIndex =
            (currentPosition + 1) % positions.length;

        updatePosition(newIndex);
    }
});