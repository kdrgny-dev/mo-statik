var nextQuestionBtn = document.getElementsByClassName('js-goto-next-question'),
    citySelect = document.getElementById('city-select'),
    machineAgeSelect = document.getElementById('machine-age-select'),
    howOftenSelect = document.getElementById('how-often-select');

window.onload = function () {
    // fullpage.js init
    var myFullpage = new fullpage('#fullpage', {
        fixedElements: '.mo-header',
        controlArrows: false,
        normalScrollElements: '.modal-body',
        keyboardScrolling: false,
        lockAnchors: true,
        licenseKey: 'EDC04CA5-2F844012-B43EC46E-3FD15BCB',
        onLeave: function (origin) {
            var loadedSection = this,
                q1 = document.querySelector('.q1 .q-item'),
                q1Img = document.querySelector('.q1 img'),
                q2 = document.querySelector('.q2 .q-item'),
                q2Img = document.querySelector('.q2 img'),
                q3 = document.querySelector('.q3 .q-item'),
                q3Img = document.querySelector('.q3 img'),
                q4 = document.querySelector('.q4 .q-item'),
                q4Img = document.querySelector('.q4 img'),
                q5 = document.querySelector('.q5 .q-item'),
                q5Img = document.querySelector('.q5 img'),
                q6 = document.querySelector('.q6 .q-item'),
                q6Img = document.querySelector('.q6 img'),
                q7 = document.querySelector('.q7 .q-item'),
                q7Img = document.querySelector('.q7 img'),
                q8 = document.querySelector('.q8 .q-item'),
                q8Img = document.querySelector('.q8 img');

            //using index
            switch (origin.index) {
                case 0:
                    q1.classList.add('animate__animated', 'animate__fadeInLeft');
                    q1Img.classList.add('animate__animated', 'animate__fadeInRight');
                    break;
                case 1:
                    q2.classList.add('animate__animated', 'animate__fadeInRight');
                    q2Img.classList.add('animate__animated', 'animate__fadeInLeft');
                    break;
                case 2:
                    q3.classList.add('animate__animated', 'animate__fadeInLeft');
                    q3Img.classList.add('animate__animated', 'animate__fadeInRight');
                    break;
                case 3:
                    q4.classList.add('animate__animated', 'animate__fadeInRight');
                    q4Img.classList.add('animate__animated', 'animate__fadeInLeft');
                    break;
                case 4:
                    q5.classList.add('animate__animated', 'animate__fadeInLeft');
                    q5Img.classList.add('animate__animated', 'animate__fadeInRight');
                    break;
                case 5:
                    q6.classList.add('animate__animated', 'animate__fadeInRight');
                    q6Img.classList.add('animate__animated', 'animate__fadeInLeft');
                    break;
                case 6:
                    q7.classList.add('animate__animated', 'animate__fadeInLeft');
                    q7Img.classList.add('animate__animated', 'animate__fadeInRight');
                    break;
                case 7:
                    q8.classList.add('animate__animated', 'animate__fadeInRight');
                    q8Img.classList.add('animate__animated', 'animate__fadeInLeft');
                    break;
                default:
                    break;
            }
            
        }
    });
    //disabling scrolling
    fullpage_api.setAllowScrolling(false);
    //nextQuestion
    Array.from(nextQuestionBtn).forEach(function (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', nextQuestion);
    });
    //select city then nextQuestion
    citySelect.addEventListener('change', nextQuestion);
    //select machineAge then nextQuestion
    machineAgeSelect.addEventListener('change', nextQuestion);
    //select howOften then nextQuestion
    howOftenSelect.addEventListener('change', nextQuestion);

}



//nextQuestion Fnc.
function nextQuestion() {
    console.log('butona tıklandı', nextQuestionBtn)
    fullpage_api.moveSectionDown();
    
}


