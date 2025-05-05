const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.querySelectorAll('.next-btn');
const calculateBtn = document.getElementById('calculate-btn');
const restartBtn = document.querySelector('.restart-btn');
const goalButtons = document.querySelectorAll('#step-1 .options button');

const goalData = {};
let currentStep = 0;

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
        step.classList.toggle('hidden', index !== stepIndex);
    });
    prevBtn.disabled = stepIndex === 0;
    const nextVisible = stepIndex < steps.length - 2; // Hide next on the last input step
    nextBtn.forEach(btn => btn.style.display = nextVisible ? 'inline-block' : 'none');
    if (calculateBtn) calculateBtn.style.display = stepIndex === steps.length - 2 ? 'inline-block' : 'none';
    if (restartBtn) restartBtn.style.display = stepIndex === steps.length - 1 ? 'inline-block' : 'none';
}

function updateQuestion(step, questionText) {
    const questionElement = step.querySelector('h2[data-question]');
    if (questionElement) {
        questionElement.textContent = questionText;
    } else {
        const h2 = step.querySelector('h2');
        if (h2) h2.textContent = questionText;
    }
}

function updateUnitLabel(step, unitText) {
    const unitSpan = step.querySelector('[data-goal-unit]');
    if (unitSpan) {
        unitSpan.textContent = unitText;
    }
}

goalButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        goalData.goal = event.target.dataset.goal;
        showStep(1); // Move to describe change
        // Update question for current value based on goal
        const currentQuestion = document.querySelector('#step-3 h2');
        const currentValueUnit = document.querySelector('#step-3 [data-goal-unit]');
        switch (goalData.goal) {
            case 'clicks':
                currentQuestion.textContent = "What's the current number of clicks?";
                currentValueUnit.textContent = "clicks";
                break;
            case 'signups':
                currentQuestion.textContent = "What's the current number of sign-ups?";
                currentValueUnit.textContent = "sign-ups";
                break;
            case 'sales':
                currentQuestion.textContent = "What's the current number of sales?";
                currentValueUnit.textContent = "sales";
                break;
            case 'engagement':
                currentQuestion.textContent = "What's the current level of engagement (e.g., %)?";
                currentValueUnit.textContent = "%";
                break;
        }
    });
});

nextBtn.forEach(button => {
    button.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
    });
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    showStep(currentStep);
});

const improvementSlider = document.getElementById('expected-improvement');
const improvementValueSpan = document.getElementById('improvement-value');

if (improvementSlider && improvementValueSpan) {
    improvementSlider.addEventListener('input', () => {
        improvementValueSpan.textContent = improvementSlider.value + '%';
    });
}

if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
        const baseline = parseFloat(document.getElementById('current-value').value);
        const improvement = parseFloat(document.getElementById('expected-improvement').value) / 100;
        const sample = parseFloat(document.getElementById('sample-size').value);

        if (isNaN(baseline) || isNaN(improvement) || isNaN(sample) || sample <= 0) {
            document.getElementById('forecast-result').textContent = "Please enter valid numbers.";
        } else {
            const estimatedIncrease = baseline * improvement;
            let forecastText = `Based on your input, the new version might result in approximately ${estimatedIncrease.toFixed(2)} more ${goalData.goal} per the time period you specified.`;
            forecastText += ` This is a basic forecast and actual results can vary.`;
            document.getElementById('forecast-result').textContent = forecastText;
            showStep(steps.length - 1); // Show output step
        }
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        currentStep = 0;
        goalData.goal = null;
        showStep(currentStep);
        // Optionally clear input fields
        const inputs = document.querySelectorAll('input[type="number"], textarea');
        inputs.forEach(input => input.value = '');
        if (improvementSlider) improvementSlider.value = 10;
        if (improvementValueSpan) improvementValueSpan.textContent = '10%';
    });
}

// Initialize the flow
showStep(0);