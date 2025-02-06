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
    },
    {
        title: "Exercice 3",
        description: "Créer une fonction qui retourne la soustraction de deux nombres.",
        solution: `function soustraction(a, b) {
    return a - b;
}`,
        validate: (input1, input2) => {
            const num1 = parseFloat(input1);
            const num2 = parseFloat(input2);
            return {
                isValid: !isNaN(num1) && !isNaN(num2),
                result: num1 - num2
            };
        }
    },
    {
        title: "Exercice 4",
        description: "Créer une fonction qui retourne la division de deux nombres.",
        solution: `function division(a, b) {
    return a / b;
}`,
        validate: (input1, input2) => {
            const num1 = parseFloat(input1);
            const num2 = parseFloat(input2);
            return {
                isValid: !isNaN(num1) && !isNaN(num2) && num2 !== 0,
                result: num1 / num2
            };
        }
    },
    {
        title: "Exercice 5",
        description: "Créer une fonction qui convertit des mètres en pieds.",
        solution: `function metersToFeet(meters) {
    return meters * 3.28084;
}`,
        validate: (input1) => {
            const meters = parseFloat(input1);
            return {
                isValid: !isNaN(meters),
                result: meters * 3.28084
            };
        }
    },
    {
        title: "Exercice 6",
        description: "Créer une fonction qui convertit des degrés Celsius en Fahrenheit.",
        solution: `function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}`,
        validate: (input1) => {
            const celsius = parseFloat(input1);
            return {
                isValid: !isNaN(celsius),
                result: (celsius * 9/5) + 32
            };
        }
    },
    {
        title: "Exercice 7",
        description: "Créer une fonction qui convertit des kilomètres en miles.",
        solution: `function kilometersToMiles(kilometers) {
    return kilometers * 0.621371;
}`,
        validate: (input1) => {
            const kilometers = parseFloat(input1);
            return {
                isValid: !isNaN(kilometers),
                result: kilometers * 0.621371
            };
        }
    },
    {
        title: "Exercice 8",
        description: "Créer une fonction qui calcule l'aire d'un cercle à partir de son rayon.",
        solution: `function areaOfCircle(radius) {
    return Math.PI * Math.pow(radius, 2);
}`,
        validate: (input1) => {
            const radius = parseFloat(input1);
            return {
                isValid: !isNaN(radius),
                result: Math.PI * Math.pow(radius, 2)
            };
        }
    },
    {
        title: "Exercice 9",
        description: "Créer une fonction qui calcule le périmètre d'un rectangle.",
        solution: `function perimeterOfRectangle(length, width) {
    return 2 * (length + width);
}`,
        validate: (input1, input2) => {
            const length = parseFloat(input1);
            const width = parseFloat(input2);
            return {
                isValid: !isNaN(length) && !isNaN(width),
                result: 2 * (length + width)
            };
        }
    },
    {
        title: "Exercice 10",
        description: "Créer une fonction qui calcule la moyenne de trois nombres.",
        solution: `function averageOfThree(a, b, c) {
    return (a + b + c) / 3;
}`,
        validate: (input1, input2, input3) => {
            const num1 = parseFloat(input1);
            const num2 = parseFloat(input2);
            const num3 = parseFloat(input3);
            return {
                isValid: !isNaN(num1) && !isNaN(num2) && !isNaN(num3),
                result: (num1 + num2 + num3) / 3
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
    const input3 = document.getElementById("user-input-3");
    
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
        input3.value = "";

        // Show or hide input fields based on the number of inputs required
        const inputs = [input1, input2, input3];
        inputs.forEach(input => input.style.display = "none");
        if (exercise.validate.length >= 1) input1.style.display = "block";
        if (exercise.validate.length >= 2) input2.style.display = "block";
        if (exercise.validate.length >= 3) input3.style.display = "block";
    }

    function displayWindowSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return `Largeur: ${width}px, Hauteur: ${height}px`;
    }

    exercises.forEach((exercise, index) => {
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
        
        const result = currentExercise.validate(input1.value, input2.value, input3.value);
        
        if (result.isValid) {
            demoOutput.textContent = `Résultat: ${result.result}`;
            demoOutput.style.color = "var(--text-dark)";
        } else {
            demoOutput.textContent = "Veuillez entrer des nombres valides.";
            demoOutput.style.color = "red";
        }
    });

    // Add window resize event listener for Exercice 5
    if (document.getElementById('window-size-output')) {
        document.getElementById('window-size-output').textContent = displayWindowSize();
        window.addEventListener('resize', () => {
            document.getElementById('window-size-output').textContent = displayWindowSize();
        });
    }
});