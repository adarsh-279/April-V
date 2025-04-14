let touchStartX = 0;
let touchEndX = 0;

const memories = [
    {
        image: "./images/img1.jpg",
        message: "The day we first met school ke bahar ❤️",
        date: "First Meet"
    },
    {
        image: "./images/img2.jpg",
        message: "Aisa lagta hai sapna sach hogya 🥺",
        date: "Our First School Pic"
    },
    {
        image: "./images/img3.jpg",
        message: "26 December kaise bhul skta hai koi 🤔 ?? ",
        date: "First Date"
    },
    {
        image: "./images/img4.jpg",
        message: "Kitni mushkil se mile th but acha khasa time spend hogya tha saath mai 💗",
        date: "1st Anniversary Day"
    },
    {
        image: "./images/img5.jpg",
        message: "Farewell ki shaam apke naam 🙇",
        date: "Special Moments"
    },
    {
        image: "./images/img6.jpg",
        message: "Yaad hai na Kutta billi wala photo 🤣",
        date: "Special Moments"
    },
    {
        image: "./images/img7.jpg",
        message: "One of the best days of school 🥹",
        date: "Special Moments"
    },
    {
        image: "./images/img8.jpg",
        message: "Kuch nhi bolunga 🤫",
        date: "Special Moments"
    },
    {
        image: "./images/img9.jpg",
        message: "Thank you for everything 💗🥹",
        date: "Together Forever"
    }
];

let currentIndex = 0;

function randomizeBalloonPositions() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        const randomOffset = Math.random() * 100 - 1; // Random offset between -10px and 10px
        balloon.style.marginTop = `${randomOffset}px`;
    });
}
function handleCakeClick() {
    const candle = document.getElementById('candle');
    const cakeSection = document.getElementById('cakeSection');
    const messageSection = document.getElementById('messageSection');
    const balloonContainer = document.getElementById('balloonContainer');

    if (candle && cakeSection && messageSection && balloonContainer) {
        candle.style.display = 'none';
        setTimeout(() => {
            cakeSection.style.display = 'none';
            balloonContainer.classList.remove('hidden');
            randomizeBalloonPositions(); // Randomize positions before showing
            setTimeout(() => {
                balloonContainer.classList.add('visible');
                setTimeout(() => {
                    balloonContainer.style.display = 'none';
                    messageSection.classList.remove('hidden');
                    setTimeout(() => {
                        messageSection.classList.add('visible');
                    }, 50);
                }, 2000); // Duration for balloons to rise
            }, 50);
        }, 500);
    } else {
        console.error('One or more elements are missing.');
    }
}

// Ensure other functions are correctly accessing elements and updating the DOM

function showMemories() {
    const messageSection = document.getElementById('messageSection');
    const gallerySection = document.getElementById('gallerySection');

    if (messageSection && gallerySection) {
        messageSection.classList.remove('visible');
        setTimeout(() => {
            messageSection.classList.add('hidden');
            gallerySection.classList.remove('hidden');
            setTimeout(() => {
                gallerySection.classList.add('visible');
                updateGallery();
                createDots();
                addSwipeListeners(); // Add this line
            }, 50);
        }, 500);
    } else {
        console.error('Message or gallery section is missing.');
    }
}

function updateGallery() {
    const currentImage = document.getElementById('currentImage');
    const imageDate = document.getElementById('imageDate');
    const imageMessage = document.getElementById('imageMessage');

    currentImage.style.opacity = '0';

    setTimeout(() => {
        currentImage.src = memories[currentIndex].image;
        imageDate.textContent = memories[currentIndex].date;
        imageMessage.textContent = memories[currentIndex].message;
        currentImage.style.opacity = '1';
        updateDots();
    }, 300);
}

function createDots() {
    const dotsContainer = document.getElementById('dotsContainer');
    dotsContainer.innerHTML = '';

    memories.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % memories.length;
    updateGallery();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + memories.length) % memories.length;
    updateGallery();
}

function handleGesture() {
    if (touchEndX < touchStartX) nextSlide();
    if (touchEndX > touchStartX) prevSlide();
}

function addSwipeListeners() {
    const gallery = document.querySelector('.gallery');
    
    gallery.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    gallery.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
}