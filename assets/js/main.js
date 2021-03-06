var nextQuestionBtn = document.getElementsByClassName('js-goto-next-question'),
    citySelect = document.getElementById('city-select'),
    machineAgeSelect = document.getElementById('machine-age-select'),
    howOftenSelect = document.getElementById('how-often-select'),
    machineAgeTxt = document.getElementById('machineAgeTxt'),
    machineRealAgeTxt = document.getElementById('machineRealAgeTxt'),
    copyDiscountCodeBtn = document.querySelector('.js-result-discount'),
    copyDiscountCodeText = document.querySelector('.js-result-discount-code'),
    termOfUseBtn = document.querySelector('.js-result-term-of-use-btn'),
    startTestBtn = document.getElementById('start-test-btn'),
    resultTitle = document.getElementById('result-title'),
    techForm = document.getElementById('form'),
    fullname = document.getElementById('fullname'),
    phone = document.getElementById('phone'),
    email = document.getElementById('email'),
    city = document.getElementById('city'),
    district = document.getElementById('district'),
    submitFormBtn = document.getElementById('submitForm'),
    getDiscountBtn = document.querySelector('.js-get-service-discount-btn'),
    modal,
    questions_answers= [],
    limit = { YOUNG: 8, MIDDLE: 13, OLD: 14  },
    category = { YOUNG: "young", MIDDLE: "middle", OLD: "old" },
    headlines = { YOUNG: 'BRAVOOO', MIDDLE: 'TAM ZAMANINDA YETİŞTİK', OLD: "YANİ NASIL SÖYLESEM BİLEMİYORUM" };

