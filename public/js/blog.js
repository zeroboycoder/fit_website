const btn = document.querySelector(".filter_btn");
const filterForm = document.querySelector(".blog__filter")
function clicked() {
    filterForm.classList.toggle("display")
}

function filterCancle() {
    filterForm.classList.remove("display")
}