/* nav bullets & nav links*/
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const navliAs = document.querySelectorAll('.links a');
const allSections = document.querySelectorAll('.section');

//function to scroll smoothly to the section related to clicked nav bullets or nav links
function goToSomewhere (elements) {
    elements.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
        //calling the function of active class handle
        handleActiveClass(elements); 
    });
}

//call the function goToSomewhere on both nav links and nav bullets
goToSomewhere(allBullets);
goToSomewhere(navliAs);


//function handle adding class active to clicked element and removing from its siblings
function handleActiveClass(elements) {
    elements.forEach(el => {
        el.addEventListener('click' , ()=> {
            elements.forEach(x => {
                x.classList.remove('active');
            })
            el.classList.add('active');
        })
    })
};


//scrolling activate only the nav links & nav bullets related to current section on view
window.addEventListener('scroll', () => {
    for(let i=0 ; i < allSections.length ; i++) {
        if (allSections[i].getBoundingClientRect().top <= 200) {
            for (let x = 0; x < allSections.length; x++) {
                allBullets[x].classList.remove('active');
                navliAs[x].classList.remove('active');
            }
            allBullets[i].classList.add('active');
            navliAs[i].classList.add('active');
        }
    };
});


//draken the background of navbar while scrolling
window.addEventListener('scroll', () => {
    let windowScrollTop = this.scrollY;  //scrollY is alternative of pageYOffset
    let homeHeight = document.getElementById('home').offsetHeight;
    let headerArea = document.getElementById('header-area');

    windowScrollTop > homeHeight -50 ? headerArea.style.backgroundColor = 'rgba(0,0,0,.7)': headerArea.style.backgroundColor =  'transparent';
    // headerArea.style.backgroundColor = windowScrollTop > homeHeight -50 ? 'rgba(0,0,0,.7)': 'transparent';
});


//toggle menu of navbar
let toggleBtn = document.querySelector('.toggle-menu');
let theLinks = document.getElementById('links');

toggleBtn.onclick = function(e) {
    e.stopPropagation();

    this.classList.toggle('menu-active');
    theLinks.classList.toggle('open');
}

//hide navbar menu (mobile screen) when click outside the menu
document.addEventListener('click', (e) => {
    if(e.target !== toggleBtn && e.target !== theLinks ) {
        if(theLinks.classList.contains('open')) {
            toggleBtn.classList.toggle('menu-active');
            theLinks.classList.toggle('open');
        }
    }
}); // try to just remove classes from both toggleBtn and the Links in other block of code

//stop propagation on menu
theLinks.onclick = function(e) {
    e.stopPropagation();
}


/* start Setting Menu */
// open/close settings menu
let gear = document.querySelector('.setting');
let menu = document.querySelector('.settings-box')

gear.addEventListener('click', () => {
    gear.classList.toggle('fa-spin');
    menu.classList.toggle('opened');
});


// -1- Random Background 
// change landing page background randomly
let landingPage = document.querySelector(".landing-page"); // select landing page element

// create array of images
// let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg" ,"06.jpg" , "07.jpg"];
let imgsArray = [
    "https://res.cloudinary.com/hapiii/image/upload/v1612352679/jjdu40v3fbxmiugcthxo.jpg", 
    "https://res.cloudinary.com/hapiii/image/upload/v1612352676/mfu2nx2btean67rqxo5a.jpg", 
    "https://res.cloudinary.com/hapiii/image/upload/v1612352678/rtdstqz4f4rejipsvli6.jpg", 
    "https://res.cloudinary.com/hapiii/image/upload/v1612352674/q0wlhvcynktti2s3fare.jpg", 
    "https://res.cloudinary.com/hapiii/image/upload/v1612352673/sfbmwvbhpbuvx5zh3t6r.jpg",
    "https://res.cloudinary.com/hapiii/image/upload/v1612352673/y1b1msm67908mlkbpjpx.jpg",
    "https://res.cloudinary.com/hapiii/image/upload/v1573158860/vxekvl3brdwk09zcdapd.jpg",
    "https://res.cloudinary.com/hapiii/image/upload/v1573158816/j1ijnez4oilbaqpgjasx.jpg"
];

let bgInterval;
let bgOptions = true;

/* local storage 
assign the value of bgOptions (true or false) to what stored in local storage */
let bgInLocalStorage = localStorage.getItem('bg_options');
let spans = document.querySelectorAll('.random-background span');

if(bgInLocalStorage !== null) {

    //remove all active class from go and stop buttons
    spans.forEach(span => span.classList.remove('active'));

    if(bgInLocalStorage === 'true') {
        //reassign the variable bgOption to true to run random background
        bgOptions = true;
        
        //add class active on the go button
        document.querySelector('.random-background .yes').classList.add('active');
    } else {
        //reassign the variable bgOption to false to stop random background
        bgOptions = false;

        //add class active on the stop button
        document.querySelector('.random-background .no').classList.add('active');
    }
}

