//#region first load

const Header_burger_text_icon = document.querySelectorAll(".scroll-bg")

function ScrollFades() { //For the top right nav burger button and the buttom right "back to top" button.
    let scroll_pos = window.scrollY;

    if (scroll_pos >= 20) {
        Header_burger_text_icon[0].classList.add("header-burger-icon-text-scroll-bg")
        Header_burger_text_icon[1].classList.add("header-burger-icon-text-scroll-bg")
    }
    else {
        Header_burger_text_icon[0].classList.remove("header-burger-icon-text-scroll-bg")
        Header_burger_text_icon[1].classList.remove("header-burger-icon-text-scroll-bg")
    }
    if (scroll_pos >= 800) {
        document.querySelector("#back-to-top").classList.remove("back-to-top-fade-out")
        document.querySelector("#back-to-top").classList.add("back-to-top-fade-in")
    }
    else {
        document.querySelector("#back-to-top").classList.remove("back-to-top-fade-in")
        document.querySelector("#back-to-top").classList.add("back-to-top-fade-out")
    }
}

window.addEventListener("load", function () { //Does stuff upon page loading
    //The original site didn't clear the textboxes on reload; Which i thought was pretty dumb; So I'm doing it myself.
    document.getElementById("contact-name").value = ""
    document.getElementById("contact-email").value = ""
    document.getElementById("contact-subject").value = ""
    document.getElementById("contact-message").value = ""
    document.getElementById("subscribe-email").value = ""

    ScrollFades();
})

//#endregion

//#region dynamic scroll

function MyStatInterval(Stat_num, limit, tick, add) { //For the numbers rising from 0 to where they should in the "about" section.

    let Stat_interval = this.setInterval(function () {

        num = Number(Stat_num.textContent);

        if (num >= limit) {
            this.clearInterval(Stat_interval)
            Stat_num.textContent = String(limit)
        }
        else {
            num += add
            Stat_num.textContent = String(num)
        }
    }, tick)
}

//Sidn't want to add 4.5kb (!!!) of unnecessary load to the site by using the (albiet popular) AOS library,
//so by using the "isIntersection" property and a little bit of complex code, i made my own bootleg version!
//Probably doesn't work *as* well, but saves on file size which is good for SEO; So it's a sacrifice I am willing to make.
//Still works well enough though.

var pass = false

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            //This is here so that the home content can fade-in with the preloading sequence, and not via intersection.
            if (entry.target == document.querySelector("#home-content")) {

            }
            //The "stat" section needed extra stuff other than just fading-in normally.
            else if (entry.target == document.querySelector("#about-stats")) {
                if (pass == false) {
                    entry.target.classList.remove("un-loaded")
                    entry.target.classList.add("loaded")

                    pass = true //prevents the "MyStatInterval" function from running twice and breaking the number addition speed.

                    MyStatInterval(document.querySelector("#about-stats-num-1"), 127, 26, 1)
                    MyStatInterval(document.querySelector("#about-stats-num-2"), 1505, 14, 7)
                    MyStatInterval(document.querySelector("#about-stats-num-3"), 349, 24, 3)
                    MyStatInterval(document.querySelector("#about-stats-num-4"), 62, 50, 1)

                    MyStatInterval(document.querySelector("#about-stats-num-5"), 127, 26, 1)
                    MyStatInterval(document.querySelector("#about-stats-num-6"), 1505, 14, 7)
                    MyStatInterval(document.querySelector("#about-stats-num-7"), 349, 24, 3)
                    MyStatInterval(document.querySelector("#about-stats-num-8"), 62, 50, 1)
                    
                }
            }
            //Normal fading-in procedure 
            else {
                entry.target.classList.remove("un-loaded")
                entry.target.classList.add("loaded")
            }
        }
    })
})

//Making it check intersection for all elements with the ".loading" class.
const LoadingElements = document.querySelectorAll(".loading");
LoadingElements.forEach((el) => observer.observe(el))


//refer to "first load" region for more info
window.addEventListener("scroll", function () {
    ScrollFades();
})

//#endregion

//#region scroll-to

const Nav_window = document.querySelector("#nav-window")
const Nav_content = document.querySelector("#nav-window-content")
const Nav_Buttons = document.querySelectorAll(".nav-button")

function Nav_close() { //Self explanatory.
    Nav_window.classList.remove("nav-window-opened");
    Nav_window.classList.add("nav-window-closed");
    Nav_content.classList.remove("nav-window-content-fade-in");
    Nav_content.classList.add("nav-window-content-base-state");
}

