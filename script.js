document.addEventListener("DOMContentLoaded", function () {
    const navbarSearch = document.getElementById("navbar-search");
    const toggleButtons = document.querySelectorAll("[data-collapse-toggle='navbar-search']");

    // Fungsi untuk mengganti visibilitas kolom pencarian
    function toggleSearchBar() {
        navbarSearch.classList.toggle("hidden");
    }

    // Fungsi untuk mengganti visibilitas menu di perangkat mobile
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector(".md\\:hidden");
        mobileMenu.classList.toggle("hidden");
    }

    // Menambahkan event listener ke tombol-tombol untuk mengganti visibilitas kolom pencarian
    toggleButtons.forEach((button) => {
        button.addEventListener("click", function () {
            toggleSearchBar();
        });
    });

    // Event listener untuk mengganti visibilitas menu di perangkat mobile
    document.querySelector("[data-collapse-toggle='navbar-menu']").addEventListener("click", function () {
        toggleMobileMenu();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const navbarTitle = document.getElementById("navbar-title");

    // Fungsi untuk mengganti teks sesuai dengan mode
    function updateNavbarTitle() {
        const isMobile = window.innerWidth <= 768; // Ganti angka 768 dengan ukuran breakpoint perangkat Anda

        if (isMobile) {
            navbarTitle.textContent = "CDC";
        } else {
            navbarTitle.textContent = "Career Development Center";
        }
    }

    // Panggil fungsi saat halaman dimuat dan saat ukuran layar berubah
    updateNavbarTitle();
    window.addEventListener("resize", updateNavbarTitle);
});

// Header time scroll
const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
    let time = new Date();
    displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
    setTimeout(showTime, 1000);
}

showTime();

// Date
function updateDate() {
    let today = new Date();

    // return number
    let dayName = today.getDay(),
        dayNum = today.getDate(),
        month = today.getMonth(),
        year = today.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // value -> ID of the html element
    const IDCollection = ["day", "daynum", "month", "year"];
    // return value array with number as a index
    const val = [dayWeek[dayName], dayNum, months[month], year];
    for (let i = 0; i < IDCollection.length; i++) {
        document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
    }
}

updateDate();
setInterval(updateDate, 1000);

//Profile Menu
const userPic = document.getElementById("userPic");
const menuContainer = document.getElementById("menuContainer");

// Tampilkan menu saat gambar diklik
userPic.addEventListener("click", function (event) {
    event.stopPropagation();
    menuContainer.classList.toggle("hidden");
});

// Sembunyikan menu saat klik dilakukan di luar elemen gambar dan menu
document.addEventListener("click", function (event) {
    const targetElement = event.target;
    if (!menuContainer.contains(targetElement) && targetElement !== userPic) {
        menuContainer.classList.add("hidden");
    }
});

// Carousel Image
const carousel = document.querySelector("#default-carousel");
const items = carousel.querySelectorAll("[data-carousel-item]");
const prevButton = carousel.querySelector("[data-carousel-prev]");
const nextButton = carousel.querySelector("[data-carousel-next]");
const indicators = carousel.querySelectorAll("[data-carousel-slide-to]");

let activeIndex = 0;
let intervalId = null;

const showSlide = (index) => {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.remove("hidden");
            item.classList.add("duration-700");
        } else {
            item.classList.add("hidden");
            item.classList.remove("duration-700");
        }
    });

    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.setAttribute("aria-current", "true");
        } else {
            indicator.setAttribute("aria-current", "false");
        }
    });
};

const showNextSlide = () => {
    activeIndex = (activeIndex + 1) % items.length;
    showSlide(activeIndex);
};

const startCarousel = () => {
    intervalId = setInterval(showNextSlide, 3000);
};

const stopCarousel = () => {
    clearInterval(intervalId);
};

prevButton.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    showSlide(activeIndex);
    stopCarousel();
});

nextButton.addEventListener("click", () => {
    showNextSlide();
    stopCarousel();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        activeIndex = index;
        showSlide(activeIndex);
        stopCarousel();
    });
});

carousel.addEventListener("mouseover", stopCarousel);
carousel.addEventListener("mouseout", startCarousel);

showSlide(activeIndex);
startCarousel();
