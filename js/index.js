
// نجهز الـ observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidesection");
    //   entry.target.classList.add("section-transition");
      observer.unobserve(entry.target); // علشان يتنفذ مرة واحدة بس
    }
  });
}, { threshold: 0.2 }); // 0.2 = يظهر عند 20% من العنصر

// نجيب كل العناصر اللي عليها الكلاس
const All = document.querySelectorAll(".hidesection");

All.forEach((el) => {
  observer.observe(el);
});


// counter for numbers
const counters = document.querySelectorAll('.number');

const observer_1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCount(entry.target);
      observer_1.unobserve(entry.target); // علشان يشتغل مرة واحدة بس
    }
  });
}, { threshold: 0.5 }); // يبدأ العد لما 50% من العنصر يدخل الشاشة

counters.forEach(counter => {
  observer_1.observe(counter);
});

function startCount(el) {
  const target = +el.dataset.target;
  let current = 0;
  const increment = Math.ceil(target / 200); // سرعة العد (200 خطوة)

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      el.textContent = current;
      requestAnimationFrame(updateCounter); // أسرع من setInterval
    } else {
      el.textContent = target; // تأكيد إنه يوقف على الرقم النهائي
    }
  };

  updateCounter();
}

// end it


// start landing wallpaper change
let landing = document.querySelector(".landing");
let wallpapers = Array.from(document.querySelectorAll(".wallpaper img"));
let next = document.querySelector("i.next");
let pre = document.querySelector("i.pre");
let currentIndex = 0;
let bulletsContainer = document.querySelector(".bullets");

// create bullets based on number of wallpapers
for (let i = 0; i < wallpapers.length; i++) {
    let bullet = document.createElement("div");
    bulletsContainer.appendChild(bullet);
}
let bullets = Array.from(document.querySelectorAll(".bullets div"));
bullets[0].classList.add("active");

// function to remove active class from all bullets
function removeActive() {
    bullets.forEach((bullet) => {
        bullet.classList.remove("active");
    });
}
// function to add active class to current bullet
function addActive() {
    bullets[currentIndex].classList.add("active");
}
// function to update landing background
function updateLanding() {
    landing.style.backgroundImage = `url(${wallpapers[currentIndex].src})`;
    removeActive();
    addActive();
}

pre.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = wallpapers.length - 1;
    }

    updateLanding();
    console.log(currentIndex);
    console.log(bullets[currentIndex]);
});

next.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= wallpapers.length) {
        currentIndex = 0;
    }
    updateLanding();
    console.log(currentIndex);
    console.log(bullets[currentIndex]);
});

// end landing wallpaper change
// start toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let navUl = document.querySelector("header .container .nav ul");
const ulLinks = Array.from(document.querySelectorAll("header .container .nav ul li a"));
ulLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navUl.classList.remove("show");
    });
});
toggleMenu.addEventListener("click", () => {
    navUl.classList.toggle("show");
    console.log("clicked");
});
// end toggle menu
// start go to top button
const goUp = document.querySelector(".go-up");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 500) {
        goUp.classList.remove("hide");
    } else {
        goUp.classList.add("hide");
    }
});

goUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
// end go to top button








// start our-skills
let ourSkills = document.querySelector(".our-skill");

let options = {
  threshold: 0.5
};

let spans = document.querySelectorAll(".skills .number");

let skillsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let span = entry.target;
      let target = parseInt(span.dataset.target.replace("%", ""));
      let count = 0;

      let counter = setInterval(() => {
        count++;
        // غير قيمة data-progress (عشان ::before يقرأها)
        span.setAttribute("data-progress", count + "%");
        // غير الـ width للـ progress bar
        span.style.width = count + "%";

        if (count >= target) {
          clearInterval(counter);
        }
      }, 20);

      // يشتغل مرة واحدة بس
      observer.unobserve(span);
    }
  });
}, options);

// راقب كل span
spans.forEach(span => {
  span.setAttribute("data-progress", "0%");
  span.style.width = "0";
  skillsObserver.observe(span);
});


// end our-skills

// start portfolio

const portfolioBoxes = Array.from(document.querySelectorAll(".portfolio .image-container > div"));
const portfolioLinks = Array.from(document.querySelectorAll(".protfolio-links li"));
const showMoreBtn = document.querySelector(".portfolio .more");
let currentIndexOfBoxes = "all";
portfolioLinks.forEach((e) => {
    e.addEventListener("click", () => {
        portfolioLinks.forEach((e) => e.classList.remove("active"))
        e.classList.add("active")
        currentIndexOfBoxes = e.dataset.kind
      

        

        portfolioBoxes.forEach((el, index) => {
            if (e.dataset.kind === "all") {
                el.style.display = "block"
                showMoreBtn.addEventListener("click", showAndHidefunction)

                return
              }
            else {
                el.style.display = "none"
                if (el.dataset.kind === e.dataset.kind) {
                    el.style.display = "block"
                    portfolioBoxes.forEach((box, index) => {
                        if (index >= 8) {
                            box.classList.remove("hidden");
                        }
                    });
                }
            }

        })
    })
})
function showAndHidefunction(e) {
    e.preventDefault()
    if (currentIndexOfBoxes === "all") {
      portfolioBoxes.forEach((box, index) => {
        if (index >= 8) {
            box.classList.toggle("hidden");
        }
    });
    }
    else {
      console.log(currentIndexOfBoxes)
    }
    
}

showMoreBtn.addEventListener("click", showAndHidefunction)

// end portfolio

// start testimonials
const testimonials = document.querySelector(".our-skill .container .testimonials");

const pageComments = document.querySelectorAll(".testimonials .content .box")

for (let i = 0; i < pageComments.length; i++) {
    let bullet2 = document.createElement("div");
    testimonials.querySelector(".bullets-2").appendChild(bullet2);
}
const bullets2 = Array.from(document.querySelectorAll(".our-skill .container .testimonials .bullets-2 div"));
bullets2[0].classList.add("active");
let currentIndex2 = 0;
bullets2.forEach((e, index) => {
    e.addEventListener("click", ((el) => {
        // delet class active
        bullets2.forEach((e) => e.classList.remove("active"))
        // then add class active
        e.classList.add("active")
        // first detect the index of comments to show
        currentIndex2 = index
        // seconde move comments
        pageComments.forEach((el) => el.style.transform = `translateX(${el.offsetWidth * -(index)}px)`)
    }))
})
