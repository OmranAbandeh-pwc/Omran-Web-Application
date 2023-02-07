
const button1 = document.getElementById("forward");
const button2 = document.getElementById("backward");
const button3 = document.getElementById("auto");
const imageNumber = document.querySelector("#image_index");
const imageLength = document.querySelector("#image_length");
const imageId = document.getElementById('mainImage');
const listOfImages = [
    "./images/image1.jpg",
    "./images/image2.jpg",
    "./images/image3.jpg",
    "./images/image4.jpg",
    "./images/image5.jpg",
    "./images/image6.jpg",
    "./images/image7.jpg",
];
let imageIndex = 0;
let autoButtonBool = false;
var intervalId = null;

button1.addEventListener('click', imageMoveForwards);
button2.addEventListener('click', imageMoveBackwards);
button3.addEventListener('click', sliderAutoButton);
contentOne.setAttribute();
imageLength.textContent = listOfImages.length;


function imageMoveForwards(e) {
    e.preventDefault();
    imageIndex++;
    
    if (imageIndex === listOfImages.length) {
        imageIndex = 0;
    }

    imageId.setAttribute("src", listOfImages[imageIndex]);
    imageNumber.textContent = imageIndex+1;
}

function imageMoveBackwards(e) {
    e.preventDefault();
    if (imageIndex === 0) {
        imageIndex = listOfImages.length - 1;
    } else {
        imageIndex--;
    }
    imageId.setAttribute("src", listOfImages[imageIndex]);
    imageNumber.textContent = imageIndex+1;
}

function sliderAutoButton(e) {
 e.preventDefault();
    if (autoButtonBool === false) {
       
        intervalId=setInterval(function () {
            imageMoveForwards(e)
        }, 2000);
        button3.style.backgroundColor = "#474747";
        button3.style.color = "#ffffff"
        autoButtonBool = true;
    } else {
        clearInterval(intervalId);
        button3.style.backgroundColor = "";
        button3.style.color = ""
        autoButtonBool = false;
    }
}









