const images = [
    "/photos/training1.jpeg",
    "/photos/training2.jpeg"
]

const text = [
    "Arduino Class",
    "JAVA Class"
]

let num = 0;
const img = document.getElementById("activityPhoto");
const t = document.getElementById("text");

const next = () => {
    num++;
    if (num > images.length - 1) {
        num = 0;
    }
    img.src = images[num];
    images.alt = text[num];
    t.innerHTML = text[num];
}

const pre = () => {
    num--;
    if (num < 0) {
        num = images.length - 1;
    }
    img.src = images[num];
    images.alt = text[num];
    t.innerHTML = text[num];
}

// Waypoint
const brand = document.querySelector(".brand-wp");
$("slider").waypoint(function (direction) {
    if (direction == "down") {
        $("header").addClass("whiteky");
        brand.src = "/photos/brand_black.png";
    } else {
        $("header").removeClass("whiteky");
        brand.src = "/photos/brand_white.png";
    }
}, {
    offset: "-40px"
})


// Project Section background
const projectBg = document.querySelector(".project-body");
const header = document.querySelector("header");
brand.src = "/photos/brand_black.png";
header.classList.add("whiteky");
const projectType = document.querySelector(".projectType").innerHTML;
if (projectType === "web") {
    projectBg.style.backgroundImage = "url('/photos/project(web).png')";
}
if (projectType === "android") {
    projectBg.style.backgroundImage = "url('/photos/project(android).png')";
}
if (projectType === "windows") {
    projectBg.style.backgroundImage = "url('/photos/project(windows).png')";
}