//function fires the random bgs by setInterval
function radomizeImgs() {
    if(bgOptions) {
        bgInterval = setInterval(() => {
            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // change background img url
            landingPage.style.backgroundImage = `url(${imgsArray[randomNumber]})`;
            //landingPage.style.backgroundImage = 'url('+ imgsArray[randomNumber]+ ')';
        
        }, 3000);
    }
};
radomizeImgs();


// on/off random background
const randomBg = document.querySelectorAll('.random-background span');

randomBg.forEach(bg => {
    bg.onclick = function() {
        if(bg.dataset.bg === 'yes') {
            bgOptions = true;
            radomizeImgs();
            
            //create in local storage an element bg_options = true
            localStorage.setItem('bg_options', true);

        } else {
            bgOptions = false;
            clearInterval(bgInterval);

            //create in local storage an element bg_options = false
            localStorage.setItem('bg_options', false);
        }
    }
    //calling the function of active class handle
    handleActiveClass(randomBg);
});



// -2- color theme settings switch colors and save in localStorage
// switch root color to selected color from setting colors & store in local storage
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
    li.addEventListener('click', (e) => {
        //change the --main-color to the clicked target color
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //store the target clicked color in local storage
        localStorage.setItem('color-option' , e.target.dataset.color);

    });

    //calling the function of active class handle
    handleActiveClass(colorsLi);
});


/* local storage 
assign the value of --main-color to what color stored  in local storage */ 
let mainColor = localStorage.getItem('color-option');

if(mainColor !== null) {
    //get the stored color in localStorage to be the value of --main-color
    //stored color in local storage is from clicking in the color options in setting menu
    document.documentElement.style.setProperty('--main-color', mainColor);

    //remove class acive from all li , and add active to target li only
    colorsLi.forEach(element => {
        element.classList.remove('active');

        /* add class active to target li 
        (which has data color = that stored in local storage) */
        if(element.dataset.color === mainColor) {
            element.classList.add('active');
        };
    });
};


// -3- display nav bullets & save in local storage 
let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalStor = localStorage.getItem('bullets_options');

//show and hide bullets according to clicked span and create localStorage item
bulletsSpan.forEach(span => {
    span.addEventListener('click' , ()=> {
        if(span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets_options','block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets_options','none');
        }
    })
    
    //calling the function of active class handle
    handleActiveClass(bulletsSpan);
});

// store displaying or hidding bullets in localStorage
if(bulletLocalStor !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });

    if(bulletLocalStor ==='block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}


// -4- reset button
let resetBtn = document.querySelector('.settings-box .resetBtn');
resetBtn.addEventListener('click', ()=> {

    //remove these elements from local storage
    localStorage.removeItem('color-option');
    localStorage.removeItem('bg_options');
    localStorage.removeItem('bullets_options');

    //reload window
    window.location.reload();

    // in case does not work on codepen use 
    //window.location.href = window.location.href;
});
/* end settings box */ 



/* skills section */ 
//catch the skills section on scrolling
let ourSkills = document.querySelector('.skills');

window.addEventListener("scroll", () => {
    if (ourSkills.getBoundingClientRect().top < 300) {   // or we can use if (ourSkills.scrollTop < 300)
        let progressSpans = document.querySelectorAll('.skills .skill-box .skill-progress span');
        progressSpans.forEach(pSpan => pSpan.style.width = pSpan.dataset.progress);
    }
});


/* gallery section */
// create pop up with the image
let ourGallery = document.querySelectorAll('.gallery img')

ourGallery.forEach (img => {
    img.addEventListener('click', (e) => {

        //create overlay, add class and append to body
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        //create popup box, add class, header, img, img src and append
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        //create header for each img
        if(img.alt !== null) {
            let imgHeading = document.createElement('h3');
            let imgTxt = document.createTextNode(img.alt);
            imgHeading.appendChild(imgTxt);
            popupBox.appendChild(imgHeading);
        }     

        //create img in popup box and append img to overlay
        let popupImg = document.createElement('img');
        popupImg.src = img.src;

        popupBox.appendChild(popupImg);
        // document.body.appendChild(popupBox);
        overlay.appendChild(popupBox);

        //create close button
        let closeBtn = document.createElement('span');
        let closeBtnTxt = document.createTextNode('X');
        closeBtn.appendChild(closeBtnTxt);
        closeBtn.className = 'close-btn'; 
        popupBox.appendChild(closeBtn);

        //close popup box & overlay (short way)
        closeBtn.onclick = function() {
            this.parentNode.remove();
            document.querySelector('.popup-overlay').remove();
        }

    });

});


