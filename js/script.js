import galleryItems from '../gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector("button[data-action='close-lightbox']");
const lightboxImgEl = document.querySelector('.lightbox__image');
const overlay = document.querySelector(".lightbox__overlay");
const itemsMarkup = createGalleryItem(galleryItems);
let currentIndex;

gallery.insertAdjacentHTML("beforeend", itemsMarkup);



// функция создания разметки
function createGalleryItem(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
    `}).join('');
};
// функция фильтра кликов делегирования
function onImgClick(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== "IMG") {
        return;
    }
  
    let imageRef = evt.target;
    let largeImageURL = imageRef.dataset.source;
    lightboxImgEl.src = largeImageURL;
    currentIndex = +imageRef.dataset.index;
    onOpenModal();
};
// функиция открытия модалки

function onOpenModal() {
    lightboxEl.classList.add('is-open');
    window.addEventListener("keydown", onEscKeyPress);
    overlay.addEventListener("click", onOverlayClick);
};
// функция закрытия модалки
function closeModal() {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.src = '#';
    window.removeEventListener("keydown", onEscKeyPress);
    overlay.removeEventListener("click", onOverlayClick);
};


// функция закрытия по ESC
const onOverlayClick = evt =>
  evt.currentTarget === evt.target ? closeModal() : '';
    
function onEscKeyPress(evt) {
  const ESC_KEY_CODE = "Escape";
  if (evt.code === ESC_KEY_CODE) {
    closeModal();
  }
  };


gallery.addEventListener("click", onImgClick);
closeModalBtn.addEventListener("click", closeModal);


