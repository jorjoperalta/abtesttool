function calculateForecast() {
    const metric = document.getElementById("metric").value;
    const changeType = document.getElementById("changeType").value;
    const confidenceLevel = parseFloat(document.getElementById("confidenceLevel").value) / 100;
    const baselineRate = parseFloat(document.getElementById("baselineRate").value) / 100;
    const mde = parseFloat(document.getElementById("mde").value) / 100; // Convert percentage to decimal

    const forecastResultsDiv = document.getElementById("forecastResults");
    const sampleSizeNeededElement = document.getElementById("sampleSizeNeeded");
    const durationEstimateElement = document.getElementById("durationEstimate");
    const potentialUpliftElement = document.getElementById("potentialUplift");

    // --- Placeholder for your A/B test forecast calculations ---
    // You will need to implement the formulas here based on statistical principles.
    // This example just shows how to display the input values.

    console.log("Metric:", metric);
    console.log("Change Type:", changeType);
    console.log("Confidence Level:", confidenceLevel);
    console.log("Baseline Rate:", baselineRate);
    console.log("MDE:", mde);

    const sampleSize = "Calculation for sample size will go here.";
    const duration = "Estimate for test duration will go here.";
    const uplift = "Potential uplift range will go here.";

    sampleSizeNeededElement.textContent = `Estimated Sample Size Needed per Variation: ${sampleSize}`;
    durationEstimateElement.textContent = `Estimated Test Duration: ${duration}`;
    potentialUpliftElement.textContent = `Potential Uplift (based on MDE): ${mde * 100}% relative increase (approximately).`;

    forecastResultsDiv.classList.remove("hidden");
}