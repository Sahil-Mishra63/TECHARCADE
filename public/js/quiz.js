let currentCategory = '';
let currentLevel = '';
let currentQuestionIndex = 0;
let score = 0;
let timer;
let questions = [];

const categories = {
    'Python': {
        'Beginner': [
            { question: 'Which keyword is used to define a function?', options: ['def', 'func', 'define', 'function'], answer: 0 },
            { question: 'What data type is used for decimals?', options: ['int', 'float', 'double', 'string'], answer: 1 },
            { question: 'Which of the following is a valid variable name?', options: ['1variable', 'variable_1', 'variable-1', 'variable 1'], answer: 1 },
            { question: 'What is the output of print(2 ** 3)?', options: ['6', '8', '9', '3'], answer: 1 },
            { question: 'Which of the following is a mutable data type?', options: ['tuple', 'list', 'string', 'int'], answer: 1 },
            { question: 'What does the len() function do?', options: ['Returns length of an object', 'Returns the last element', 'Returns the first element', 'None'], answer: 0 },
            { question: 'Which symbol is used for comments in Python?', options: ['//', '#', '/*', '<!--'], answer: 1 },
            { question: 'What is the correct way to create a list?', options: ['[]', '{}', '()', '<>'], answer: 0 },
            { question: 'Which of the following is not a keyword in Python?', options: ['if', 'for', 'while', 'loop'], answer: 3 },
            { question: 'What is the output of print(type(5))?', options: ['int', 'float', 'str', 'None'], answer: 0 },
        ],
        'Intermediate': [
            { question: 'Which module is used for regular expressions?', options: ['regex', 're', 'match', 'search'], answer: 1 },
            { question: 'What is the output of 1 == True?', options: ['True', 'False', '1', 'None'], answer: 0 },
            { question: 'Which of the following is a built-in function in Python?', options: ['append()', 'insert()', 'pop()', 'all of the above'], answer: 3 },
            { question: 'What is the purpose of the pass statement?', options: ['To skip a loop', 'To do nothing', 'To break a loop', 'To continue'], answer: 1 },
            { question: 'Which of the following is used to handle exceptions?', options: ['try', 'except', 'finally', 'all of the above'], answer: 3 },
            { question: 'What is the output of print("Hello" + "World")?', options: ['Hello World', 'HelloWorld', 'Hello+World', 'None'], answer: 1 },
            { question: 'Which of the following is not a valid way to open a file?', options: ['open("file.txt")', 'open("file.txt", "r")', 'open("file.txt", "w")', 'open("file.txt", "rw")'], answer: 3 },
            { question: 'What does the map() function do?', options: ['Applies a function to all items', 'Filters items', 'Sorts items', 'None'], answer: 0 },
            { question: 'Which of the following is a Python framework?', options: ['Django', 'Flask', 'Pyramid', 'All of the above'], answer: 3 },
            { question: 'What is the output of print([1, 2, 3] * 2)?', options: ['[1, 2, 3, 1, 2, 3]', '[2, 4, 6]', '[1, 2, 3, 2, 4, 6]', 'None'], answer: 0 },
        ],
        'Pro': [
            { question: 'What does the init method do?', options: ['Initializes an object', 'Creates a class', 'Defines a method', 'None'], answer: 0 },
            { question: 'What is a lambda function?', options: ['An anonymous function', 'A named function', 'A built-in function', 'None'], answer: 0 },
            { question: 'Which of the following is used for multithreading?', options: ['threading', 'multiprocessing', 'asyncio', 'all of the above'], answer: 3 },
            { question: 'What is the purpose of the self parameter?', options: ['Refers to the instance', 'Refers to the class', 'Refers to the method', 'None'], answer: 0 },
            { question: 'What is the output of print({1, 2, 3} - {2})?', options: ['{1, 2, 3}', '{1, 3}', '{2}', 'None'], answer: 1 },
            { question: 'What is the purpose of the with statement?', options: ['To handle exceptions', 'To manage resources', 'To create loops', 'None'], answer: 1 },
            { question: 'What is the output of print("Hello"[1])?', options: ['H', 'e', 'l', 'o'], answer: 1 },
            { question: 'Which of the following is a decorator?', options: ['@staticmethod', '@classmethod', '@property', 'All of the above'], answer: 3 },
            { question: 'What is the output of print(type([]) is list)?', options: ['True', 'False', 'None', 'Error'], answer: 0 },
            { question: 'What is the purpose of the str method?', options: ['To return a string representation', 'To initialize an object', 'To create a class', 'None'], answer: 0 },
        ],
    },
    'C': {
        'Beginner': [
            { question: 'What is the correct syntax for a C program entry point?', options: ['void main()', 'int main()', 'main()', 'start()'], answer: 1 },
            { question: 'Which symbol is used to end a statement in C?', options: ['.', ';', ':', ','], answer: 1 },
            { question: 'Which of the following is a valid data type in C?', options: ['int', 'double', 'char', 'All of the above'], answer: 3 },
            { question: 'What function is used to print text in C?', options: ['print()', 'printf()', 'cout', 'display()'], answer: 1 },
            { question: 'Which header file is required for input/output operations in C?', options: ['stdio.h', 'stdlib.h', 'string.h', 'iostream'], answer: 0 },
            { question: 'Which operator is used for pointer dereferencing?', options: ['*', '&', '%', '@'], answer: 0 },
            { question: 'Which loop executes at least once?', options: ['for', 'while', 'do-while', 'None'], answer: 2 },
            { question: 'Which keyword is used to define constants in C?', options: ['final', 'const', 'constant', 'define'], answer: 1 },
            { question: 'Which operator is used for logical AND in C?', options: ['&&', '&', 'and', '||'], answer: 0 },
            { question: 'What is the result of 5 / 2 in C?', options: ['2', '2.5', '2.0', 'Error'], answer: 0 },
        ],
        'Intermediate': [
        { question: 'What does the sizeof operator do?', options: ['Returns the size of a variable', 'Finds the length of a string', 'Determines memory address', 'None'], answer: 0 },
        { question: 'Which function is used to dynamically allocate memory in C?', options: ['malloc()', 'alloc()', 'new()', 'calloc()'], answer: 3 },
        { question: 'What is the correct way to declare a pointer?', options: ['int ptr;', 'int *ptr;', 'ptr *int;', 'int& ptr;'], answer: 1 },
        { question: 'Which of the following is not a valid storage class in C?', options: ['auto', 'register', 'global', 'static'], answer: 2 },
        { question: 'Which function is used to read a string from the user?', options: ['scanf()', 'gets()', 'fgets()', 'All of the above'], answer: 3 },
        { question: 'What does the break statement do inside a loop?', options: ['Stops the current iteration', 'Exits the loop', 'Skips one iteration', 'Does nothing'], answer: 1 },
        { question: 'What is the purpose of the continue statement?', options: ['Terminates the program', 'Skips current iteration and continues', 'Exits the loop', 'None'], answer: 1 },
        { question: 'Which operator is used to access structure members in C?', options: ['.', '->', ':', '=>'], answer: 0 },
        { question: 'Which library function is used to compare two strings?', options: ['strcmp()', 'strcomp()', 'strcmpy()', 'cmpstr()'], answer: 0 },
        { question: 'What does the realloc() function do?', options: ['Reallocates memory', 'Deletes memory', 'Creates memory', 'None'], answer: 0 },
        ],
        'Pro': [
        { question: 'What does malloc() return when memory allocation fails?', options: ['NULL', '0', 'Segmentation fault', 'Garbage value'], answer: 0 },
        { question: 'What is the purpose of the volatile keyword?', options: ['Prevents compiler optimization', 'Defines a constant', 'Marks unused variables', 'Increases execution speed'], answer: 0 },
        { question: 'Which header file is required for file handling in C?', options: ['stdio.h', 'file.h', 'fstream.h', 'io.h'], answer: 0 },
        { question: 'What will be the output of printf("%d", sizeof(int)); on a 64-bit system?', options: ['4', '8', '2', 'Depends on compiler'], answer: 3 },
        { question: 'What is a dangling pointer?', options: ['A pointer that points to deallocated memory', 'A pointer with NULL value', 'A pointer to a constant', 'None'], answer: 0 },
        { question: 'Which function is used to move the file pointer to the beginning of a file?', options: ['rewind()', 'fseek()', 'reset()', 'seek()'], answer: 0 },
        { question: 'What does fflush(stdin) do in C?', options: ['Clears the input buffer', 'Flushes output stream', 'Closes a file', 'Clears memory'], answer: 0 },
        { question: 'How can we prevent memory leaks in C?', options: ['Using free() after malloc()', 'Not using malloc()', 'Using global variables', 'By restarting the program'], answer: 0 },
        { question: 'Which of the following is true for recursion in C?', options: ['A function calls itself', 'A function calls another function', 'A function does not return', 'Recursion is not possible in C'], answer: 0 },
        { question: 'What is the purpose of the restrict keyword in C?', options: ['Optimizes pointer usage', 'Prevents memory allocation', 'Restricts variable access', 'None'], answer: 0 },
        ]
    },
    'Java': {
        'Beginner': [
            { question: 'Which keyword is used to define a class in Java?', options: ['class', 'Class', 'struct', 'define'], answer: 0 },
            { question: 'What is the default value of an int variable in Java?', options: ['0', 'null', 'undefined', 'None'], answer: 0 },
            { question: 'Which of the following is not a primitive data type in Java?', options: ['int', 'float', 'String', 'char'], answer: 2 },
            { question: 'How do you declare an array in Java?', options: ['int arr[];', 'array<int> arr;', 'arr<int>[];', 'int[] arr;'], answer: 3 },
            { question: 'Which operator is used for comparison in Java?', options: ['=', '==', '!=', '+='], answer: 1 },
            { question: 'What does the new keyword do in Java?', options: ['Declares a variable', 'Creates an object', 'Deletes an object', 'Compares values'], answer: 1 },
            { question: 'Which of the following is a valid loop structure in Java?', options: ['for', 'while', 'do-while', 'All of the above'], answer: 3 },
            { question: 'Which method is used to print text in Java?', options: ['print()', 'println()', 'System.out.println()', 'echo()'], answer: 2 },
            { question: 'Which of the following is the correct syntax for the main method in Java?', options: ['public void main()', 'static public void main()', 'public static void main()', 'void main()'], answer: 2 },
            { question: 'What is the extension of a compiled Java file?', options: ['.java', '.class', '.exe', '.obj'], answer: 1 },
        ],
        'Intermediate': [
            { question: 'What is method overloading in Java?', options: ['Using the same method name with different parameters', 'Using the same method name in different classes', 'Using the same method name but different return types', 'None'], answer: 0 },
            { question: 'Which keyword is used to inherit a class in Java?', options: ['extends', 'implements', 'inherits', 'super'], answer: 0 },
            { question: 'Which of the following is not part of Java’s exception handling?', options: ['try', 'catch', 'finally', 'throws'], answer: 3 },
            { question: 'Which method is called automatically when an object is created?', options: ['constructor', 'init()', 'start()', 'None'], answer: 0 },
            { question: 'What is an interface in Java?', options: ['A class with methods', 'A class that extends another class', 'A collection of abstract methods', 'None'], answer: 2 },
            { question: 'Which keyword is used to refer to the parent class in Java?', options: ['this', 'parent', 'super', 'extends'], answer: 2 },
            { question: 'What is the default value of a boolean variable in Java?', options: ['true', 'false', 'null', '0'], answer: 1 },
            { question: 'Which collection class does not allow duplicate elements?', options: ['ArrayList', 'HashSet', 'LinkedList', 'HashMap'], answer: 1 },
            { question: 'Which of the following is not a valid access modifier in Java?', options: ['public', 'protected', 'private', 'global'], answer: 3 },
            { question: 'Which statement is used to exit from a loop?', options: ['stop', 'exit', 'break', 'continue'], answer: 2 },
        ],
        'Pro': [
            { question: 'What is the purpose of the transient keyword in Java?', options: ['Used in serialization to skip fields', 'Marks a variable as constant', 'Defines a static method', 'None'], answer: 0 },
            { question: 'Which data structure does a HashMap use internally?', options: ['Array', 'LinkedList', 'Tree', 'HashTable'], answer: 3 },
            { question: 'What is the difference between equals() and == in Java?', options: ['They are the same', '== compares references, equals() compares values', 'equals() is for primitives, == is for objects', 'None'], answer: 1 },
            { question: 'Which of the following statements is true about Java memory management?', options: ['Garbage collection is automatic', 'Memory allocation is manual', 'Java does not have garbage collection', 'Objects are destroyed manually'], answer: 0 },
            { question: 'What is the purpose of the finalize() method in Java?', options: ['Cleans up memory before object deletion', 'Deletes an object immediately', 'Stops garbage collection', 'None'], answer: 0 },
            { question: 'Which class is used for thread execution in Java?', options: ['Runnable', 'Thread', 'Executor', 'All of the above'], answer: 3 },
            { question: 'Which Java feature allows multiple methods with the same name in different classes?', options: ['Method overriding', 'Method overloading', 'Polymorphism', 'Encapsulation'], answer: 2 },
            { question: 'Which of the following statements about abstract classes in Java is true?', options: ['They cannot be instantiated', 'They must have abstract methods', 'They can extend multiple classes', 'They cannot have constructors'], answer: 0 },
            { question: 'What is the purpose of the synchronized keyword in Java?', options: ['To create a thread', 'To lock an object for thread safety', 'To pause execution', 'None'], answer: 1 },
            { question: 'Which class in Java is used for creating immutable objects?', options: ['String', 'ArrayList', 'HashMap', 'StringBuilder'], answer: 0 },
        ],
    },
    'JavaScript': {
    'Beginner': [
        { question: 'Which keyword is used to declare a variable in JavaScript?', options: ['var', 'let', 'const', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log(typeof "Hello")`?', options: ['string', 'number', 'boolean', 'object'], answer: 0 },
        { question: 'Which of the following is a valid way to write a comment in JavaScript?', options: ['<!---->', '//', '#', '/* */'], answer: 1 },
        { question: 'What is the output of `console.log(2 + "2")`?', options: ['4', '22', 'NaN', 'Error'], answer: 1 },
        { question: 'Which of the following is a falsy value in JavaScript?', options: ['0', '""', 'null', 'all of the above'], answer: 3 },
        { question: 'What is the correct way to create a function in JavaScript?', options: ['function myFunc() {}', 'let myFunc = function() {}', 'let myFunc = () => {}', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log([] == ![])`?', options: ['true', 'false', 'Error', 'NaN'], answer: 0 },
        { question: 'Which of the following is used to select an HTML element by its ID?', options: ['document.querySelector()', 'document.getElementById()', 'document.getElementsByClassName()', 'document.getElementsByTagName()'], answer: 1 },
        { question: 'What is the output of `console.log(3 === "3")`?', options: ['true', 'false', 'NaN', 'Error'], answer: 1 },
        { question: 'Which of the following is a valid way to create an array in JavaScript?', options: ['let arr = []', 'let arr = new Array()', 'let arr = {}', 'both a and b'], answer: 3 },
    ],
    'Intermediate': [
        { question: 'What is the output of `console.log(1 == true)`?', options: ['true', 'false', '1', 'Error'], answer: 0 },
        { question: 'Which of the following is used to handle asynchronous operations in JavaScript?', options: ['Promises', 'async/await', 'Callbacks', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log(typeof null)`?', options: ['object', 'null', 'undefined', 'Error'], answer: 0 },
        { question: 'Which of the following is a valid way to clone an object in JavaScript?', options: ['Object.assign()', 'JSON.parse(JSON.stringify())', 'Spread operator', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log("Hello".slice(1, 3))`?', options: ['He', 'el', 'llo', 'Error'], answer: 1 },
        { question: 'Which of the following is used to add an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 0 },
        { question: 'What is the output of `console.log(0.1 + 0.2 === 0.3)`?', options: ['true', 'false', 'NaN', 'Error'], answer: 1 },
        { question: 'Which of the following is a valid way to create a Promise?', options: ['new Promise()', 'Promise.resolve()', 'Promise.reject()', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log([1, 2, 3].map(x => x * 2))`?', options: ['[2, 4, 6]', '[1, 2, 3]', '[1, 4, 9]', 'Error'], answer: 0 },
        { question: 'Which of the following is used to remove the last element from an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 1 },
    ],
    'Pro': [
        { question: 'What is the output of `console.log(typeof (() => {}))`?', options: ['function', 'object', 'undefined', 'Error'], answer: 0 },
        { question: 'Which of the following is used to handle errors in JavaScript?', options: ['try...catch', 'throw', 'finally', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log("Hello".charAt(1))`?', options: ['H', 'e', 'l', 'o'], answer: 1 },
        { question: 'Which of the following is a valid way to create a class in JavaScript?', options: ['class MyClass {}', 'function MyClass() {}', 'let MyClass = () => {}', 'all of the above'], answer: 0 },
        { question: 'What is the output of `console.log(new Set([1, 2, 2, 3]))`?', options: ['[1, 2, 3]', '[1, 2, 2, 3]', '{1, 2, 3}', 'Error'], answer: 2 },
        { question: 'Which of the following is used to iterate over the properties of an object?', options: ['for...in', 'for...of', 'forEach', 'map'], answer: 0 },
        { question: 'What is the output of `console.log("Hello".replace("l", "x"))`?', options: ['Hexlo', 'Hexxo', 'Hello', 'Error'], answer: 0 },
        { question: 'Which of the following is a valid way to create a generator function?', options: ['function* myGen() {}', 'function myGen*() {}', 'let myGen = () => {}', 'all of the above'], answer: 0 },
        { question: 'What is the output of `console.log([1, 2, 3].reduce((a, b) => a + b))`?', options: ['6', '[1, 2, 3]', '123', 'Error'], answer: 0 },
        { question: 'Which of the following is used to create a new array with all sub-array elements concatenated?', options: ['flat()', 'concat()', 'join()', 'map()'], answer: 0 },
    ],
    },
    'Cpp': {
    'Beginner': [
        { question: 'Which keyword is used to define a function in C++?', options: ['def', 'func', 'void', 'function'], answer: 2 },
        { question: 'What is the output of `cout << 5 / 2;`?', options: ['2', '2.5', '3', 'Error'], answer: 0 },
        { question: 'Which of the following is a valid variable name in C++?', options: ['1variable', 'variable_1', 'variable-1', 'variable 1'], answer: 1 },
        { question: 'What is the correct way to include the iostream library?', options: ['#include <iostream>', '#include "iostream"', '#import <iostream>', '#using <iostream>'], answer: 0 },
        { question: 'Which of the following is a comment in C++?', options: ['//', '#', '/* */', 'both a and c'], answer: 3 },
        { question: 'What is the output of `cout << sizeof(int);` on a 32-bit system?', options: ['2', '4', '8', '16'], answer: 1 },
        { question: 'Which of the following is a valid way to declare a pointer?', options: ['int ptr;', 'int *ptr;', 'int &ptr;', 'int ptr*;'], answer: 1 },
        { question: 'What is the output of `cout << (10 > 9);`?', options: ['true', 'false', '1', '0'], answer: 2 },
        { question: 'Which of the following is used to allocate memory dynamically in C++?', options: ['malloc', 'new', 'alloc', 'create'], answer: 1 },
        { question: 'What is the output of `cout << "Hello"[1];`?', options: ['H', 'e', 'l', 'o'], answer: 1 },
    ],
    'Intermediate': [
        { question: 'What is the purpose of the `const` keyword in C++?', options: ['To define a constant', 'To make a variable immutable', 'To declare a function', 'both a and b'], answer: 3 },
        { question: 'What is the output of `cout << (5 == 5.0);`?', options: ['true', 'false', '1', '0'], answer: 2 },
        { question: 'Which of the following is a valid way to define a class in C++?', options: ['class MyClass {};', 'struct MyClass {};', 'interface MyClass {};', 'both a and b'], answer: 3 },
        { question: 'What is the output of `cout << (10 % 3);`?', options: ['1', '2', '3', '0'], answer: 0 },
        { question: 'Which of the following is used to handle exceptions in C++?', options: ['try', 'catch', 'throw', 'all of the above'], answer: 3 },
        { question: 'What is the output of `cout << (int)3.14;`?', options: ['3.14', '3', '4', 'Error'], answer: 1 },
        { question: 'Which of the following is a valid way to define a constructor?', options: ['MyClass() {}', 'void MyClass() {}', 'int MyClass() {}', 'MyClass(void) {}'], answer: 0 },
        { question: 'What is the output of `cout << (true && false);`?', options: ['true', 'false', '1', '0'], answer: 3 },
        { question: 'Which of the following is used to deallocate memory in C++?', options: ['free', 'delete', 'remove', 'destroy'], answer: 1 },
        { question: 'What is the output of `cout << (10 | 6);`?', options: ['10', '6', '14', '16'], answer: 2 },
    ],
    'Pro': [
        { question: 'What is the purpose of the `virtual` keyword in C++?', options: ['To allow function overriding', 'To create a virtual function', 'To enable polymorphism', 'all of the above'], answer: 3 },
        { question: 'What is the output of `cout << (int)(10.5 + 5.5);`?', options: ['15', '16', '15.5', 'Error'], answer: 0 },
        { question: 'Which of the following is a valid way to define a template in C++?', options: ['template <typename T>', 'template <class T>', 'template <T>', 'both a and b'], answer: 3 },
        { question: 'What is the output of `cout << (10 << 1);`?', options: ['10', '20', '5', 'Error'], answer: 1 },
        { question: 'Which of the following is used to define a pure virtual function?', options: ['virtual void func() = 0;', 'void func() = 0;', 'pure virtual void func();', 'abstract void func();'], answer: 0 },
        { question: 'What is the output of `cout << (10 & 6);`?', options: ['10', '6', '2', '16'], answer: 2 },
        { question: 'Which of the following is used to define a namespace in C++?', options: ['namespace MyNamespace {}', 'using namespace MyNamespace;', 'namespace = MyNamespace;', 'namespace MyNamespace = {};'], answer: 0 },
        { question: 'What is the output of `cout << (10 ^ 6);`?', options: ['12', '14', '16', '18'], answer: 0 },
        { question: 'Which of the following is a valid way to define a move constructor?', options: ['MyClass(MyClass&& other);', 'MyClass(MyClass& other);', 'MyClass(const MyClass& other);', 'MyClass(MyClass other);'], answer: 0 },
        { question: 'What is the output of `cout << (10 >> 1);`?', options: ['10', '5', '20', 'Error'], answer: 1 },
    ],
    },
    'TypeScript': {
    'Beginner': [
        { question: 'Which keyword is used to define a variable in TypeScript?', options: ['var', 'let', 'const', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log(typeof "Hello");`?', options: ['string', 'number', 'boolean', 'object'], answer: 0 },
        { question: 'Which of the following is a valid way to define a type in TypeScript?', options: ['type MyType = {};', 'interface MyType {}', 'class MyType {}', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log(2 + "2");`?', options: ['4', '22', 'NaN', 'Error'], answer: 1 },
        { question: 'Which of the following is a valid way to define a function in TypeScript?', options: ['function myFunc() {}', 'const myFunc = () => {}', 'let myFunc = function() {}', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log([] == ![]);`?', options: ['true', 'false', 'Error', 'NaN'], answer: 0 },
        { question: 'Which of the following is used to define an optional property in TypeScript?', options: ['property?: type;', 'property: type?;', 'property: optional type;', 'property: type | undefined;'], answer: 0 },
        { question: 'What is the output of `console.log(3 === "3");`?', options: ['true', 'false', 'NaN', 'Error'], answer: 1 },
        { question: 'Which of the following is a valid way to define an array in TypeScript?', options: ['let arr: number[] = [];', 'let arr: Array<number> = [];', 'let arr = [];', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log(type of null);`?', options: ['object', 'null', 'undefined', 'Error'], answer: 0 },
    ],
    'Intermediate': [
        { question: 'What is the output of `console.log(1 == true);`?', options: ['true', 'false', '1', 'Error'], answer: 0 },
        { question: 'Which of the following is used to define a union type in TypeScript?', options: ['type MyType = string | number;', 'type MyType = string & number;', 'type MyType = string || number;', 'type MyType = string && number;'], answer: 0 },
        { question: 'What is the output of `console.log(typeof null);`?', options: ['object', 'null', 'undefined', 'Error'], answer: 0 },
        { question: 'Which of the following is a valid way to define a generic function in TypeScript?', options: ['function myFunc<T>(arg: T): T {}', 'function myFunc<T>(arg: T) {}', 'function myFunc(arg: T): T {}', 'function myFunc<T>: T {}'], answer: 0 },
        { question: 'What is the output of `console.log("Hello".slice(1, 3));`?', options: ['He', 'el', 'llo', 'Error'], answer: 1 },
        { question: 'Which of the following is used to define a readonly property in TypeScript?', options: ['readonly property: type;', 'property: readonly type;', 'property: type readonly;', 'readonly(property: type);'], answer: 0 },
        { question: 'What is the output of `console.log(0.1 + 0.2 === 0.3);`?', options: ['true', 'false', 'NaN', 'Error'], answer: 1 },
        { question: 'Which of the following is a valid way to define a class in TypeScript?', options: ['class MyClass {}', 'interface MyClass {}', 'type MyClass = {};', 'all of the above'], answer: 0 },
        { question: 'What is the output of `console.log([1, 2, 3].map(x => x * 2));`?', options: ['[2, 4, 6]', '[1, 2, 3]', '[1, 4, 9]', 'Error'], answer: 0 },
        { question: 'Which of the following is used to define an enum in TypeScript?', options: ['enum MyEnum {}', 'interface MyEnum {}', 'type MyEnum = {};', 'class MyEnum {}'], answer: 0 },
    ],
    'Pro': [
        { question: 'What is the output of `console.log(typeof (() => {}));`?', options: ['function', 'object', 'undefined', 'Error'], answer: 0 },
        { question: 'Which of the following is used to define a decorator in TypeScript?', options: ['@decorator', '@Decorator', '@decorator()', '@Decorator()'], answer: 0 },
        { question: 'What is the output of `console.log("Hello".charAt(1));`?', options: ['H', 'e', 'l', 'o'], answer: 1 },
        { question: 'Which of the following is a valid way to define a mapped type in TypeScript?', options: ['type MyType = { [key: string]: number };', 'type MyType = { key: string => number };', 'type MyType = { key: string: number };', 'type MyType = { key => number };'], answer: 0 },
        { question: 'What is the output of `console.log(new Set([1, 2, 2, 3]));`?', options: ['[1, 2, 3]', '[1, 2, 2, 3]', '{1, 2, 3}', 'Error'], answer: 2 },
        { question: 'Which of the following is used to define a conditional type in TypeScript?', options: ['type MyType = T extends U ? X : Y;', 'type MyType = T ? U : X;', 'type MyType = T extends U : X ? Y;', 'type MyType = T ? U : X : Y;'], answer: 0 },
        { question: 'What is the output of `console.log("Hello".replace("l", "x"));`?', options: ['Hexlo', 'Hexxo', 'Hello', 'Error'], answer: 0 },
        { question: 'Which of the following is a valid way to define a utility type in TypeScript?', options: ['type MyType = Partial<T>;', 'type MyType = Readonly<T>;', 'type MyType = Pick<T, K>;', 'all of the above'], answer: 3 },
        { question: 'What is the output of `console.log([1, 2, 3].reduce((a, b) => a + b));`?', options: ['6', '[1, 2, 3]', '123', 'Error'], answer: 0 },
        { question: 'Which of the following is used to define a namespace in TypeScript?', options: ['namespace MyNamespace {}', 'module MyNamespace {}', 'package MyNamespace {}', 'all of the above'], answer: 0 },
    ],
},

};


function startGame(category) {
    currentCategory = category;
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('category-screen').classList.remove('hidden');
    // document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('category-title').textContent = `Select a level for ${category}`;
    document.getElementById('start-screen').style.display="none";
    document.getElementById('category-screen').style.display="block";
}

function selectLevel(level) {
    currentLevel = level;
    questions = categories[currentCategory][currentLevel];
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('category-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    displayQuestion();
    document.getElementById('category-screen').style.display="none";
}

function displayQuestion() {
    clearInterval(timer);
    let timeLeft = 10;
    document.getElementById('time').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft === 0) {
            checkAnswer(-1);
        }
    }, 1000);

    const question = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = question.question;

    const optionsList = document.getElementById('question-options');
    optionsList.innerHTML = '';

    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="option-button" onclick=checkAnswer(${index})>${option} </button>`;
        optionsList.appendChild(li);
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-button');

    if (selectedIndex === question.answer) {
        score++;
        options[selectedIndex].classList.add('correct');
    } else {
        if (selectedIndex !== -1) {
            options[selectedIndex].classList.add('wrong');
        }
        options[question.answer].classList.add('correct');
    }

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent =` ${score} / ${questions.length}`;
    saveQuizScore(currentCategory, score);
}

function restartGame() {
    currentCategory = '';
    currentLevel = '';
    currentQuestionIndex = 0;
    score = 0;
    questions = [];
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    // window.location.href='/quiz';
    location.reload();
}

generateCategoryButtons();

function saveQuizScore(language, score) {
    fetch("/update-quiz-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: language, score: score }),
    })
    .then(response => response.json())
    .then(data => {
         console.log(data.message);
         alert(data.message);
    })
    .catch(error => console.error("Error:", error));
}