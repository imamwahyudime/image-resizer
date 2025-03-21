
      const imageInput = document.getElementById("imageInput");
      const preview = document.getElementById("preview");
      const widthInput = document.getElementById("widthInput");
      const heightInput = document.getElementById("heightInput");
      const resizeButton = document.getElementById("resizeButton");
      const downloadLink = document.getElementById("downloadLink");
      const aspectRatioCheckbox = document.getElementById("aspectRatio");
      const imageInfo = document.getElementById("imageInfo");

      const infoButton = document.getElementById("infoButton");

      const infoContent = document.getElementById("infoContent");

      let originalWidth = 0;
      let originalHeight = 0;
      let originalSize = 0;

      function updateImageInfo() {
        if (originalWidth && originalHeight && originalSize) {
          imageInfo.textContent = `Original: ${originalWidth}x${originalHeight}, Size: ${formatBytes(
            originalSize
          )}`;
        } else {
          imageInfo.textContent = "";
        }
      }

      function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return (
          parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        );
      }

      function resetDownloadLink() {
        downloadLink.style.display = "none"; //hide the link
      }
      function grayDownloadLink() {
        downloadLink.style.color = "gray"; //hide the link
      }

     imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
            preview.style.margin = "auto";

            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
              originalWidth = img.width;
              originalHeight = img.height;
              originalSize = file.size;
              updateImageInfo();
                updatePreviewSize(); // Update preview size when a new image is loaded
            };
        };
        reader.readAsDataURL(file);
        } else {
          preview.src = "#";
          preview.style.display = "none";
          originalWidth = 0;
          originalHeight = 0;
          originalSize = 0;
          updateImageInfo();
        }
        resetDownloadLink();
    updatePreviewSize(); // Update preview size when dimensions change
      });

      widthInput.addEventListener("input", function () {
        if (aspectRatioCheckbox.checked && originalWidth && originalHeight) {
          const newWidth = parseInt(widthInput.value);
          if (!isNaN(newWidth)) {
            heightInput.value = Math.round(
              (newWidth / originalWidth) * originalHeight
            );
          }
        }
        grayDownloadLink();
        updatePreviewSize(); // Added this line
      });

      heightInput.addEventListener("input", function () {
        if (aspectRatioCheckbox.checked && originalWidth && originalHeight) {
          const newHeight = parseInt(heightInput.value);
          if (!isNaN(newHeight)) {
            widthInput.value = Math.round(
              (newHeight / originalHeight) * originalWidth
            );
          }
        }
        grayDownloadLink();
        updatePreviewSize(); // Added this line
      });

      resizeButton.addEventListener("click", function () {
        const img = new Image();
        img.src = preview.src;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
        };
      });

          function updatePreviewSize() {
    let newWidth = parseInt(widthInput.value);
    let newHeight = parseInt(heightInput.value);

    if (isNaN(newWidth)) {
        newWidth = originalWidth;
    }
    if (isNaN(newHeight)) {
        newHeight = originalHeight;
    }

    preview.style.width = newWidth + 'px';
    preview.style.height = newHeight + 'px';
}


resizeButton.addEventListener("click", function () {
    const img = new Image();
    img.src = preview.src;

    img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
          let newWidth = parseInt(widthInput.value);
          let newHeight = parseInt(heightInput.value);

          if (isNaN(newWidth)) {
            newWidth = originalWidth;
          }
          if (isNaN(newHeight)) {
            newHeight = originalHeight;
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const resizedImage = canvas.toDataURL("image/png");
          downloadLink.href = resizedImage;
          downloadLink.style.display = "block";
          downloadLink.style.color = "";

          downloadLink.classList.add("active");
          setTimeout(() => {
            downloadLink.classList.remove("active");
          }, 300);
        };
      });

      infoButton.addEventListener("click", function () {
        infoContent.style.display =
          infoContent.style.display === "block" ? "none" : "block";
      });