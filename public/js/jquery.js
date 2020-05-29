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

// Back to top
const body = document.getElementsByTagName("body");
const btt = document.querySelector(".back-to-top");
$("body").waypoint(function (direction) {
    if (direction == "down") {
        btt.style.display = "block";
    } else {
        btt.style.display = "none";
    }
}, {
    offset: "-100px"
})


