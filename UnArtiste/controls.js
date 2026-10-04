// ==================== CONTROLE SOURIS ====================

export function setupMouseControls(renderer, camera) {

    let isDragging = false;

    let previousMouseX = 0;
    let previousMouseY = 0;

    let cameraRotationY = 0;
    let cameraRotationX = 0;


    // Quand on commence à cliquer
    renderer.domElement.addEventListener("mousedown", (event) => {

        if (event.button !== 0) return;

        isDragging = true;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;

    });


    // Quand on relâche la souris
    window.addEventListener("mouseup", () => {

        isDragging = false;

    });


    // Quand on bouge la souris
    window.addEventListener("mousemove", (event) => {

        if (!isDragging) return;

        const deltaX =
            event.clientX - previousMouseX;

        const deltaY =
            event.clientY - previousMouseY;


        previousMouseX = event.clientX;
        previousMouseY = event.clientY;


        // Sensibilité
        cameraRotationY -= deltaX * 0.003;
        cameraRotationX -= deltaY * 0.003;


        // Limiter le mouvement vertical
        cameraRotationX = Math.max(
            -Math.PI / 3,
            Math.min(Math.PI / 3, cameraRotationX)
        );


        // Rotation de la caméra
        camera.rotation.order = "YXZ";

        camera.rotation.y = cameraRotationY;
        camera.rotation.x = cameraRotationX;

    });

}