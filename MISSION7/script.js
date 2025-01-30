const exercises = [
    {
        title: "Exercice 1",
        description: "Créer une fonction qui retourne la somme de deux nombres.",
        solution: `function somme(a, b) {
    return a + b;
}`,
        validate: (input1, input2) => {
            const num1 = parseFloat(input1);
            const num2 = parseFloat(input2);
            return {
                isValid: !isNaN(num1) && !isNaN(num2),
                result: num1 + num2
            };
        }
    },
    {
        title: "Exercice 2",
        description: "Créer une fonction qui retourne la multiplication de deux nombres.",
        solution: `function multiplication(a, b) {
    return a * b;
}`,
        validate: (input1, input2) => {
            const num1 = parseFloat(input1);
            const num2 = parseFloat(input2);
            return {
                isValid: !isNaN(num1) && !isNaN(num2),
                result: num1 * num2
            };
        }
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const exerciseList = document.getElementById("exercise-list");
    const initialState = document.getElementById("initial-state");
    const exerciseContent = document.getElementById("exercise-content");
    const exerciseTitle = document.getElementById("exercise-title");
    const exerciseDescription = document.getElementById("exercise-description");
    const solutionCode = document.getElementById("solution-code");
    const demoOutput = document.getElementById("demo-output");
    const input1 = document.getElementById("user-input-1");
    const input2 = document.getElementById("user-input-2");
    
    let currentExercise = null;

    function clearActiveExercises() {
        document.querySelectorAll("#exercise-list li").forEach(li => {
            li.classList.remove("active");
        });
    }

    function loadExercise(exercise, element) {
        clearActiveExercises();
        element.classList.add("active");
        currentExercise = exercise;
        
        initialState.style.display = "none";
        exerciseContent.style.display = "block";
        
        exerciseTitle.textContent = exercise.title;
        exerciseDescription.textContent = exercise.description;
        solutionCode.textContent = exercise.solution;
        solutionCode.style.display = "none";
        demoOutput.textContent = "";
        input1.value = "";
        input2.value = "";
    }

    exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = exercise.title;
        li.addEventListener("click", () => loadExercise(exercise, li));
        exerciseList.appendChild(li);
    });

    document.getElementById("show-solution").addEventListener("click", () => {
        const solutionCode = document.getElementById("solution-code");
        solutionCode.style.display = solutionCode.style.display === "none" ? "block" : "none";
    });

    document.getElementById("run-demo").addEventListener("click", () => {
        if (!currentExercise) return;
        
        const result = currentExercise.validate(input1.value, input2.value);
        
        if (result.isValid) {
            demoOutput.textContent = `Résultat: ${result.result}`;
            demoOutput.style.color = "var(--text-dark)";
        } else {
            demoOutput.textContent = "Veuillez entrer deux nombres valides.";
            demoOutput.style.color = "red";
        }
    });
});