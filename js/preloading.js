

// This file is dedicated to the preloading, and so it it loaded before any of the other js files //
//================================================================================================//

let Opacity = "1";
let IntOpacity = 1;
let Length = "0";
let IntLength = 70;

const ProgressBar = document.getElementById("progress-bar")
const Preloading = document.getElementById("preloading")
const Preloading_Animation = document.getElementById("preloading-anim")

let ProgressInterval1 = setInterval(function () {

    Length = `${IntLength}%`

    ProgressBar.style.width = Length;

    if (Length == "70%") {

        let ProgressInterval2 = setInterval(function () {

            IntLength = IntLength + 3
            Length = `${IntLength}%`
            ProgressBar.style.width = Length;

            if (IntLength >= 90) {

                let ProgressInterval3 = setInterval(function () {

                    IntLength += 2
                    Length = `${IntLength}%`
                    ProgressBar.style.width = Length;
                    IntOpacity -= 0.2
                    Opacity = `${IntOpacity}`
                    ProgressBar.style.opacity = Opacity;
                    Preloading.style.opacity = Opacity;
                    Preloading_Animation.style.opacity = Opacity;


                    if (IntLength >= 100) {

                        let ProgressInterval4 = setInterval(function () {

                            ProgressBar.classList.add("d-none")
                            Preloading.classList.add("d-none")
                            Preloading_Animation.classList.add("d-none")
                            document.getElementById("home-content").classList.remove("un-loaded")
                            document.getElementById("home-content").classList.add("loaded")

                            clearInterval(ProgressInterval4);

                        }, 400)

                        clearInterval(ProgressInterval3);

                    }

                }, 230)

                clearInterval(ProgressInterval2);

            }

        }, 230)

        clearInterval(ProgressInterval1)

    }

}, 1000)
