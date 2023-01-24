const photoShow = document.getElementById("photoShow");
const upload = document.getElementById("upload");
const photoUpload = document.getElementById("photoUpload");
const widthShow = document.getElementById("widthShow");
const heightShow = document.getElementById("heightShow");
const imageParent = document.getElementById("imageParent");
const photo = photoShow.querySelector("img");
const asset = document.getElementById("asset");
const aspectRatio = document.getElementById("aspectRatio");
const reduceQuality = document.getElementById("reduceQuality");

// image upload
let ratio = 0;
upload.onchange = (e) => {
  const imageFile = e.target.files[0];
  photoUploadFunction(imageFile);
};

// width value set
widthShow.onkeyup = (e) => {
  aspectRatio.checked &&
    (heightShow.value = Math.floor(e.target.value / ratio));
};

// height value set
heightShow.onkeyup = (e) => {
  aspectRatio.checked && (widthShow.value = Math.floor(e.target.value * ratio));
};

// download image
let reduce = 0;
const download = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = widthShow.value;
  canvas.height = heightShow.value;
  ctx.drawImage(
    photoShow.querySelector("img"),
    0,
    0,
    canvas.width,
    canvas.height
  );

  reduceQuality.checked ? (reduce = 0.5) : (reduce = 1);
  const link = document.createElement("a");
  link.download = photo.src.split("/")[3];

  link.href = canvas.toDataURL("images/jpg", 0.5);
  link.click();
};

// image drag and drop
dragDrop(photoShow);
dragDrop(photoUpload);

// drag and drop function
function dragDrop(location) {
  location.ondrop = (e) => {
    e.preventDefault();
    photoUploadFunction(e.dataTransfer.files[0]);
  };
  location.ondragover = (e) => {
    e.preventDefault();
    photoUpload.classList.add("hover:bg-green-500");
  };
  location.ondragleave = (e) => {
    e.preventDefault();
  };
}

// image preview show
function photoUploadFunction(imageFile) {
  const url = URL.createObjectURL(imageFile);
  if (!(imageFile.type.split("/")[0] == "image")) return;
  asset.classList.remove("hidden");
  photoUpload.classList.add("hidden");
  photoShow.classList.remove("hidden");
  photo.src = url;
  photoShow.querySelector("img").onload = (e) => {
    widthShow.value = e.target.naturalWidth;
    heightShow.value = e.target.naturalHeight;
    ratio = e.target.naturalWidth / e.target.naturalHeight;
  };
}
