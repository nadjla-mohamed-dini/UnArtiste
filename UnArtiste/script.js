import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';




// ==================== SCENE ========================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xf3f1ec);


// ==================== CAMERA ========================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 2.2, 7);

//camera.lookAt(0, 2.2, -8);


// ==================== RENDERER ========================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.outputColorSpace = THREE.SRGBColorSpace;


document
    .getElementById("gallery")
    .appendChild(renderer.domElement);





// ==================== CONTROLE SOURIS ========================

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;

let cameraRotationY = 0;
let cameraRotationX = 0;


renderer.domElement.addEventListener("mousedown", (event) => {

    if (event.button !== 0) return;

    isDragging = true;

    previousMouseX = event.clientX;
    previousMouseY = event.clientY;

});


window.addEventListener("mouseup", () => {

    isDragging = false;

});


window.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    const deltaX =
        event.clientX - previousMouseX;

    const deltaY =
        event.clientY - previousMouseY;


    previousMouseX = event.clientX;
    previousMouseY = event.clientY;


    cameraRotationY -= deltaX * 0.003;
    cameraRotationX -= deltaY * 0.003;


    cameraRotationX = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, cameraRotationX)
    );


    camera.rotation.order = "YXZ";

    camera.rotation.y = cameraRotationY;
    camera.rotation.x = cameraRotationX;

});

// ==================== MATERIAUX ========================

// SOL

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x5c3c2c,
    roughness: 0.75
});


// MURS

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0eee9,
    roughness: 0.85
});


// PLAFOND

const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xe9e6df,
    roughness: 0.9
});


// ==================== SOL ==============================

const floorGeometry = new THREE.PlaneGeometry(
    12,
    22
);

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

floor.position.y = 0;

floor.position.z = -4;

floor.receiveShadow = true;

scene.add(floor);


// ==================== MUR FOND ========================

const backWallGeometry = new THREE.PlaneGeometry(
    12,
    5.5
);

const backWall = new THREE.Mesh(
    backWallGeometry,
    wallMaterial
);

backWall.position.set(
    0,
    2.75,
    -15
);

backWall.receiveShadow = true;

scene.add(backWall);


// ==================== MURS LATERAUX ========================

// Dimensions d'un morceau de mur
const sideWallGeometry = new THREE.BoxGeometry(
    0.25,   // épaisseur
    5.5,    // hauteur
    5.5     // longueur
);


// ============================================================
// MURS GAUCHE
// ============================================================

// Mur gauche AVANT
const leftWallFront = new THREE.Mesh(
    sideWallGeometry,
    wallMaterial
);

leftWallFront.position.set(
    -6,
    2.75,
    1.5
);

leftWallFront.castShadow = true;
leftWallFront.receiveShadow = true;

scene.add(leftWallFront);


// Mur gauche ARRIÈRE
const leftWallBack = new THREE.Mesh(
    sideWallGeometry,
    wallMaterial
);

leftWallBack.position.set(
    -6,
    2.75,
    -8.5
);

leftWallBack.castShadow = true;
leftWallBack.receiveShadow = true;

scene.add(leftWallBack);


// ============================================================
// CADRE MUR GAUCHE
// ============================================================

const frameWidth = 1.6;      // largeur
const frameHeight = 2.4;     // hauteur
const frameThickness = 0.07; // épaisseur du cadre


// ==================== MATERIAUX ========================

const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x252522,
    roughness: 0.45
});
const canvasMaterial = new THREE.MeshStandardMaterial({
    color: 0xe8e3d9,
    roughness: 0.9
});


// ============================
// CHARGER L'ŒUVRE SAUVEGARDÉE
// ============================

const savedArtwork = localStorage.getItem("oeuvre1");

console.log(
    "Œuvre trouvée dans le stockage :",
    savedArtwork ? "OUI" : "NON"
);

if (savedArtwork) {

    const image = new Image();

    image.onload = () => {

        console.log("Image chargée :", image.width, "x", image.height);

        const texture = new THREE.Texture(image);

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        canvasMaterial.map = texture;
        canvasMaterial.color.set(0xffffff);
        canvasMaterial.needsUpdate = true;

        console.log("Œuvre affichée sur la toile !");
    };

    image.onerror = () => {
        console.error("ERREUR : impossible de charger l'image.");
    };

    image.src = savedArtwork;
}

// Vérifier si une œuvre a été enregistrée


// ==================== POSITION ========================

// Le mur gauche est à X = -6
// On place le cadre légèrement devant le mur

const frameX = -5.84;
const frameY = 3;
const frameZ = 1.5;


// ==================== TOILE ========================

const canvasGeometry = new THREE.PlaneGeometry(
    frameWidth - 0.14,
    frameHeight - 0.14
);

const canvas = new THREE.Mesh(
    canvasGeometry,
    canvasMaterial
);


canvas.rotation.y = Math.PI / 2;

canvas.position.set(
    frameX + 0.02,
    frameY,
    frameZ
);

scene.add(canvas);

// ============================
// DEUXIÈME CADRE - MUR DROIT
// ============================

const frame2X = 5.84;
const frame2Y = 3;
const frame2Z = 1.5;

const canvasMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xe8e3d9,
    roughness: 0.9
});


const canvasGeometry2 = new THREE.PlaneGeometry(
    frameWidth - 0.14,
    frameHeight - 0.14
);

const canvas2 = new THREE.Mesh(
    canvasGeometry2,
    canvasMaterial2
);

canvas2.rotation.y = -Math.PI / 2;

