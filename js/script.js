import galleryItems from '../gallery-items.js';

const gallery = document.querySelector('.js-gallery'),
lightboxEl = document.querySelector('.js-lightbox'),
closeModalBtn = document.querySelector("button[data-action='close-lightbox']"),
lightboxImgEl = document.querySelector('.lightbox__image');
overlay = document.querySelector(".lightbox__overlay"),
itemsMarkup = createGalleryItem(galleryItems);

let currentImg;
gallery.insertAdjacentHTML("beforeend", itemsMarkup);
gallery.addEventListener("click", onImgClick);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", () => closeModal());

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
    if (evt.target.nodeName !== "IMG") {
        return;
    };
    currentImg = evt.target;

  evt.preventDefault();
  addLightboxContent(currentImg);
  openModalClick();
}
// функиция открытия модалки

function openModalClick() {
    lightboxEl.classList.add('is-open');
    document.addEventListener("keydown", onEscKeyPress);
    document.removeEventListener("keyup", imageArrowsFlipping);
}
// функция закрытия модалки
function closeModal() {
    lightboxEl.classList.remove('is-open');
    document.removeEventListener("keydown", onEscKeyPress);
    document.removeEventListener("keyup", imageArrowsFlipping);
}
// функция добавления url изображения в модалку

function addLightboxContent(url) {
  if (lightboxImgEl.src !== "") {
    lightboxImgEl.src = "";
  }
  lightboxImgEl.src = url.dataset.source;
  lightboxImgEl.alt = url.alt;
}
// функция закрытия по ESC
function onEscKeyPress(evt) {
  const ESC_KEY_CODE = "Escape";
  if (evt.code === ESC_KEY_CODE) {
    closeModal();
  }
}
// функция перелистывания стрелками
function imageArrowsFlipping(evt) {
  const parrent = currentImg.closest("li");

  if (evt.code === "ArrowRight") {
    onNextKeyPress(parrent);
  } else if (evt.code === "ArrowLeft") {
    onPrevKeyPress(parrent);
  }
}
function onNextKeyPress(parrent) {
  currentImg = parrent.nextElementSibling.querySelector("img");
  addLightboxContent(currentImg);
}

function onPrevKeyPress(parrent) {
  currentImg = parrent.previousElementSibling.querySelector("img");
  addLightboxContent(currentImg);
}
