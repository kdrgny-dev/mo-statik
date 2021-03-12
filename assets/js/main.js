var nextQuestionBtn = document.querySelector('.js-goto-next-question'),
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
            var loadedSection = this;
            var q1 = document.querySelector('.q1 .q-item'),
            q1Img = document.querySelector('.q1 img');
            q2 = document.querySelector('.q2 .q-item');
            q2Img = document.querySelector('.q2 img');
            q3 = document.querySelector('.q3 .q-item');
            q3Img = document.querySelector('.q3 img');
            q4 = document.querySelector('.q4 .q-item');
            q4Img = document.querySelector('.q4 img');

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
                default:
                    break;
            }
            
        }
    });
    //disabling scrolling
    fullpage_api.setAllowScrolling(false);
    //nextQuestion
    nextQuestionBtn.addEventListener('click', nextQuestion);
    //select city then nextQuestion
    citySelect.addEventListener('change', nextQuestion);
    //select machineAge then nextQuestion
    machineAgeSelect.addEventListener('change', nextQuestion);
    //select howOften then nextQuestion
    howOftenSelect.addEventListener('change', nextQuestion);

}



//nextQuestion Fnc.
function nextQuestion() {
    fullpage_api.moveSectionDown();
    
}


