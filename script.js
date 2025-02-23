// 主族元素和 0 族元素的信息（无第七周期）
const elements = [
    { name: "氢", symbol: "H", number: 1, period: 1, group: "ⅠA" },
    { name: "氦", symbol: "He", number: 2, period: 1, group: "0" },
    { name: "锂", symbol: "Li", number: 3, period: 2, group: "ⅠA" },
    { name: "铍", symbol: "Be", number: 4, period: 2, group: "ⅡA" },
    { name: "硼", symbol: "B", number: 5, period: 2, group: "ⅢA" },
    { name: "碳", symbol: "C", number: 6, period: 2, group: "ⅣA" },
    { name: "氮", symbol: "N", number: 7, period: 2, group: "ⅤA" },
    { name: "氧", symbol: "O", number: 8, period: 2, group: "ⅥA" },
    { name: "氟", symbol: "F", number: 9, period: 2, group: "ⅦA" },
    { name: "氖", symbol: "Ne", number: 10, period: 2, group: "0" },
    { name: "钠", symbol: "Na", number: 11, period: 3, group: "ⅠA" },
    { name: "镁", symbol: "Mg", number: 12, period: 3, group: "ⅡA" },
    { name: "铝", symbol: "Al", number: 13, period: 3, group: "ⅢA" },
    { name: "硅", symbol: "Si", number: 14, period: 3, group: "ⅣA" },
    { name: "磷", symbol: "P", number: 15, period: 3, group: "ⅤA" },
    { name: "硫", symbol: "S", number: 16, period: 3, group: "ⅥA" },
    { name: "氯", symbol: "Cl", number: 17, period: 3, group: "ⅦA" },
    { name: "氩", symbol: "Ar", number: 18, period: 3, group: "0" },
    { name: "钾", symbol: "K", number: 19, period: 4, group: "ⅠA" },
    { name: "钙", symbol: "Ca", number: 20, period: 4, group: "ⅡA" },
    { name: "镓", symbol: "Ga", number: 31, period: 4, group: "ⅢA" },
    { name: "锗", symbol: "Ge", number: 32, period: 4, group: "ⅣA" },
    { name: "砷", symbol: "As", number: 33, period: 4, group: "ⅤA" },
    { name: "硒", symbol: "Se", number: 34, period: 4, group: "ⅥA" },
    { name: "溴", symbol: "Br", number: 35, period: 4, group: "ⅦA" },
    { name: "氪", symbol: "Kr", number: 36, period: 4, group: "0" },
    { name: "铷", symbol: "Rb", number: 37, period: 5, group: "ⅠA" },
    { name: "锶", symbol: "Sr", number: 38, period: 5, group: "ⅡA" },
    { name: "铟", symbol: "In", number: 49, period: 5, group: "ⅢA" },
    { name: "锡", symbol: "Sn", number: 50, period: 5, group: "ⅣA" },
    { name: "锑", symbol: "Sb", number: 51, period: 5, group: "ⅤA" },
    { name: "碲", symbol: "Te", number: 52, period: 5, group: "ⅥA" },
    { name: "碘", symbol: "I", number: 53, period: 5, group: "ⅦA" },
    { name: "氙", symbol: "Xe", number: 54, period: 5, group: "0" },
    { name: "铯", symbol: "Cs", number: 55, period: 6, group: "ⅠA" },
    { name: "钡", symbol: "Ba", number: 56, period: 6, group: "ⅡA" },
    { name: "铊", symbol: "Tl", number: 81, period: 6, group: "ⅢA" },
    { name: "铅", symbol: "Pb", number: 82, period: 6, group: "ⅣA" },
    { name: "铋", symbol: "Bi", number: 83, period: 6, group: "ⅤA" },
    { name: "钋", symbol: "Po", number: 84, period: 6, group: "ⅥA" },
    { name: "砹", symbol: "At", number: 85, period: 6, group: "ⅦA" },
    { name: "氡", symbol: "Rn", number: 86, period: 6, group: "0" }
];

const allPeriods = ["1", "2", "3", "4", "5", "6"];
const allGroups = ["ⅠA", "ⅡA", "ⅢA", "ⅣA", "ⅤA", "ⅥA", "ⅦA", "0"];

let currentQuestionType;
let currentElement;
let correctAnswer;
let correctCount = 0;
let wrongCount = 0;
let hasAnswered = false; // 标记是否已经答题

// 获取用户存储的模式偏好
const storedMode = localStorage.getItem('colorMode');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const body = document.body;

