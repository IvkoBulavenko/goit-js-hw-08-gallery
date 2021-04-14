import galleryItems from '../gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');



const galleryItemsMarkup = createGalleryItem(galleryItems);

gallery.insertAdjacentHTML('afterbegin', galleryItemsMarkup)
gallery.addEventListener('click', openModalClick);
lightboxEl.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal)


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

function openModalClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    };
    evt.preventDefault()
    lightboxEl.classList.add('is-open');
    lightboxImgEl.setAttribute('src', evt.target.getAttribute('data-source'));
};

function closeModalClick() {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.removeAttribute('src');
};


function closeModal(evt) {
    if (evt.target.classList.contains('lightbox__overlay')) {
        closeModalClick();
    };
    if (evt.target.classList.contains('lightbox__button')) {
        closeModalClick();
    };
    if (evt.code === 'Escape') {
        closeModalClick();
    };
};