window.addEventListener('DOMContentLoaded', (event) => {
    pageView();
    setVisible('#fullpage', false);
    setVisible('.loading', false);
    
});
window.onresize = function () {
    document.body.height = window.innerHeight;
}
window.onload = function () {
    console.log('onload');
    // fullpage.js init
    var myFullpage = new fullpage('#fullpage', {
        fixedElements: '.mo-header',
        controlArrows: false,
        normalScrollElements: '.modal-body',
        keyboardScrolling: false,
        scrollOverflow: true,
        autoScrolling: true,
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
            fullpage_api.reBuild();
        },
    });
    //disabling scrolling
    fullpage_api.setAllowScrolling(false);
    //fullpage_api.moveTo(9);

    //start test btn click
    startTestBtn.addEventListener('click', function (e) {
        e.preventDefault();

        checkAddBlocker(function (result) {
            if (result) {
                console.log('Welcome Screen, addblocker açık');
                window.history.pushState({}, "", '?soru=1');
                nextQuestion();
            } else {
                window.dataLayer.push({
                    'event': 'WelcomeScreen',
                    'eventCallback': function () {
                        window.history.pushState({}, "", '?soru=1');
                        console.log('Welcome Screen, addblocker kapalı');
                        nextQuestion();
                    },
                    'eventTimeout': 1500
                })
            }
        })

    })
    //nextQuestions
    Array.from(nextQuestionBtn).forEach(function (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function(){
            var question = this.getAttribute('data-question');
            var the_answer = this.getAttribute('data-value');
            switch (question){
                case '4':
                    questions_answers.push({
                        id: "q4",
                        value: the_answer
                    });
                break;
                case '5':
                    questions_answers.push({
                        id: "q5",
                        value: the_answer
                    });
                break;
                case '6':
                    questions_answers.push({
                        id: "q6",
                        value: the_answer
                    });
                break;
                case '7':
                    questions_answers.push({
                        id: "q7",
                        value: the_answer
                    });
                break;
                case '8':
                    questions_answers.push({
                        id: "q8",
                        value: the_answer
                    });
                    var calc = new Calculator(questions_answers);
                    var score = calc.calculate();
                    var result_obj = getResultPageContent(score);
                    machineRealAgeTxt.innerText = result_obj.metabolicAge; 
                    machineAgeTxt.innerText = result_obj.realAge
                    var title = '';
                    if (result_obj.realAge <= 2) {
                        if (score < limit.YOUNG) {
                            title = headlines.YOUNG;
                        } else if (score < limit.MIDDLE) {
                            title = headlines.MIDDLE;
                        } else if (score >= limit.OLD) {
                            title = headlines.OLD;
                        }
                    } else if (result_obj.realAge <= 5) {
                        if (score < limit.YOUNG) {
                            title = headlines.YOUNG;
                        } else if (score < limit.MIDDLE) {
                            title = headlines.MIDDLE;
                        } else if (score >= limit.OLD) {
                            title = headlines.OLD;
                        }
                    } else if (result_obj.realAge <= 7) {
                        if (score < limit.YOUNG) {
                            title = headlines.YOUNG;
                        } else if (score < limit.MIDDLE) {
                            title = headlines.MIDDLE;
                        } else if (score >= limit.OLD) {
                            title = headlines.OLD;
                        }
                    } else if (result_obj.realAge <= 9) {
                        if (score < limit.YOUNG) {
                            title = headlines.YOUNG;
                        } else if (score < limit.MIDDLE) {
                            title = headlines.MIDDLE;
                        } else if (score >= limit.OLD) {
                            title = headlines.OLD;
                        }
                    } else {
                        if (score < limit.YOUNG) {
                            title = headlines.YOUNG;
                        } else if (score < limit.MIDDLE) {
                            title = headlines.MIDDLE;
                        } else if (score >= limit.OLD) {
                            title = headlines.OLD;
                        }
                    }
                    resultTitle.innerText = title;

                    
                break;
            }
            sendQuestionDataToGTM(question, the_answer, function () {
                nextQuestion();
            })
            
        });
    });
    //select city then nextQuestion
    citySelect.addEventListener('change',function(){
        questions_answers.push({
            id:"q1",
            value:this.value
        });
        sendQuestionDataToGTM('1', this.value, function () {
            nextQuestion();
        })
    } );
    
    //select machineAge then nextQuestion
    machineAgeSelect.addEventListener('change', function(){
        questions_answers.push({
            id:"q2",
            value:this.value
        });
        sendQuestionDataToGTM('2', this.value, function () {
            nextQuestion();
        })
    } );
    
    //select howOften then nextQuestion
    howOftenSelect.addEventListener('change', function(){
        questions_answers.push({
            id:"q3",
            value:this.value
        });
        sendQuestionDataToGTM('3', this.value, function () {
            nextQuestion();
        })
    });

    //copy discount code
    copyDiscountCodeBtn.onclick = function () {
        document.execCommand("copy");
        copyToClipboard('CALGONFIRSAT');
        copiedModal();
    }

    //getDiscountBtn click
    getDiscountBtn.addEventListener('click', function () {
        fullpage_api.moveTo(11);
    })

     function sendPost(cb){

        fetch('service/save.php', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(new FormData(techForm))),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            cb && cb(true)
            console.log(data);
        }).catch(function (error) {
            cb && cb(false)
            console.warn(error);
        });
    }

    submitFormBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var errorMessages = "";
        if (fullname.value == '') {
            errorMessages += 'Ad Soyad boş bırakılmamalıdır <br>'
        }
        if (email.value == '') {
            errorMessages += 'E-Posta boş bırakılmamalıdır <br>'
        } else if (!validateEmail(email.value)) {
            errorMessages += "Lütfen doğru formatta e-posta adresi giriniz."
        }
        if (phone.value == '') {
            errorMessages += 'Telefon boş bırakılmamalıdır <br>'
        }
        if (city.value == '') {
            errorMessages += 'Şehir boş bırakılmamalıdır <br>'
        }
        if (district.value == '') {
            errorMessages += 'İlçe boş bırakılmamalıdır <br>'
        }
        if (errorMessages == '') {
            sendPost(function (postResult) {
                if (postResult) {
                    checkAddBlocker(function (result) {
                        if (result) {
                            console.log('Form Gönderildi, addblocker açık');
                        } else {
                            window.dataLayer.push({
                                'event': 'SubmitForm',
                                'eventCallback': function () {
                                    console.log('Form Gönderildi, addblocker kapalı');
                                },
                                'eventTimeout': 1500
                            })
                        }
                    })
                    Swal.fire({
                        title: 'TEŞEKKÜRLER!',
                        text: 'Servis talebiniz başarıyla kaydedildi. Randevu zamanını belirlemek için ekibimiz en kısa sürede sizinle iletişime geçecek.',
                        icon: 'success',
                        confirmButtonText: 'Kapat',
                        willClose: function () {
                            // document.location.href = document.location.origin
                        }
                    })
                } else {
                    Swal.fire({
                        text: 'Hay aksi işleminiz yapılırken teknik bir sorun oluştu! Lütfen daha sonra yeniden deneyin.',
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                    })
                }
            })
            
            
        } else {
            Swal.fire({
                html: errorMessages,
                icon: 'error',
                confirmButtonText: 'Kapat'
            })
        }
    })

    hideModal();
    setVisible('#fullpage', true);
    setVisible('.loading', false);
}
// check regex
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//nextQuestion Fnc.
function nextQuestion() {
    fullpage_api.moveSectionDown();
}

