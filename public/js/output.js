let currentQuestionIndex = 0;
let currentLanguage = '';
let score = 0;
let timer;
let codes = [];

const questions = {
    c: [
        { code: 'printf("Hello, World!");', answer: 'Hello, World!' },
        { code: 'int a = 5;\nint b = 2;\nprintf("%d", a + b);', answer: '7' },
        { code: 'int x = 10;\nprintf("%d", x * 2);', answer: '20' },
        { code: 'int y = 15;\nprintf("%d", y / 3);', answer: '5' },
        { code: 'int z = 8;\nprintf("%d", z % 3);', answer: '2' },
        { code: 'int a = 5, b = 3;\nprintf("%d", a > b ? a : b);', answer: '5' },
        { code: 'int i;\nfor(i = 0; i < 3; i++) {\n printf("%d", i);\n}', answer: '012' },
        { code: 'int arr[] = {1, 2, 3};\nprintf("%d", arr[1]);', answer: '2' },
        { code: 'int num = 5;\nif (num % 2 == 0) {\n printf("Even");\n} else {\n printf("Odd");\n}', answer: 'Odd' },
        { code: 'int x = 5;\nint *ptr = &x;\nprintf("%d", *ptr);', answer: '5' },
        { code: 'char str[] = "Hello";\nprintf("%c", str[1]);', answer: 'e' },
        { code: 'int a = 10;\nint b = 20;\nint temp = a;\na = b;\nb = temp;\nprintf("%d %d", a, b);', answer: '20 10' },
    ],
    cpp: [
        { code: 'cout << "Hello, World!";', answer: 'Hello, World!' },
        { code: 'int a = 5;\nint b = 2;\ncout << a + b;', answer: '7' },
        { code: 'int x = 10;\ncout << x * 2;', answer: '20' },
        { code: 'int y = 15;\ncout << y / 3;', answer: '5' },
        { code: 'int z = 8;\ncout << z % 3;', answer: '2' },
        { code: 'int a = 5, b = 3;\ncout << (a > b ? a : b);', answer: '5' },
        { code: 'for(int i = 0; i < 3; i++) {\n cout << i;\n}', answer: '012' },
        { code: 'int arr[] = {1, 2, 3};\ncout << arr[1];', answer: '2' },
        { code: 'int num = 5;\nif (num % 2 == 0) {\n cout << "Even";\n} else {\n cout << "Odd";\n}', answer: 'Odd' },
        { code: 'int x = 5;\nint *ptr = &x;\ncout << *ptr;', answer: '5' },
        { code: 'string str = "Hello";\ncout << str[1];', answer: 'e' },
        { code: 'int a = 10;\nint b = 20;\nswap(a, b);\ncout << a << " " << b;', answer: '20 10' },
    ],
    java: [
        { code: 'System.out.println("Hello, World!");', answer: 'Hello, World!' },
        { code: 'int a = 5;\nint b = 2;\nSystem.out.println(a + b);', answer: '7' },
        { code: 'int x = 10;\nSystem.out.println(x * 2);', answer: '20' },
        { code: 'int y = 15;\nSystem.out.println(y / 3);', answer: '5' },
        { code: 'int z = 8;\nSystem.out.println(z % 3);', answer: '2' },
        { code: 'int a = 5, b = 3;\nSystem.out.println(a > b ? a : b);', answer: '5' },
        { code: 'for(int i = 0; i < 3; i++) {\n System.out.print(i);\n}', answer: '012' },
        { code: 'int[] arr = {1, 2, 3};\nSystem.out.println(arr[1]);', answer: '2' },
        { code: 'int num = 5;\nif (num % 2 == 0) {\n System.out.println("Even");\n} else {\n System.out.println("Odd");\n}', answer: 'Odd' },
        { code: 'String str = "Hello";\nSystem.out.println(str.charAt(1));', answer: 'e' },
        { code: 'int a = 10;\nint b = 20;\nint temp = a;\na = b;\nb = temp;\nSystem.out.println(a + " " + b);', answer: '20 10' },
        { code: 'List<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.add(2);\nSystem.out.println(list.get(1));', answer: '2' },
    ],
    python: [
        { code: 'print("Hello, World!")', answer: 'Hello, World!' },
        { code: 'a = 5\nb = 2\nprint(a + b)', answer: '7' },
        { code: 'x = 10\nprint(x * 2)', answer: '20' },
        { code: 'y = 15\nprint(y // 3)', answer: '5' },
        { code: 'z = 8\nprint(z % 3)', answer: '2' },
        { code: 'a = 5\nb = 3\nprint(a if a > b else b)', answer: '5' },
        { code: 'for i in range(3):\n print(i, end="")', answer: '012' },
        { code: 'arr = [1, 2, 3]\nprint(arr[1])', answer: '2' },
        { code: 'num = 5\nprint("Even" if num % 2 == 0 else "Odd")', answer: 'Odd' },
        { code: 's = "Hello"\nprint(s[1])', answer: 'e' },
        { code: 'a = 10\nb = 20\na, b = b, a\nprint(a, b)', answer: '20 10' },
        { code: 'lst = [1, 2, 3]\nprint(lst[-1])', answer: '3' },
    ]
};

function showQuestions(category) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    questions[category].forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <div class="question-code">${q.code}</div>
            <input type="text" id="answer-${category}-${index}" placeholder="Enter your answer">
            <button onclick="checkAnswer('${category}', ${index})">Check Answer</button>
        `;
        container.appendChild(questionDiv);
    });
}

function selectLanguage(language){
    currentLanguage = language;
    codes = questions[currentLanguage];
    currentQuestionIndex = 0;
    score = 0;
}

function displayQuestion(){

    clearInterval(timer);
    let timeLeft = 20;
    document.getElementById('time').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if(timeLeft === 0){
            checkAnswer(-1);
        }
    }, 3000);

    const question = codes[currentQuestionIndex];
    document.getElementById('question-title').textContent = question.question;
    const ans = document.getElementById('input');
}

// function checkAnswer(category, index) {
//     const userAnswer = document.getElementById(`answer-${category}-${index}`).value;
//     const resultContainer = document.getElementById('result-container');
//     if (userAnswer === questions[category][index].answer) {
//         resultContainer.innerHTML = '<p style="color: green;">Correct!</p>';
//     } else {
//         resultContainer.innerHTML = <p style="color: red;">Incorrect! The correct answer is: ${questions[category][index].answer}</p>;
//     }
// }

function checkAnswer(category, index) {
    const userAnswer = document.getElementById(`answer-${category}-${index}`).value.trim();
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = ''; // Clear previous result

    if (userAnswer.toLowerCase() === questions[category][index].answer.toLowerCase()) {
        resultContainer.innerHTML = '<p style="color: green;">Correct!</p>';
    } else {
        resultContainer.innerHTML = `<p style="color: red;">Incorrect! The correct answer is: ${questions[category][index].answer}</p>`;
    }
}