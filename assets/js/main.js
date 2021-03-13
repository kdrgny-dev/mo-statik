var nextQuestionBtn = document.getElementsByClassName('js-goto-next-question'),
    citySelect = document.getElementById('city-select'),
    machineAgeSelect = document.getElementById('machine-age-select'),
    howOftenSelect = document.getElementById('how-often-select'),
    copyDiscountCodeBtn = document.querySelector('.js-result-discount'),
    copyDiscountCodeText = document.querySelector('.js-result-discount-code'),
    termOfUseBtn = document.querySelector('.js-result-term-of-use-btn');

window.onload = function () {
    // fullpage.js init
    var myFullpage = new fullpage('#fullpage', {
        fixedElements: '.mo-header',
        controlArrows: false,
        normalScrollElements: '.modal-body',
        keyboardScrolling: false,
        lockAnchors: true,
        scrollOverflow: true,
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
            
        },
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

    //copy discount code
    copyDiscountCodeBtn.onclick = function () {
        document.execCommand("copy");
        copiedModal('copiedCode');
    }
    copyDiscountCodeBtn.addEventListener("copy", function (event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", copyDiscountCodeText.textContent);
            console.log(event.clipboardData.getData("text"))
        }
    });

    

    //fullpage_api.moveTo(10);
    removeCopiedModal('copiedModal');
    //removeTermOfUseModal();

}



//nextQuestion Fnc.
function nextQuestion() {
    fullpage_api.moveSectionDown();
}

//add dynamic copiedModal
function copiedModal(id) {
    var el = document.getElementById(id);
    var body = document.querySelector('body');
    var modal = document.createElement('div');
    modal.innerHTML = `
        <div class="modal fade" id="copiedCode" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fs-2" id="exampleModalLabel">İNDİRİM KODU KOPYALANDI</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1 class="fs-3">KOPYALANAN İNDİRİM KODU : <strong>${copyDiscountCodeText.textContent}</strong></h1>
                    </div>
                </div>
            </div>
        </div>
    `
    body.appendChild(modal);
    var modal = new bootstrap.Modal(document.getElementById('copiedCode'));
    modal.toggle();
}

//remove copiedModal
function removeCopiedModal() {
    var modal = new bootstrap.Modal(document.getElementById('copiedCode'));
    modal.addEventListener('hidden.bs.modal', function (event) {
        modal.dispose()
    })
}

function hideAllSection() {
    if (origin.index = 9) {
        var sections = document.getElementsByClassName('section');
        Array.from(sections).forEach(function (section) {
            section.classList.add = 'd-none';
            console.log('section : ', section);
        })
    }
}