canvas2.position.set(
    frame2X + 0.05,
    frame2Y,
    frame2Z
);

scene.add(canvas2);

// ==================== CLICS ET DEPLACEMENT ========================

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let targetPosition = null;


renderer.domElement.addEventListener("click", (event) => {

    const rect =
        renderer.domElement.getBoundingClientRect();


    mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    mouse.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;


    raycaster.setFromCamera(
        mouse,
        camera
    );


    // CLIC SUR UNE TOILE

    const artworkIntersects =
        raycaster.intersectObjects([
            canvas,
            canvas2
        ]);


    if (artworkIntersects.length > 0) {

        console.log("TOILE CLIQUÉE");

        window.location.href = "artwork.html";

        return;
    }


    // CLIC SUR LE SOL

    const floorIntersects =
        raycaster.intersectObject(floor);


    if (floorIntersects.length > 0) {

        const point =
            floorIntersects[0].point;

        console.log("SOL CLIQUÉ :", point);

        targetPosition =
            point.clone();

        targetPosition.y =
            camera.position.y;
    }

});


// Cadre haut
const frame2Top = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameThickness,
        frameWidth
    ),
    frameMaterial
);

frame2Top.position.set(
    frame2X,
    frame2Y + frameHeight / 2,
    frame2Z
);

scene.add(frame2Top);


// Cadre bas
const frame2Bottom = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameThickness,
        frameWidth
    ),
    frameMaterial
);

frame2Bottom.position.set(
    frame2X,
    frame2Y - frameHeight / 2,
    frame2Z
);

scene.add(frame2Bottom);


// Cadre gauche
const frame2Left = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameHeight,
        frameThickness
    ),
    frameMaterial
);

frame2Left.position.set(
    frame2X,
    frame2Y,
    frame2Z - frameWidth / 2
);

scene.add(frame2Left);


// Cadre droit
const frame2Right = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameHeight,
        frameThickness
    ),
    frameMaterial
);

frame2Right.position.set(
    frame2X,
    frame2Y,
    frame2Z + frameWidth / 2
);

scene.add(frame2Right);

// ==================== CADRE HAUT ========================

const frameTop = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameThickness,
        frameWidth
    ),
    frameMaterial
);

frameTop.position.set(
    frameX,
    frameY + frameHeight / 2,
    frameZ
);

scene.add(frameTop);


// ==================== CADRE BAS ========================

const frameBottom = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameThickness,
        frameWidth
    ),
    frameMaterial
);

frameBottom.position.set(
    frameX,
    frameY - frameHeight / 2,
    frameZ
);

scene.add(frameBottom);


// ==================== CADRE GAUCHE ========================

const frameLeft = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameHeight,
        frameThickness
    ),
    frameMaterial
);

frameLeft.position.set(
    frameX,
    frameY,
    frameZ - frameWidth / 2
);

scene.add(frameLeft);


// ==================== CADRE DROIT ========================

const frameRight = new THREE.Mesh(
    new THREE.BoxGeometry(
        frameThickness,
        frameHeight,
        frameThickness
    ),
    frameMaterial
);

frameRight.position.set(
    frameX,
    frameY,
    frameZ + frameWidth / 2
);

scene.add(frameRight);;
// ============================================================
// MURS DROIT
// ============================================================

// Mur droit AVANT
const rightWallFront = new THREE.Mesh(
    sideWallGeometry,
    wallMaterial
);

rightWallFront.position.set(
    6,
    2.75,
    1.5
);

rightWallFront.castShadow = true;
rightWallFront.receiveShadow = true;

scene.add(rightWallFront);


// Mur droit ARRIÈRE
const rightWallBack = new THREE.Mesh(
    sideWallGeometry,
    wallMaterial
);

rightWallBack.position.set(
    6,
    2.75,
    -8.5
);

rightWallBack.castShadow = true;
rightWallBack.receiveShadow = true;

scene.add(rightWallBack);


// ==================== PLAFOND ========================

const ceilingGeometry = new THREE.PlaneGeometry(
    12,
    22
);

const ceiling = new THREE.Mesh(
    ceilingGeometry,
    ceilingMaterial
);

ceiling.rotation.x = Math.PI / 2;

ceiling.position.set(
    0,
    5.5,
    -4
);

ceiling.receiveShadow = true;

scene.add(ceiling);


// ==================== ECLAIRAGE 

const ambientLight = new THREE.AmbientLight(
    0xfffdf7,
    1.5
);

scene.add(ambientLight);


//LUMIERE PRINCIPALE 

const mainLight = new THREE.DirectionalLight(
    0xfff8ed,
    2.5
);

mainLight.position.set(
    2,
    5,
    4
);

mainLight.castShadow = true;

mainLight.shadow.mapSize.width = 2048;

mainLight.shadow.mapSize.height = 2048;

scene.add(mainLight);


//LUMIERE FOND 

const backLight = new THREE.PointLight(
    0xfff4e8,
    25,
    15
);

backLight.position.set(
    0,
    3.5,
    -11
);

scene.add(backLight);

//ANIMATION 

function animate() {

    requestAnimationFrame(animate);


    // Déplacement de la caméra

    if (targetPosition) {

        const speed = 0.05;

        camera.position.lerp(
            targetPosition,
            speed
        );


        if (
            camera.position.distanceTo(targetPosition) < 0.05
        ) {

            camera.position.copy(targetPosition);

            targetPosition = null;
        }
    }


    renderer.render(
        scene,
        camera
    );
}

animate();




//RESPONSIVE 

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});