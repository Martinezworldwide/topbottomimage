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

    // Set a fixed width to fit within one page
    const pageWidth = 800; // Standard printable width
    const scaleFactor1 = pageWidth / img1.width;
    const scaleFactor2 = pageWidth / img2.width;

    const img1Height = img1.height * scaleFactor1;
    const img2Height = img2.height * scaleFactor2;
    const totalHeight = img1Height + img2Height;

    // Set the canvas size
    canvas.width = pageWidth;
    canvas.height = totalHeight;

    // Draw images onto the canvas
    ctx.drawImage(img1, 0, 0, pageWidth, img1Height);
    ctx.drawImage(img2, 0, img1Height, pageWidth, img2Height);

    // Display the canvas
    canvas.style.display = "block";

    // Scale canvas to fit on one page for printing
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    alert("Your combined image is ready. Take a screenshot or print it as one page.");
});

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

