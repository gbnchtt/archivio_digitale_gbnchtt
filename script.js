const categories = [
    {"category": "animali", "count": 964},
    {"category": "mare", "count": 408},
    {"category": "lago", "count": 186},
    {"category": "party", "count": 356},
    {"category": "cibo", "count": 503},
    {"category": "fiori", "count": 70},
    {"category": "tramonto", "count": 389},
    {"category": "luna", "count": 93},
    {"category": "montagna", "count": 142},
    {"category": "città", "count": 215},
    {"category": "persone", "count": 321},
    {"category": "arte", "count": 58},
    {"category": "sport", "count": 104},
    {"category": "famiglia", "count": 177},
    {"category": "viaggi", "count": 201},
    {"category": "tutte", "count": 3987}
];

// Calculate total images - excluding "tutte" category
const totalImages = categories
    .filter(cat => cat.category !== "tutte")
    .reduce((sum, cat) => sum + cat.count, 0);

// Add this after the header creation
const totalCount = document.createElement('div');
totalCount.className = 'total-count';
document.querySelector('.header').appendChild(totalCount);

// Animate the number counting up
function animateCount(element, target) {
    // Show number immediately without animation
    element.textContent = `numero totale immagini: ${Math.floor(target)}`;
}

// Start the animation
animateCount(totalCount, totalImages);

function images(box, categories) {
    const container = document.querySelector(box);
    
    categories.forEach((item) => {
        const categoryElement = createCategoryElement(item.category, item.count);
        
        // Add click handler for opening gallery
        categoryElement.addEventListener('click', () => {
            window.location.href = `archive.html?category=${item.category}`;
        });
        
        container.appendChild(categoryElement);
    });
}

function createCategoryElement(category, count) {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';
    
    const title = document.createElement('span');
    title.className = 'category-title';
    title.textContent = category;
    
    const countSpan = document.createElement('span');
    countSpan.className = 'count-number';
    countSpan.textContent = `[${count}]`; // Added square brackets around the count
    
    categoryItem.appendChild(title);
    categoryItem.appendChild(countSpan);
    
    return categoryItem;
}

// Initialize with categories
images('#container_animals', categories);

// Remove these functions completely
/*
function glitchText(element) {
    const finalText = element.textContent;
    const fps = 60;
    const duration = 3; // seconds
    const totalFrames = fps * duration;
    let iterations = 0;
    
    // Separate characters for numbers and letters
    const numbers = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const interval = setInterval(() => {
        element.textContent = finalText
            .split('')
            .map((char, index) => {
                if(index < iterations) {
                    return finalText[index];
                }
                // Handle numbers and letters differently
                if (!isNaN(char)) {
                    return numbers[Math.floor(Math.random() * numbers.length)];
                } else if (char.match(/[a-zA-Z]/)) {
                    return letters[Math.floor(Math.random() * letters.length)];
                }
                return char; // Keep other characters unchanged
            })
            .join('');
        
        iterations += finalText.length / totalFrames;
        
        if(iterations >= finalText.length) {
            clearInterval(interval);
            element.textContent = finalText;
        }
    }, 1000/fps);
}

function applyGlitchEffect() {
    // Apply only to count numbers
    document.querySelectorAll('.count-number').forEach(element => {
        setTimeout(() => glitchText(element), Math.random() * 1000);
    });
}
*/

// Replace the images function override with a simple version
const originalImages = images;
images = function(box, categories) {
    originalImages(box, categories);
}

// Add the gallery function
function addViewToggle(galleryOverlay) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'view-toggle';
    toggleBtn.innerHTML = '⇄'; // Horizontal scroll icon
    
    let viewState = 'horizontal';
    
    toggleBtn.onclick = () => {
        const row = galleryOverlay.querySelector('.gallery-row');
        
        if (viewState === 'horizontal') {
            row.classList.remove('horizontal-view');
            row.classList.add('grid-view');
            viewState = 'grid';
            toggleBtn.innerHTML = '⊞'; // Grid icon
        } else {
            row.classList.remove('grid-view');
            row.classList.add('horizontal-view');
            viewState = 'horizontal';
            toggleBtn.innerHTML = '⇄';
        }
    };
    
    galleryOverlay.appendChild(toggleBtn);
}

function toggleGalleryView(galleryOverlay) {
    const row = galleryOverlay.querySelector('.gallery-row');
    row.classList.toggle('vertical-view');
}

