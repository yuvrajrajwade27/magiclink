// short URL copy functionality

document.querySelectorAll(".copy-button").forEach((btn) => {
    btn.addEventListener("click", function () {
        let row = this.closest("tr"); // Get the closest table row
        let link = row.querySelector(".shortURL").innerText; // Get the href of the <a> tag

        navigator.clipboard.writeText(link).then(() => {
            alert("Copied: " + link);
        });
    });
});


// URL delete functionality

document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", function () {
        let row = this.closest("tr");
        let shortCode = row.querySelector(".shortURL").id;
        window.location.href = `/delete/${shortCode}`;
    })
});


//  Function to check if the text is a valid URL

document.getElementById("autopaste").addEventListener("change", async function () {
    if (this.checked) {
        try {
            const text = await navigator.clipboard.readText();
            // Function to check if the text is a valid URL
            function isValidURL(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }
            // Validate and paste the text
            if (isValidURL(text)) {
                document.getElementById("form-input").value = text;
            } else {
                alert("Copied text is not a valid URL!");
                this.checked = false; // Reset toggle if invalid
            }
        } catch (err) {
            alert("Clipboard access denied. Allow permissions and try again.");
            this.checked = false;
        }
    }
});
