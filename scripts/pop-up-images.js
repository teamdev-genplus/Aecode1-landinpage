const images = [];
for (let i = 1; i <= 28; i++) {
  images.push(`Imagenes/Collaborators/Artboard 2 copy ${i}.png`);
}

const imageElements = document.querySelectorAll(".collaborator-item");
let currentIndexes = Array.from(
  { length: imageElements.length },
  (_, i) => i % images.length
);
let animatingIndexes = new Set();
let isPaused = false;
let timeoutId;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showRandomImages() {
  if (isPaused) {
    // Si la página no está visible, no continuar con las animaciones
    return;
  }

  const numImagesToChange = getRandomInt(3, 6); // Cambiar entre 3 a 5 imágenes
  const indicesToChange = [];

  // Obtener índices únicos aleatorios que no estén ya animándose
  while (indicesToChange.length < numImagesToChange) {
    const randomIndex = getRandomInt(0, imageElements.length);
    if (
      !indicesToChange.includes(randomIndex) &&
      !animatingIndexes.has(randomIndex)
    ) {
      indicesToChange.push(randomIndex);
    }
  }

  indicesToChange.forEach((index) => {
    animatingIndexes.add(index);
    const imageElement = imageElements[index];
    const currentIndex = currentIndexes[index];

    // Usar requestAnimationFrame para optimizar la animación
    imageElement.classList.remove("show");
    imageElement.classList.add("hide");

    setTimeout(() => {
      let newIndex;
      do {
        newIndex = getRandomInt(0, images.length);
      } while (currentIndexes.includes(newIndex));

      imageElement.src = images[newIndex];
      currentIndexes[index] = newIndex;

      imageElement.classList.remove("hide");
      imageElement.classList.add("show");

      // Quitar el índice del set después de la animación
      requestAnimationFrame(() => {
        setTimeout(() => {
          animatingIndexes.delete(index);
        }, 500); // Duración de la animación
      });
    }, 800);
  });

  timeoutId = setTimeout(showRandomImages, getRandomInt(3000, 6000));
}

function handleVisibilityChange() {
  if (document.hidden) {
    isPaused = true;
    clearTimeout(timeoutId); // Detener el timeout actual
  } else {
    isPaused = false;
    showRandomImages(); // Reanudar las animaciones
  }
}

document.addEventListener("DOMContentLoaded", () => {
  imageElements.forEach((element, index) => {
    element.src = images[index % images.length];
  });

  setTimeout(showRandomImages, 3000);
});

document.addEventListener("visibilitychange", handleVisibilityChange);