for (let i = 0; i < Nav_Buttons.length; i++) { //Every single button in the content section of the nav, closes it.
    Nav_Buttons[i].addEventListener("click", () => {
        Nav_close()
    })
}

//#endregion

//#region forms

const InputNameField = document.getElementById("contact-name")
const InputEmailField = document.getElementById("contact-email")
const InputMessageField = document.getElementById("contact-message")

const Namelbl = document.querySelector("#name-label")
const Emaillbl = document.querySelector("#email-label")
const Messagelbl = document.querySelector("#message-label")

const Fail = document.querySelector("#submit-fail")
const Success = document.querySelector("#submit-success")

//Zero idea how regexp works to be fully honest, just found these online.
const NameRegex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
const EmailRegex = /(.+)@(.+){2,}\.(.+){2,}/;


//This is the area for minor error checks. Basically where it checks for small errors before you can even click submit.
InputNameField.addEventListener("focus", function () {

    let ContactNameInterval = setInterval(function () {

        let NameVal = InputNameField.value;

        if (NameVal.length < 2) { //Checking if name is at least 2 characters long
            Namelbl.classList.remove("req-field")
            Namelbl.classList.add("name-label-error")
            InputNameField.classList.add("error")
            Namelbl.textContent = "Please enter at least 2 characters."
            Namelbl.classList.remove("d-none")
        }
        else {
            Namelbl.classList.add("d-none")
            InputNameField.classList.remove("error")
            Namelbl.textContent = ""
            Namelbl.classList.remove("name-label-error")
            Namelbl.classList.remove("req-field")
        }

    }, 100);

    InputNameField.addEventListener("blur", function () {
        clearInterval(ContactNameInterval)
    })
})


InputEmailField.addEventListener("focus", function () {

    let ContactEmailInterval = setInterval(function () {

        let EmailVal = InputEmailField.value.indexOf("@");

        if (EmailVal == -1) { //Checking if the email has "@" in it
            Emaillbl.classList.remove("req-field")
            Emaillbl.classList.add("email-label-error")
            InputEmailField.classList.add("error")
            Emaillbl.textContent = "Please enter a valid email address."
            Emaillbl.classList.remove("d-none")
        }
        else {
            Emaillbl.classList.add("d-none")
            InputEmailField.classList.remove("error")
            Emaillbl.textContent = ""
            Emaillbl.classList.remove("email-label-error")
            Emaillbl.classList.remove("req-field")
        }

    }, 100);

    InputEmailField.addEventListener("blur", function () {

        clearInterval(ContactEmailInterval)
    })
})


InputMessageField.addEventListener("focus", function () {

    let ContactMessageInterval = setInterval(function () {

        let MessageVal = InputMessageField.value;

        if (MessageVal.length == 0) { //Checking if the message is empty
            Messagelbl.classList.add("req-field")
            InputMessageField.classList.add("error")
            Messagelbl.textContent = "This Field is required"
            Messagelbl.classList.remove("d-none")
        }
        else {
            Messagelbl.classList.add("d-none")
            InputMessageField.classList.remove("error")
            Messagelbl.textContent = ""
            Messagelbl.classList.remove("req-field")
        }

    }, 100);

    InputMessageField.addEventListener("blur", function () {

        clearInterval(ContactMessageInterval)
    })
})


function reqField(lbl) { //Is called on each box in which you have triggered a minor error (refer to the code block above)
    lbl.classList.add("d-none")
    lbl.textContent = "This field is required"
    lbl.classList.add("req-field")
    lbl.classList.remove("name-label-error")
    lbl.classList.remove("email-label-error")
    lbl.classList.remove("d-none")
}