//getDiscountFormShow
function getDiscountFormShow() {
    
}
//add dynamic copiedModal Fnc.
function copiedModal(id) {
    var el = document.getElementById(id);
    var body = document.querySelector('body');
    var modal_div = document.createElement('div');
    modal_div.innerHTML = `
        <div class="modal fade" id="copiedCode" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fs-2" id="exampleModalLabel">İNDİRİM KODU KOPYALANDI</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1 class="fs-5">KOPYALANAN İNDİRİM KODU : <strong>${copyDiscountCodeText.textContent}</strong></h1>
                    </div>
                </div>
            </div>
        </div>
    `
    body.appendChild(modal_div);
    modal = new bootstrap.Modal(document.getElementById('copiedCode'));
    modal.show();
}

//remove copiedModal Fnc.
function hideModal() {
    modal && modal.hide();
}
//copyToClipboard Fnc.
function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
//setVisible for loading Fnc.
function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}
//Calculator Fnc.
function Calculator(answers) {
    this.answers = answers;
    this.score = 0;
    this.ppm = 0;
};

Calculator.prototype.getAnswer = function(answerId) {
    var answer = '';
    this.answers.forEach(function(element) {
        if (element.id == answerId) { 
            answer = element; 
            return;
        }
    });
    return answer;
}

Calculator.prototype.calculate = function() {
    var self = this;

    this.answers.forEach(function(userAnswer, index) {
        switch(userAnswer.id) {
        case 'q1':
            var ppmScore = self.calculatePpmScore(userAnswer.value);
            self.score += (ppmScore * 0.12);
            break;

        case 'q3':
            var point = 0;
            if (userAnswer.value <= 3) {
                point = 1
            }
            else if(userAnswer.value > 3 && userAnswer.value <= 5) {
                point = 2
            }
	        else{
                point = 3
            }
            self.score += point
            break;

        case 'q4':
            if(userAnswer.value == 2) { 
                self.score += 3; 
            }
            else if(userAnswer.value == 3) {
                 self.score += 2; 
            }
	        else{
                self.score +=1;
            }
            break;

	    case 'q5':
            if(userAnswer.value == 2) { 
                self.score += 10; 
            }
            break;

        case 'q6':
            var point = 0;
            if(userAnswer.value == 2){
                self.score += 2;
            }
            break;

        case 'q7':
            if(userAnswer.value == 1) {
                 self.score += 6; 
            }
            break;

        case 'q8':
            var point = 0;
            if(userAnswer.value == 2) {
                 point = 6; 
            }
            else if(userAnswer.value == 3) { 
                point = 9; 
            }
            self.score += point
            break;

        default:
            break;
        }
    });

    return this.score;
};

Calculator.prototype.calculatePpmScore = function(cityOrRegion) {
    this.ppm = this.calculatePpm(cityOrRegion);
    
    if (this.ppm <= 100) {
        return 1;
    } else if( this.ppm >= 101 && this.ppm <= 150 ) {
        return 2;
    } else if( this.ppm >= 151 && this.ppm <= 250 ) {
        return 3;
    } else {
        return 3;
    }
}

