// Project Section background
const header = document.querySelector("header");
document.querySelector(".brand-wp").src = "/photos/brand_black.png";
header.classList.add("whiteky");
const projectType = document.querySelector(".projectType").innerHTML;
const projectBg = document.querySelector(".project-body");
const pagination_section = document.querySelector(".pagination-section");
if (projectType === "web") {
    projectBg.style.backgroundImage = "url('/photos/project(web).png')";
}
if (projectType === "android") {
    projectBg.style.backgroundImage = "url('/photos/project(android).png')";
}
if (projectType === "windows") {
    projectBg.style.backgroundImage = "url('/photos/project(windows).png')";

}
