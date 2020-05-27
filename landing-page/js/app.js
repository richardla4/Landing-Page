/**
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.getElementsByTagName("section");
let closest = document.querySelector("#section1");
const items = document.getElementsByClassName("item");

/**
 * End Global Variables
 * Begin Main Functions
 * 
*/

// build the nav as a list, with each list item having a link to the corresponding section in the document
//      add class "active" to the list item corresponding to the default active section 
function buildNav(){
    for (const section of sections){
        const item=document.createElement("li");
        const link=document.createElement("a");
        link.textContent=section.dataset.nav;
        link.setAttribute("href","#"+section.id);
        item.classList.add("item");
        item.appendChild(link);
        if (section.classList.contains("your-active-class")){
            item.classList.add("active");
        }
        document.querySelector("#navbar__list").appendChild(item);
    }
}

// Add class 'active' to section when near top of viewport
//    when the absolute distance of any section to the top of the viewport is smaller than the absolute distance of the
//    current "closest" section to the top of the viewport assign that new section as "closest" and give it the active class attribute
//    also, search the list of items that make up the navbar for the item that corresponds to the current active section and 
//    give it the active class atrribute
active = function(){
    for (const section of sections){
        if (Math.abs(section.getBoundingClientRect().top)<Math.abs(closest.getBoundingClientRect().top)){
            closest.classList.toggle("your-active-class");
            closest = section;  
            closest.classList.toggle("your-active-class");  
        }
    }
    let activeSection = document.getElementsByClassName("your-active-class");
    for (const item of items){
        if (item.textContent == activeSection[0].dataset.nav){
            item.classList.add("active");
        }
        else {
            item.classList.remove("active");
        }
    }
};

// Scroll to anchor ID using scrollTO event
//     prevent the default behavior when one of the links in the navbar is clicked
//     determine the href of the link that was clicked and from there, determine the section of the document the link corresponds to
//     determine the absolute y-position of the section that was clicked and scroll to it in the document
scroll = function(event){
    event.preventDefault(); 
    const href = event.target.href;
    const idStart = href.indexOf("#");
    const id = href.slice(idStart);
    const anchor = document.querySelector(id);
    const distance = anchor.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo(0,distance);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

buildNav();

// Scroll to section on link click
window.addEventListener("click",scroll);

// Set sections as active
window.addEventListener("scroll",active);

