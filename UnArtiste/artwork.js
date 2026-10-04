const artworkFrame = document.getElementById("artworkFrame");
const artworkInput = document.getElementById("artworkInput");
const emptyArtwork = document.getElementById("emptyArtwork");
const saveButton = document.getElementById("saveButton");

let selectedImage = null;


// ============================
// CLIQUER SUR LE CADRE
// ============================

artworkFrame.addEventListener("click", () => {

    artworkInput.click();

});


// ============================
// CHOISIR UNE IMAGE
// ============================

artworkInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {
        return;
    }


    // Vérifier que c'est une image
    if (!file.type.startsWith("image/")) {

        alert("Veuillez choisir une image.");

        return;
    }


    // Lire l'image
    const reader = new FileReader();

    reader.onload = function(event) {

        selectedImage = event.target.result;


        // Supprimer le message
        if (emptyArtwork) {
            emptyArtwork.remove();
        }


        // Vérifier s'il existe déjà une image
        let image = artworkFrame.querySelector(".artwork-image");


        // Si aucune image, on la crée
        if (!image) {

            image = document.createElement("img");

            image.classList.add("artwork-image");

            artworkFrame.appendChild(image);
        }


        // Afficher l'image
        image.src = selectedImage;


        // Afficher le bouton Enregistrer
        saveButton.style.display = "block";

    };


    reader.readAsDataURL(file);

});


// ============================
// ENREGISTRER
// ============================

saveButton.addEventListener("click", () => {

    if (!selectedImage) {
        return;
    }


    localStorage.setItem(
        "oeuvre1",
        selectedImage
    );


    alert("Œuvre enregistrée !");

});