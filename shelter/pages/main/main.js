//document.getElementById('#disabled').setAttribute("disabled", "true");
//if ()

//none => petsCard___disabled.style.display
//let logo = document.querySelector('.logo');
if (window.matchMedia('(max-width: 768px)').matches) {
    //if (logo.style.width = "19.4rem") {
    petDisabled.style.display = "none";
    //window.location.reload();
}

function myFunction() {
    let checkBox = document.getElementById("menu__toggle");
    let body = document.getElementById("hidden");
    if (checkBox.checked == true) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}