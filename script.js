// const apiKey = '4gVqhMkSdzf2EyfVh9U1giaVgXuuXqPe3dX8d0jXGjYKoflSeSfdKg7F';

let searchButton = document.getElementById("srchbtn");
let searchImage = document.getElementById("srchimg");
let resultImages = document.getElementById("rsltimgs");
let resetButton = document.getElementById("reset");
let hoverStyle = document.getElementById("section-1st");
let container = document.getElementById("container");

hoverStyle.addEventListener("mouseenter", function () {
    container.style.background = "#008B8B";
    container.style.color = "white";

});

hoverStyle.addEventListener("mouseleave", function () {
    container.style.background = "";
    container.style.color = "";
})


resetButton.disabled = true;

searchButton.addEventListener("click", () => {
    const query = searchImage.value.trim();
    if (query) {
        fetchImages(query);
    } else {
        alert("Please enter a search term!");
    }
});

function fetchImages(query) {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': '4gVqhMkSdzf2EyfVh9U1giaVgXuuXqPe3dX8d0jXGjYKoflSeSfdKg7F'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching images: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayImages(data.photos);
            resetButton.disabled = false;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
};

function displayImages(images) {
    resultImages.innerHTML = "";

    images.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.src.medium;
        img.alt = "Pexels Image";
        img.style.width = "200px";
        img.style.margin = "10px";
        img.classList.add("hover-effect");
        resultImages.appendChild(img);
    })
};

resetButton.addEventListener("click", () => {
    if (!resetButton.disabled) {
        resultImages.innerHTML = "";
        searchImage.value = "";
        resetButton.disabled = true;
    }
});

