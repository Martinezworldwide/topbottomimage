const combineBtn = document.getElementById("combineBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("downloadBtn");

combineBtn.addEventListener("click", async () => {
    const image1 = document.getElementById("image1").files[0];
    const image2 = document.getElementById("image2").files[0];

    if (!image1 || !image2) {
        alert("Please upload both images.");
        return;
    }

    const img1 = await loadImage(URL.createObjectURL(image1));
    const img2 = await loadImage(URL.createObjectURL(image2));

    const canvasWidth = Math.max(img1.width, img2.width);
    const canvasHeight = img1.height + img2.height;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw the top image
    ctx.drawImage(img1, 0, 0, canvasWidth, img1.height);

    // Draw the bottom image
    ctx.drawImage(img2, 0, img1.height, canvasWidth, img2.height);

    canvas.style.display = "block";
    downloadBtn.style.display = "inline-block";
    downloadBtn.href = canvas.toDataURL("image/png");
});

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}
