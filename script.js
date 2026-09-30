
/* =========================
   PORTFOLIO JAVASCRIPT
========================= */


/* =========================
   ELEMENTS
========================= */

const languageToggle =
    document.getElementById("languageToggle");

const themeToggle =
    document.getElementById("themeToggle");

const heroTyping =
    document.getElementById("heroTyping");

const currentYear =
    document.getElementById("currentYear");


/* =========================
   SETTINGS
========================= */

let currentLanguage =
    localStorage.getItem("portfolioLanguage") || "en";

let currentTheme =
    localStorage.getItem("portfolioTheme") || "dark";


/* =========================
   HERO TYPING VARIABLES
========================= */

let typingTimeout = null;


/* =========================
   THEME
========================= */

function applyTheme() {

    document.documentElement.setAttribute(
        "data-theme",
        currentTheme
    );


    if (currentTheme === "dark") {

        themeToggle.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeToggle.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }


    localStorage.setItem(
        "portfolioTheme",
        currentTheme
    );
}


themeToggle.addEventListener(
    "click",
    function () {

        currentTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        applyTheme();
    }
);


/* =========================
   HERO TYPING
========================= */

function typeHeroText() {


    /*
        Stop the previous typing animation
        if the language was changed.
    */

    clearTimeout(typingTimeout);


    /*
        Get the correct text.
    */

    const text =
        currentLanguage === "ar"
            ? heroTyping.getAttribute("data-ar")
            : heroTyping.getAttribute("data-en");


    /*
        Clear the h1 before typing.
    */

    heroTyping.textContent = "";


    let index = 0;


    function typeCharacter() {


        if (index < text.length) {


            heroTyping.textContent +=
                text.charAt(index);


            index++;


            typingTimeout = setTimeout(
                typeCharacter,
                70
            );

        }

    }


    typeCharacter();
}


/* =========================
   LANGUAGE
========================= */

function applyLanguage() {


    /*
        Change HTML language.
    */

    document.documentElement.lang =
        currentLanguage;


    /*
        Change page direction.
    */

    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    /*
        Find all elements that have
        English and Arabic text.
    */

    const elements =
        document.querySelectorAll(
            "[data-en][data-ar]"
        );


    elements.forEach(
        function (element) {


            /*
                Hero typing has its own
                animation, so don't change
                its text here.
            */

            if (element.id === "heroTyping") {
                return;
            }


            if (currentLanguage === "ar") {

                element.textContent =
                    element.getAttribute("data-ar");

            } else {

                element.textContent =
                    element.getAttribute("data-en");
            }

        }
    );


    /*
        Change language button.
    */

    languageToggle.textContent =
        currentLanguage === "en"
            ? "AR"
            : "EN";


    languageToggle.setAttribute(
        "aria-label",
        currentLanguage === "en"
            ? "Switch to Arabic"
            : "Switch to English"
    );


    /*
        Save language.
    */

    localStorage.setItem(
        "portfolioLanguage",
        currentLanguage
    );


    /*
        Restart Hero typing.
    */

    typeHeroText();
}


/* =========================
   LANGUAGE BUTTON
========================= */

languageToggle.addEventListener(
    "click",
    function () {


        currentLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";


        applyLanguage();

    }
);


/* =========================
   REVEAL ANIMATION
========================= */

const observer =
    new IntersectionObserver(

        function (entries) {


            entries.forEach(
                function (entry) {


                    if (entry.isIntersecting) {


                        entry.target.classList.add(
                            "show"
                        );


                        /*
                            Once the animation
                            happens, stop observing
                            this element.
                        */

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


/*
    Find all elements that should
    have reveal animation.
*/

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


revealElements.forEach(
    function (element) {

        observer.observe(element);

    }
);


/* =========================
   INITIALIZE
========================= */

applyTheme();

applyLanguage();


/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}

