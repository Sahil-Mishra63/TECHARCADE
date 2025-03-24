let currentIndex = 0;
let currentLanguage = '';
let score = 0;
// let codes = [];

const languages = {
    c: [
        { code: 'printf("Hello, World!");', answer: 'Hello, World!' },
        { code: 'int a = 5;\nint b = 2;\nprintf("%d", a + b);', answer: '7' },
        { code: 'printf("%%s", "Soft Computing");', answer: 'Soft Computing' },
        { code: 'char str[] = "C Programming";\nprintf("%s", str);', answer: 'C Programming' },
        { code: 'int a = 65;\nprintf("%c", a);', answer: 'A' },
        { code: 'int arr[] = {1, 2, 3};\nprintf("%d", arr[1]);', answer: '2' },
        { code: 'char arr[] = "Hello";\nprintf("%c", arr[1]);', answer: 'e' },
        { code: 'int x = 4;\nprintf("%d", x * x);', answer: '16' },
        { code: 'printf("%d", 10 % 3);', answer: '1' },
        { code: 'printf("%d", 5 > 2);', answer: '1' }
    ],
    cpp: [
        { code: 'cout << "Hello, World!";', answer: 'Hello, World!' },
        { code: 'cout << "Soft Computing";', answer: 'Soft Computing' },
        { code: 'string str = "C++ Programming";\ncout << str;', answer: 'C++ Programming' },
        { code: 'int a = 65;\ncout << (char)a;', answer: 'A' },
        { code: 'int z = 8;\ncout << z % 3;', answer: '2' },
        { code: 'char arr[] = "Hello";\ncout << arr[1];', answer: 'e' },
        { code: 'cout << 10 % 3;', answer: '1' },
        { code: 'int x = 4;\ncout << x * x;', answer: '16' },
        { code: 'cout << (5 > 2);', answer: '1' },
        { code: 'cout << 3 * 3 + 4 * 4;', answer: '25' }
    ],
    java: [
        { code: 'System.out.println("Hello, World!");', answer: 'Hello, World!' },
        { code: 'System.out.println("Soft Computing");', answer: 'Soft Computing' },
        { code: 'String str = "Java Programming";\nSystem.out.println(str);', answer: 'Java Programming' },
        { code: 'int a = 65;\nSystem.out.println((char)a);', answer: 'A' },
        { code: 'for(int i = 0; i < 3; i++) {\n System.out.print(i);\n}', answer: '012' },
        { code: 'String arr = "Hello";\nSystem.out.println(arr.charAt(1));', answer: 'e' },
        { code: 'System.out.println(10 % 3);', answer: '1' },
        { code: 'int x = 4;\nSystem.out.println(x * x);', answer: '16' },
        { code: 'System.out.println(5 > 2);', answer: 'true' },
        { code: 'System.out.println(3 * 3 + 4 * 4);', answer: '25' }
    ],
    python: [
        { code: 'print("Hello, World!")', answer: 'Hello, World!' },
        { code: 'print("Soft Computing")', answer: 'Soft Computing' },
        { code: 'str_val = "Python Programming"\nprint(str_val)', answer: 'Python Programming' },
        { code: 'a = 65\nprint(chr(a))', answer: 'A' },
        { code: 'a = 5\nb = 3\nprint(a if a > b else b)', answer: '5' },
        { code: 'arr = "Hello"\nprint(arr[1])', answer: 'e' },
        { code: 'print(10 % 3)', answer: '1' },
        { code: 'x = 4\nprint(x * x)', answer: '16' },
        { code: 'print(5 > 2)', answer: 'True' },
        { code: 'print(3 * 3 + 4 * 4)', answer: '25' }
    ],
    javascript: [
        { code: 'console.log("Hello, World!");', answer: 'Hello, World!' },
        { code: 'console.log("Soft Computing");', answer: 'Soft Computing' },
        { code: 'let str = "JavaScript Programming";\nconsole.log(str);', answer: 'JavaScript Programming' },
        { code: 'let a = 65;\nconsole.log(String.fromCharCode(a));', answer: 'A' },
        { code: 'let y = 15;\nconsole.log(y / 3);', answer: '5' },
        { code: 'let arr = "Hello";\nconsole.log(arr[1]);', answer: 'e' },
        { code: 'console.log(10 % 3);', answer: '1' },
        { code: 'let x = 4; console.log(x * x);', answer: '16' },
        { code: 'console.log(5 > 2);', answer: 'true' },
        { code: 'console.log(3 * 3 + 4 * 4);', answer: '25' }
    ],
    typescript: [
        { code: 'console.log("Hello, World!");', answer: 'Hello, World!' },
        { code: 'console.log("Soft Computing");', answer: 'Soft Computing' },
        { code: 'let str: string = "TypeScript Programming";\nconsole.log(str);', answer: 'TypeScript Programming' },
        { code: 'let a: number = 65;\nconsole.log(String.fromCharCode(a));', answer: 'A' },
        { code: 'let arr: string = "Hello";\nconsole.log(arr[1]);', answer: 'e' },
        { code: 'console.log(10 % 3);', answer: '1' },
        { code: 'let x: number = 4; console.log(x * x);', answer: '16' },
        { code: 'console.log(5 > 2);', answer: 'true' },
        { code: 'console.log(3 * 3 + 4 * 4);', answer: '25' },
        { code: 'let x: number = 10;\nconsole.log(x * 2);', answer: '20' },
    ]
};


function loadQuestions(language){
    currentLanguage = language;
    currentIndex = 0;
    score = 0;
    displayQuestion();
    document.getElementById("game-page").style.display = 'block';
}

function displayQuestion(){
    if (currentIndex >= languages[currentLanguage].length){
        showResult();

        return;
    }

    const question = languages[currentLanguage][currentIndex];
    document.getElementById('code-display').innerText = question.code;
    document.getElementById('user-answer').value = "";
}

function checkAnswer(){
    const userAnswer = document.getElementById("user-answer").value.trim();
    const correctAnswer = languages[currentLanguage][currentIndex].answer;

    if(userAnswer === correctAnswer){
        score++;
    }

    currentIndex++;
    displayQuestion();
}

function showResult(){
    document.getElementById("result").innerText = `Score: ${score}/${languages[currentLanguage].length}`;

    saveOutputScore(currentLanguage, score);
}



function saveOutputScore(language, score) {
    fetch("/update-output-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: language, score: score }),
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error("Error:", error));
}