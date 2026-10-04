import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';


export function setupClicks(
    renderer,
    camera,
    canvas,
    canvas2,
    floor
) {

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


        // Clic sur une toile
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


        // Clic sur le sol
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


    return {

    update: () => {

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

    }

};

}