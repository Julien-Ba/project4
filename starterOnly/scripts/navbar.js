export { editNavBar };



function editNavBar() {
    const navBar = document.getElementById("nav-bar");
    if (!navBar.classList.contains("nav-bar-mobile")) {
        navBar.classList.add("nav-bar-mobile");
    } else {
        navBar.classList.remove("nav-bar-mobile");
    }
}
