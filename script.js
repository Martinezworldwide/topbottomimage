const combineBtn = document.getElementById("combineBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

combineBtn.addEventListener("click", async () => {
    const image1 = document.getElementById("image1").files[0];
    const image2 = document.getElementById("image2").files[0];

    if (!image1 || !image2) {
        alert("Please upload both images.");
        return;
    }

    const img1 = await loadImage(URL.createObjectURL(image1));
    const img2 = await loadImage(URL.createObjectURL(image2));

    const viewportWidth = document.body.clientWidth;
    const maxCanvasWidth = viewportWidth * 0.9;

    const canvasWidth = Math.min(maxCanvasWidth, Math.max(img1.width, img2.width));
    const scaleFactor1 = canvasWidth / img1.width;
    const scaleFactor2 = canvasWidth / img2.width;

    const img1Height = img1.height * scaleFactor1;
    const img2Height = img2.height * scaleFactor2;
    const canvasHeight = img1Height + img2Height;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw the top image
    ctx.drawImage(img1, 0, 0, canvasWidth, img1Height);

    // Draw the bottom image
    ctx.drawImage(img2, 0, img1Height, canvasWidth, img2Height);

    canvas.style.display = "block";
    alert("You can take a screenshot of the combined image now.");
});

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