Calculator.prototype.calculatePpm = function(cityOrRegion) {

    var score = 0;

    var region = {
        MARMARA: { key: "marmara", average: 173 },
        EGE: { key: "ege", average: 231 },
        AKDENIZ: { key: "akdeniz", average: 247 },
        KARADENIZ: { key: "karadeniz", average: 212 },
        IC_ANADOLU: { key: "ic-anadolu", average: 212 },
        DOGU_GUNEYDOGU: { key: "dogu-guneydogu", average: 180 },
    };

    var ppmData = [
        { id: region.MARMARA.key , value: region.MARMARA.average },
        { id: region.EGE.key , value: region.EGE.average },
        { id: region.AKDENIZ.key , value: region.AKDENIZ.average },
        { id: region.KARADENIZ.key , value: region.KARADENIZ.average },
        { id: region.IC_ANADOLU.key , value: region.IC_ANADOLU.average },
        { id: region.DOGU_GUNEYDOGU.key , value: region.DOGU_GUNEYDOGU.average },
        { id: 34 , value: 150 },
        { id: 41 , value: 107 },
        { id: 59 , value: 166 },
        { id: 54 , value: 125 },
        { id: 22 , value: 268 },
        { id: 10 , value: 171 },
        { id: 16 , value: 222 },
        { id: 20 , value: 286 },
        { id: 35 , value: 243 },
        { id: 48 , value: 247 },
        { id: 32 , value: 190 },
        { id: 45 , value: 294 },
        { id: 9 , value: 161 },
        { id: 3 , value: 197 },
        { id: 31 , value: 229 },
        { id: 33 , value: 214 },
        { id: 7 , value: 329 },
        { id: 46 , value: 208 },
        { id: 1 , value: 256 },
        { id: 67 , value: 132 },
        { id: 14 , value: 377 },
        { id: 61 , value: 181 },
        { id: 55 , value: 159 },
        { id: 6 , value: 120 },
        { id: 42 , value: 322 },
        { id: 19 , value: 296 },
        { id: 58 , value: 205 },
        { id: 68 , value: 252 },
        { id: 26 , value: 280 },
        { id: 38 , value: 122 },
        { id: 60 , value: 390 },
        { id: 63 , value: 164 },
        { id: 23 , value: 134 },
        { id: 24 , value: 208 },
        { id: 47 , value: 263 },
        { id: 27 , value: 255 },
        { id: 24 , value: 76 },
        { id: 44 , value: 162 },
        { id: 65 , value: 250 },
        { id: 21 , value: 136 },
        { id: 36 , value: 155 },
    ];

    ppmData.forEach(function(row) {
        if(row.id == cityOrRegion) {
            score = row.value;
            return score;
        }
    });

    return score;
}
//getQuestionAnswer Fnc.
var getQuestionAnswer = function(questionId) {
    var answer = '';
    for(var i = 0 ; i < questions_answers.length; i++){
        var element = questions_answers[i];
        if (element.id == questionId) { 
            answer = element; 
            break;
        }    
    }
    return answer;
}
//getResultPageContent Fnc.
var getResultPageContent = function(score) {
    var realAge = parseInt(getQuestionAnswer("q2").value);
    var metabolicAge = getMetabolicAge(parseInt(realAge), score, limit);
    return { realAge: realAge, metabolicAge: metabolicAge };
};
//getMetabolicAge Fnc.
var getMetabolicAge = function(realAge, score, limit) {
    var metabolicAge;
    if( score < limit.YOUNG ) { metabolicAge = realAge; }
    else if( score < limit.MIDDLE ) { metabolicAge = Math.ceil(realAge + (realAge * 0.25)); }
    else if( score >= limit.OLD ) { metabolicAge = Math.ceil(realAge + (realAge * 0.50)); }
    return metabolicAge;
};

//checkAddBlocker Fnc.
function checkAddBlocker(cb) {
    var testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    window.setTimeout(function () {
        cb && cb(testAd.offsetHeight === 0)
        testAd.remove();
    }, 100);
}

//pageView Fnc.
function pageView() {
    window.dataLayer.push({
        event: 'virtualPageView',  //fixed value you need to use as trigger in GTM
        virtualPagePath: document.location.href,
        virtualPageTitle: document.title
    });
}

//sendQuestionDataToGTM Fnc.
function sendQuestionDataToGTM(question, answer, cb) {
    
    if (parseInt(question) == 8) {
        window.history.pushState({}, "", '?sonuc');
    } else {
        window.history.pushState({}, "", '?soru=' + (parseInt(question) + 1));
    }
    checkAddBlocker(function (result) {
        if (result) {
            console.log('addblocker açık', 'question : ' + question, 'answer : ' + answer);
            cb && cb();
        } else {
            window.dataLayer.push({
                'event': 'UserAnswer',
                'question': question,
                'answer': answer,
                'eventCallback': function () {
                    console.log('addblocker kapalı', 'question : ' + question, 'answer : ' + answer);
                    cb && cb();
                },
                'eventTimeout': 1500
            })
        }
    })
}





