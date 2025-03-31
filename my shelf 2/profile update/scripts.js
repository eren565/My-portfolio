// Select elements
const displayName = document.getElementById("displayName");
const editContainer = document.getElementById("editContainer");
const nameInput = document.getElementById("nameInput");
const saveButton = document.getElementById("saveButton");
const editIcon = document.getElementById("editIcon");

// Function to enable editing
function enableEditing() {
    editContainer.style.display = "block";
    nameInput.value = displayName.textContent.replace(" ✎", "").trim();
    displayName.style.display = "none";
}

// Function to save name
function saveName() {
    const newName = nameInput.value.trim();
    if (newName) {
        displayName.innerHTML = `${newName} <i class="fas fa-pencil-alt" id="editIcon"></i>`;
        localStorage.setItem("userName", newName); // Save name in localStorage
    }
    editContainer.style.display = "none";
    displayName.style.display = "inline-block";

    // Reassign the event listener after updating the innerHTML
    document.getElementById("editIcon").addEventListener("click", enableEditing);
}

// Load saved name from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("userName") || "User123";
    displayName.innerHTML = `${savedName} <i class="fas fa-pencil-alt" id="editIcon"></i>`;

    // Attach event listeners
    document.getElementById("editIcon").addEventListener("click", enableEditing);
});

saveButton.addEventListener("click", saveName);

//

const profileImage = document.getElementById("profileImage");
const fileInput = document.getElementById("fileInput");

// Load saved image on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        profileImage.src = savedImage;
    } else {
        profileImage.src = "default.jpg"; // Default image
    }
});

// Click event to trigger file input
profileImage.addEventListener("click", () => fileInput.click());

// Handle file selection
fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage.src = e.target.result; // Update image
            localStorage.setItem("profileImage", e.target.result); // Save in localStorage
            sendToOtherWebsite(e.target.result); // Send image data to another website
        };
        reader.readAsDataURL(file);
    }
});

// Function to send image data to another website
function sendToOtherWebsite(imageData) {
    fetch("https://your-other-site.com/api/saveProfileImage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ profileImage: imageData })
    })
    .then(response => response.json())
    .then(data => console.log("Image saved on other site:", data))
    .catch(error => console.error("Error sending image:", error));
}


//

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const fileInput = document.getElementById("fileInput");

    // Load saved image from localStorage
    if (localStorage.getItem("profilePic")) {
        profileImage.src = localStorage.getItem("profilePic");
    }

    // Open file input when clicking on image
    profileImage.addEventListener("click", function () {
        fileInput.click();
    });

    // Handle file upload
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageUrl = event.target.result;
                profileImage.src = imageUrl;
                localStorage.setItem("profilePic", imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
});

//

document.addEventListener("DOMContentLoaded", function () {
    // Select all images in the triangle-images section
    const images = document.querySelectorAll(".triangle-images img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            const imageUrl = img.getAttribute("src");
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = imageUrl.substring(imageUrl.lastIndexOf("/") + 1); // Extracts filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});


//


document.addEventListener("DOMContentLoaded", function () {
    // Load saved data from localStorage
    document.querySelectorAll(".editable-image").forEach((img, index) => {
        const savedImage = localStorage.getItem("image_" + index);
        if (savedImage) {
            img.src = savedImage;
        }

        img.addEventListener("click", function () {
            const fileInput = this.closest("div").querySelector(".image-upload");
            if (fileInput) {
                fileInput.click();
                fileInput.onchange = (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            img.src = e.target.result;
                            localStorage.setItem("image_" + index, e.target.result); // Save image
                        };
                        reader.readAsDataURL(file);
                    }
                };
            }
        });
    });

    // Load and handle text editing
    document.querySelectorAll(".editable-text").forEach((textElement, index) => {
        const savedText = localStorage.getItem("text_" + index);
        if (savedText) {
            textElement.innerText = savedText;
        }

        textElement.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "text";
            input.value = this.innerText;
            input.style.width = "100%";
            input.style.padding = "5px";
            input.style.fontSize = "16px";

            this.replaceWith(input);
            input.focus();

            input.addEventListener("blur", function () {
                textElement.innerText = input.value;
                localStorage.setItem("text_" + index, input.value); // Save text
                input.replaceWith(textElement);
            });

            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    input.blur();
                }
            });
        });
    });
});

//

document.addEventListener("DOMContentLoaded", function () {
    const profilePicture = document.getElementById("profile-picture");
    const fileInput = document.getElementById("file-input");
    const notificationContainer = document.getElementById("notification-container");

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicture.src = e.target.result;
                showNotification(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    function showNotification(imageSrc) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.innerHTML = `
            <img src="${imageSrc}" alt="Profile Updated" class="notification-img">
            <p>Profile picture updated!</p>
        `;
        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

//

document.addEventListener("DOMContentLoaded", function () {
    // Load saved images and text from localStorage
    document.querySelectorAll(".editable-image").forEach((img, index) => {
        const savedImage = localStorage.getItem("image_" + index);
        if (savedImage) {
            img.src = savedImage;
        }

        img.addEventListener("click", function () {
            const fileInput = this.closest("div").querySelector(".image-upload");
            if (fileInput) {
                fileInput.click();
                fileInput.onchange = (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            img.src = e.target.result;
                            localStorage.setItem("image_" + index, e.target.result); // Save image
                        };
                        reader.readAsDataURL(file);
                    }
                };
            }
        });
    });

    // Load and handle text editing
    document.querySelectorAll(".editable-text").forEach((textElement, index) => {
        const savedText = localStorage.getItem("text_" + index);
        if (savedText) {
            textElement.innerText = savedText;
        }

        textElement.addEventListener("click", function () {
            const input = document.createElement("input");
            input.type = "text";
            input.value = this.innerText;
            input.style.width = "100%";
            input.style.padding = "5px";
            input.style.fontSize = "16px";

            this.replaceWith(input);
            input.focus();

            input.addEventListener("blur", function () {
                textElement.innerText = input.value;
                localStorage.setItem("text_" + index, input.value); // Save text
                input.replaceWith(textElement);
            });

            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    input.blur();
                }
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.querySelector(".save-btn");

    saveButton.addEventListener("click", function () {
        let dataToSave = [];

        // Saving text & images from cards
        document.querySelectorAll(".card-1").forEach((card) => {
            const imgSrc = card.querySelector("img").src;
            const title = card.querySelector("h3").innerText;
            const desc = card.querySelector("p").innerText;

            dataToSave.push({ type: "card", imgSrc, title, desc });
        });

        // Saving images from the animation section
        document.querySelectorAll(".animation-img img").forEach((img) => {
            dataToSave.push({ type: "animation", imgSrc: img.src });
        });

        // Store in localStorage
        localStorage.setItem("savedData", JSON.stringify(dataToSave));

        alert("Data saved successfully!");
    });

    // Retrieving & Displaying Data
    const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
    const portfolioContainer = document.getElementById("portfolioContent");
    const profileContainer = document.getElementById("profileContent");

    savedData.forEach((data) => {
        let element = document.createElement("div");

        if (data.type === "card") {
            element.classList.add("saved-card");

            let img = document.createElement("img");
            img.src = data.imgSrc;
            element.appendChild(img);

            let title = document.createElement("h3");
            title.innerText = data.title;
            element.appendChild(title);

            let desc = document.createElement("p");
            desc.innerText = data.desc;
            element.appendChild(desc);

            portfolioContainer.appendChild(element);
        } 
        else if (data.type === "animation") {
            let img = document.createElement("img");
            img.src = data.imgSrc;
            img.classList.add("anim-img");

            profileContainer.appendChild(img);
        }
    });
});