function openGallery(category) {
    const existingGallery = document.querySelector('.gallery-overlay');
    if (existingGallery) {
        existingGallery.remove();
    }

    const galleryOverlay = document.createElement('div');
    galleryOverlay.className = 'gallery-overlay';
    
    const galleryGrid = document.createElement('div');
    galleryGrid.className = 'gallery-grid';
    
    const categoryData = categories.find(c => c.category === category);
    const count = categoryData ? categoryData.count : 0;

    // Create array of promises to check image existence
    const loadPromises = [];
    for (let i = 0; i < count; i++) {
        const img = new Image();
        img.src = `./images/${category}/IMG_${i}.jpeg`;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-image-wrapper';
        
        const promise = new Promise((resolve) => {
            img.onload = () => {
                img.className = 'gallery-image';
                img.onclick = () => {
                    const lightbox = createLightbox(img.src, category);
                    document.body.appendChild(lightbox);
                };
                wrapper.appendChild(img);
                resolve(wrapper);
            };
            img.onerror = () => resolve(null);
        });
        
        loadPromises.push(promise);
    }

    // Wait for all images to load or fail
    Promise.all(loadPromises).then(wrappers => {
        wrappers.filter(wrapper => wrapper !== null)
               .forEach(wrapper => galleryGrid.appendChild(wrapper));
        
        galleryOverlay.appendChild(galleryGrid);
        document.querySelector('#main').appendChild(galleryOverlay);
    });
}

function createLightbox(imageSrc, category) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.src = imageSrc;
    
    // Add navigation arrows
    const prevButton = document.createElement('button');
    prevButton.className = 'nav-button prev';
    prevButton.innerHTML = '←';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'nav-button next';
    nextButton.innerHTML = '→';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-lightbox';
    closeButton.innerHTML = '×';
    
    // Get current image number and total count
    const currentImgNum = parseInt(imageSrc.match(/IMG_(\d+)/)[1]);
    const totalImages = categories.find(c => c.category === category).count;
    
    // Keep track of current image index
    let currentIndex = currentImgNum;
    
    // Navigation handlers with updated logic
    prevButton.onclick = (e) => {
        e.stopPropagation();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1; // Changed from 1 to 0
        img.src = `./images/${category}/IMG_${currentIndex}.jpeg`; // Removed -bassa.jpeg suffix
    };
    
    nextButton.onclick = (e) => {
        e.stopPropagation();
        currentIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0; // Changed logic to handle 0-based indexing
        img.src = `./images/${category}/IMG_${currentIndex}.jpeg`; // Removed -bassa.jpeg suffix
    };
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === 'Escape') {
            closeButton.click();
        }
    });
    
    // Close handlers
    closeButton.onclick = () => {
        document.body.removeChild(lightbox);
        document.removeEventListener('keydown', handleKeyPress);
    };
    
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
    
    lightbox.appendChild(img);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    lightbox.appendChild(closeButton);
    lightbox.classList.add('active');
    
    return lightbox;
}

// Modify the calculateTotalImages function
function calculateTotalImages(categories) {
    return categories
        .filter(cat => cat.category !== "tutte") // Exclude "tutte" category
        .reduce((total, cat) => total + cat.count, 0);
}

// Update the total count display
function updateTotalCount() {
    const totalImages = calculateTotalImages(categories);
    const totalCountElement = document.querySelector('.total-count');
    if (totalCountElement) {
        totalCountElement.textContent = `Totale immagini: ${totalImages}`;
    }
}

// Call updateTotalCount after initializing categories
window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('archive.html')) {
        // --- pagina archivio: NON svuotare il menu ---
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category') || 'animali';
        // carica direttamente la categoria selezionata
        loadCategoryData(cat).then(setupCategoryListeners);
    } else {
        // --- pagina index (o altro) ---
        const container = document.getElementById('container_animals');
        if (container) container.innerHTML = '';
        // Inizializza categorie ordinate per count decrescente
        const sortedCategories = [...categories].filter(c => c.category !== "tutte").sort((a, b) => b.count - a.count);
        images('#container_animals', sortedCategories);

        // Evidenzia categoria se presente nell'URL
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCategory = urlParams.get('category');
        if (selectedCategory) {
            setTimeout(() => {
                document.querySelectorAll('.category-item').forEach(item => {
                    const title = item.querySelector('.category-title');
                    if (title && title.textContent === selectedCategory) {
                        item.classList.add('active');
                        title.style.color = '#87A989';
                        item.querySelector('.count-number').style.color = '#87A989';
                    }
                });
                openGallery(selectedCategory);
            }, 100);
        }

        updateTotalCount();
    }
});

function createCategoryImages(category) {
    const images = [];
    // Generate array of image paths for each category
    for(let i = 0; i < categories.find(cat => cat.category === category).count; i++) {
        images.push(`./images/${category}/IMG_${i}.jpeg`);
    }
    return images;
}

function loadCategoryImages(category) {
    const container = document.getElementById('container_animals');
    container.innerHTML = '';
    
    const images = createCategoryImages(category);
    
    images.forEach((imgPath, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        
        const img = document.createElement('img');
        img.src = imgPath;
        
        // Add error handling
        img.onerror = () => {
            console.error('Failed to load image:', {
                category,
                path: imgPath,
                index
            });
        };
        
        imgContainer.appendChild(img);
        container.appendChild(imgContainer);
    });
}