if (storedMode) {
    if (storedMode === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
} else {
    if (prefersDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// 初始化时更新进度条显示初始数据
document.addEventListener('DOMContentLoaded', function () {
    updateProgressBar();
});

// 随机排序数组的函数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateQuestion() {
    // 随机选择问题类型
    const questionTypes = [
        'numberToName', 'nameToNumber', 'nameToSymbol', 'symbolToName',
        'nameToPeriod', 'nameToGroup', 'periodAndGroupToName'
    ];
    currentQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    // 随机选择一个元素
    currentElement = elements[Math.floor(Math.random() * elements.length)];

    const questionElement = document.getElementById('question');
    let questionText;
    switch (currentQuestionType) {
        case 'numberToName':
            questionText = `原子序数为 ${currentElement.number} 的元素是以下哪个？`;
            correctAnswer = currentElement.name;
            break;
        case 'nameToNumber':
            questionText = `元素 "${currentElement.name}" 的原子序数是以下哪个？`;
            correctAnswer = currentElement.number.toString();
            break;
        case 'nameToSymbol':
            questionText = `元素 "${currentElement.name}" 的元素符号是以下哪个？`;
            correctAnswer = currentElement.symbol;
            break;
        case 'symbolToName':
            questionText = `元素符号 "${currentElement.symbol}" 对应的元素名称是以下哪个？`;
            correctAnswer = currentElement.name;
            break;
        case 'nameToPeriod':
            questionText = `元素 "${currentElement.name}" 位于以下哪个周期？`;
            correctAnswer = currentElement.period.toString();
            break;
        case 'nameToGroup':
            questionText = `元素 "${currentElement.name}" 位于以下哪个族？`;
            correctAnswer = currentElement.group;
            break;
        case 'periodAndGroupToName':
            questionText = `位于周期 ${currentElement.period}、族 ${currentElement.group} 的元素是以下哪个？`;
            correctAnswer = currentElement.name;
            break;
    }
    questionElement.textContent = questionText;

    let options;
    switch (currentQuestionType) {
        case 'nameToPeriod':
            options = allPeriods;
            break;
        case 'nameToGroup':
            options = allGroups;
            break;
        default:
            options = [correctAnswer];
            while (options.length < 4) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                let option;
                switch (currentQuestionType) {
                    case 'numberToName':
                        option = randomElement.name;
                        break;
                    case 'nameToNumber':
                        option = randomElement.number.toString();
                        break;
                    case 'nameToSymbol':
                        option = randomElement.symbol;
                        break;
                    case 'symbolToName':
                        option = randomElement.name;
                        break;
                    case 'periodAndGroupToName':
                        option = randomElement.name;
                        break;
                }
                if (!options.includes(option)) {
                    options.push(option);
                }
            }
            if (currentQuestionType === 'nameToNumber') {
                // 先存储原始顺序
                const originalOrder = [...options];
                // 打乱顺序
                options = shuffleArray(options);
                // 如果是数字排序，再重新排序
                if (currentQuestionType === 'nameToNumber') {
                    options.sort((a, b) => parseInt(a) - parseInt(b));
                    // 如果重新排序后顺序和原始顺序一样，再打乱一次
                    if (JSON.stringify(options) === JSON.stringify(originalOrder)) {
                        options = shuffleArray(options);
                    }
                }
            } else {
                options = shuffleArray(options);
            }
    }

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => checkAnswer(button);
        button.addEventListener('mousedown', createRipple);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button) {
    const userAnswer = button.textContent;
    const resultElement = document.getElementById('result');
    const elementInfo = `该元素的详细信息：名称-${currentElement.name}，符号-${currentElement.symbol}，原子序数-${currentElement.number}，周期-${currentElement.period}，族-${currentElement.group}。`;

    if (userAnswer === correctAnswer) {
        correctCount++;
        resultElement.textContent = `回答正确！ ${elementInfo}`;
        resultElement.style.color = "#16a34a";
    } else {
        wrongCount++;
        resultElement.textContent = `回答错误，正确答案是：${correctAnswer}。 ${elementInfo}`;
        resultElement.style.color = "#dc2626";
    }

    if (!hasAnswered) {
        hasAnswered = true;
        const progressContainer = document.querySelector('.progress-container');
        progressContainer.classList.add('has-answered');
    }

    updateProgressBar();

    // 生成新的问题
    generateQuestion();
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('colorMode', isDarkMode ? 'dark' : 'light');
}

function updateProgressBar() {
    const total = correctCount + wrongCount;
    const percentage = total === 0 ? 0 : (correctCount / total) * 100;
    const progressBar = document.getElementById('progress-bar');
    const progressTextCorrect = document.createElement('span');
    progressTextCorrect.className = 'progress-text-correct';
    progressTextCorrect.textContent = `答对: ${correctCount}`;
    const progressTextWrong = document.createElement('span');
    progressTextWrong.className = 'progress-text-wrong';
    progressTextWrong.textContent = `答错: ${wrongCount}`;

    const progressContainer = document.querySelector('.progress-container');
    // 先清空之前的提示文字
    const existingTexts = progressContainer.querySelectorAll('.progress-text-correct, .progress-text-wrong');
    existingTexts.forEach(text => text.remove());

    progressContainer.appendChild(progressTextCorrect);
    progressContainer.appendChild(progressTextWrong);

    progressBar.style.width = `${percentage}%`;
}

// 初始化第一个问题
generateQuestion();