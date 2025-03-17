document.addEventListener("DOMContentLoaded", function() {
    const addScoreButton = document.getElementById("addScore");
    const scoreCells = document.querySelectorAll(".score");
    const confirmationBox = document.getElementById("confirmation");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    // Flag to track if there are unsaved changes
    let hasUnsavedChanges = false;

    addScoreButton.addEventListener("click", function() {
        let totalScores = [0, 0, 0, 0];
        let rows = document.querySelectorAll("tbody tr");

        for (let i = 0; i < 15; i++) { // Loop through 15 game rounds
            let inputs = rows[i].querySelectorAll("input");
            inputs.forEach((input, index) => {
                totalScores[index] += parseFloat(input.value) || 0;
            });
        }

        scoreCells.forEach((cell, index) => {
            cell.textContent = totalScores[index];
        });

        hasUnsavedChanges = true;
        confirmationBox.classList.remove("hidden"); // Show confirmation box
    });

    confirmYes.addEventListener("click", function() {
        // User confirmed the scores, mark as saved
        hasUnsavedChanges = false;
        confirmationBox.classList.add("hidden"); // Hide confirmation box
    });

    confirmNo.addEventListener("click", function() {
        // User rejected the scores, prepare for reload
        hasUnsavedChanges = false; // No need to confirm again
        location.reload(); // Reloads the page to reset game
    });

    // Custom confirmation box before page refresh or navigation
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges) {
            // Standard message for beforeunload (browsers may show their own message)
            const message = "You have unsaved changes. Are you sure you want to leave?";
            e.returnValue = message;  // Modern browsers (like Chrome)
            return message;  // Some older browsers
        }
    });

    // Add event listeners to all input fields to track changes
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', function() {
            hasUnsavedChanges = true;
        });

        input.addEventListener('input', function() {
            hasUnsavedChanges = true;
        });
    });
});
