function myFunction() {
    let checkBox = document.getElementById("menu__toggle");
    let body = document.getElementById("hidden");
    if (checkBox.checked == true) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}