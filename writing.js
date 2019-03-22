var botInfo = {
    'data': [],
    'speed': 100,
    'disableTimer': true,
    'running': true,
    'prevAnswer': ''
};

if (botInfo.disableTimer) for (let index = setInterval(';'), i = 0; i < index; i++) clearInterval(i);

setInterval(() => {
    try {
        if (botInfo.running) {
            let buttons = document.getElementsByTagName('button'),
                container = document.getElementById('question-container-group'),
                question = container.firstElementChild.lastElementChild,
                inputs = document.querySelectorAll('input[class=textbox-component]'),
                answer = getAnswerFromData(question.textContent);

            if (answer && answer.length == inputs.length) {
                for (let i = 0; i < answer.length; i++) {
                    inputs[i].value = answer[i];
                }
            } else {
                let answerElements = document.getElementsByClassName('correct-answer-text'),
                    tempAnswers = [],
                    tempQuestion = question.textContent;

                for (let i = 0; i < answerElements.length; i++) {
                    tempAnswers.push(answerElements[i].textContent);
                }

                addToData(tempQuestion, tempAnswers);
            }

            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].textContent.indexOf('Submit') != -1) buttons[i].click();
            }

            setTimeout(() => {
                for (let i = 0; i < buttons.length; i++) {
                    if (buttons[i].textContent.indexOf('Next Question') != -1) buttons[i].click();
                }
            }, botInfo.speed + 100);
        }
    } catch (e) { }
}, botInfo.speed);

function getAnswerFromData(question) {
    for (let i = 0; i < botInfo.data.length; i++) {
        if (botInfo.data[i].question == question) return botInfo.data[i].answer;
    }
    return false;
}

function addToData(question, answers) {
    let goodData = true;

    if (question == '' || answers.length < 1 || JSON.stringify(answers) == botInfo.prevAnswer) goodData = false;
    for (let i = 0; i < botInfo.data.length; i++) if (botInfo.data[i].question == question) goodData = false;

    if (goodData) {
        botInfo.prevAnswer = JSON.stringify(answers);
        botInfo.data.push({ 'question': question, 'answer': answers });
    }

    return goodData;
}
