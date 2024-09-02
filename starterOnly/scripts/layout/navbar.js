export { editNavBar };



/* 
    function called by the event listener in ../main
    add a class to the extender button of the nav bar for the mobile layout
    the nav bar layout is then handle with the css
*/

function editNavBar() {

    // select the button
    const navBar = document.getElementById("nav-bar");

    // check if the class exist
    if (!navBar.classList.contains("nav-bar-mobile")) {

        // if it doesn't, add the class
        navBar.classList.add("nav-bar-mobile");

    } else {

        // if it does, remove the class
        navBar.classList.remove("nav-bar-mobile");
    }
}
