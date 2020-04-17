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
    if(num > images.length-1){
        num = 0;
    }
    img.src = images[num];
    images.alt = text[num];
    t.innerHTML = text[num];
}

const pre = () => {
    num--;
    if(num < 0){
        num = images.length-1;
    }
    img.src = images[num];
    images.alt = text[num];
    t.innerHTML = text[num];
}

// Waypoint

const brand = document.querySelector(".brand-wp");
$(".slider-wp").waypoint(function(direction){
    if(direction == "down"){
        $("header").addClass("whiteky");
        brand.src = "/photos/brand_black.png";
    } else {
        $("header").removeClass("whiteky");
        brand.src = "/photos/brand_white.png";
    }
}, {
    offset : "-40px"
})