document.querySelector("#contact-submit").addEventListener("click", function () {

    let error_num = 0 //I'm aware i could have used a boolean, but this is better for counting the number of errors incase new features need to be added relating to such.

    if (InputNameField.value == "" || InputNameField.classList.contains("error")) { //Name minor error triggered.
        reqField(Namelbl)
        error_num += 1
    }

    if (InputEmailField.value == "" || InputEmailField.classList.contains("error")) { //Email minor error trigger.
        reqField(Emaillbl)
        error_num += 1
    }

    if (InputMessageField.value == "" || InputMessageField.classList.contains("error")) { //Message minor error triggered.
        reqField(Messagelbl)
        error_num += 1
    }

    if (error_num == 0) { //This block of code is only triggered when you have had 0 minor errors in the previous check.

        let LoaderH = 0
        let LoaderH2 = 70

        let LoaderAppear = setInterval(function () { //Loading animation after pressing submit.

            LoaderH += 5

            document.getElementById("contact-submit-loader").style.height = `${LoaderH}px`

            if (LoaderH >= 70) {
                document.getElementById("contact-submit-loader").style.height = "70px"
            }
            if (LoaderH >= 250) {

                let LoaderDisappear = setInterval(function () {

                    LoaderH2 -= 5

                    document.getElementById("contact-submit-loader").style.height = `${LoaderH2}px`

                    if (LoaderH2 <= 0) {
                        document.getElementById("contact-submit-loader").style.height = "0px"
                        clearInterval(LoaderDisappear)
                    }

                }, 30)

                clearInterval(LoaderAppear)
            }
        }, 30)

        let error_num_major = 0 //Time to check for major errors.
        let NameValMajor = InputNameField.value;
        let EmailValMajor = InputEmailField.value;
        let MessageValMajor = InputMessageField.value;


        let SubmitCheckInterval = setInterval(function () {

            //Getting the textbox ready for major errors to be relayed to the user.
            Fail.innerHTML = ""
            Fail.classList.add("d-none")

            //------------- Name Check -----------------//

            if (NameRegex.test(NameValMajor)) {

            }
            else {
                Fail.innerHTML += "Please enter a valid name. <br>"
                Fail.classList.remove("d-none")
                error_num_major += 1
            }

            //==========================================//

            //------------- Email check ---------------//

            if (EmailRegex.test(EmailValMajor)) {

            }
            else {
                Fail.innerHTML += "Please enter a valid email. <br>"
                Fail.classList.remove("d-none")
                error_num_major += 1
            }

            //========================================//

            //------------- Message check -----------//

            if (MessageValMajor.length < 15) {
                Fail.innerHTML += "Please enter a message containing at least 15 characters. <br>"
                Fail.classList.remove("d-none")
                error_num_major += 1
            }

            //=======================================//

            //--------- Successful submit -----------//

            if (error_num_major == 0) { //Still aware i could've used a boolean. Still the same reasoning as before.
                document.querySelector("#contact-forms-form").classList.add("d-none")
                Success.classList.remove("d-none")
            }

            //=======================================//

            clearInterval(SubmitCheckInterval)

        }, 1500);

    }

})


//So somthing weird is that the original website basically had NO function for this button.
//All it did was have a "Submitting..." label show up and just stay there; Probably because it's just a demo / proof of concept
//So i had no idea what to do with it; And after a bit of thought, i concluded that i should just mimic the original site with
//its uselessness and just have it there for show. (¬_¬")

document.querySelector("#footer-subscribe-btn").addEventListener("click", function () { 

    let SubEmailVal = document.getElementById("subscribe-email").value

    if (SubEmailVal == "") {

    }
    else {
        document.querySelector("#subscribe-email-label").classList.remove("d-none")
    }
})

//#endregion

//#region nav


document.querySelector("#header-nav-burger").addEventListener("click", function () { //Nav opening
    document.querySelector("#nav-window").classList.remove("nav-window-closed");
    document.querySelector("#nav-window").classList.add("nav-window-opened");
    document.querySelector("#nav-window-content").classList.remove("nav-window-content-base-state");
    document.querySelector("#nav-window-content").classList.add("nav-window-content-fade-in");
})

document.querySelector("#nav-x-btn").addEventListener("click", function () { //Nav closing
    document.querySelector("#nav-window").classList.remove("nav-window-opened");
    document.querySelector("#nav-window").classList.add("nav-window-closed");
    document.querySelector("#nav-window-content").classList.remove("nav-window-content-fade-in");
    document.querySelector("#nav-window-content").classList.add("nav-window-content-base-state");
})

//#endregion

//#region owl carousel

//So after finishing this whole thing, i realised that i could have simply used the much more popular (and rightfully so)
//library call "Slick" to make these carousels. However, since "Owl carousel" was suggested to me by a friend whom i shall not name,
//I wanted to honor their wishes and used this instead. For being so unpopular, it's actually very easy to use and looks pretty!
//Would recommend.

$(document).ready(function () {
    $("#clients-slider").owlCarousel({
        items: 6,
        loop: true,
        autoplay: false,
        nav: false,
        dotsEach: 2,
        margin: 30,
        smartSpeed: 200,

        responsive: {
            0: {
                items: 2
            },
            501: {
                items: 3,
                margin: 20
            },
            800: {
                items: 4
            },
            1000: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });

    $("#clients-quotes-slider").owlCarousel({
        items: 1,
        loop: true,
        autoplay: false,
        smartSpeed: 500,
        autoHeight: true,
        margin: 150,

        responsive: {
            0: {
                dots: true,
                dotsEach: 1,
                nav: false
            },

            800: {
                dots: false,
                nav: true,
                navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>']
            }
        }
    })
});

//#endregion
