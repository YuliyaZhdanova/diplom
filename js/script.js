//Модальное окно

let popupBtn = document.querySelector('.popup-btn'), 
	custom_elem = document.querySelectorAll('.custom > div'),
	overlay = document.querySelector('.overlay'),
	popup = document.querySelector('.popup'),
	main = document.querySelector('.main'),
	custom = document.querySelector('.custom');
 		

	popupBtn.addEventListener('click', function() {
		
		main.style.display = 'none';
		overlay.style.display = 'none';
		custom.style.display = 'flex';
		
		for (var i = 0; i < custom_elem.length; i++) {
		    custom_elem[i].style.display = 'block';
		    }
	});

//создание кандидата

let candidate_name = document.getElementById('name'),
	candidate_age = document.getElementById('age'),
	candidate_bio = document.getElementById('bio'),
	candidate_view = document.querySelectorAll('select > option'),
	female = document.getElementById('female'),
	male = document.getElementById('male'),
	candidate_sex = document.querySelector('.radio'),
	cards = document.querySelector('.main-cards'),
	candidates = document.getElementsByClassName('main-cards-item'),
	names = document.getElementsByClassName('name'),
	ages = document.getElementsByClassName('age'),
	bios = document.getElementsByClassName('bio'),
	sexs = document.getElementsByClassName('sex'),
	views = document.getElementsByClassName('views'),
	progress = document.getElementsByClassName('progress-bar'),
	result = document.getElementsByClassName('result-count'),
	readyBtn = document.getElementById('ready');

	
	const candidate = {		 
		candidateName: name,
		candidateAge: age,
		candidateBio: bio , 
	};


candidate_name.addEventListener('change', () => {

	let name =  candidate_name.value;
	if(isNaN(name) && name != '') { 
		candidate.candidateName = name;
	}
});

candidate_age.addEventListener('change', () => {
   	 let age =  candidate_age.value;
   		if(age == '' || isNaN(age)) { 			 
   		alert('Введите число');
   		candidate_age.value = '';	
   	} else if (age < 35) {
   		alert('Кандидату нет должно быть больше 35 лет');
   		candidate_age.value = '';
   	} else if (age > 100) {
   		alert('Кандидат слишком старый');
   		candidate_age.value = '';
   	} else {
   		candidate.candidateAge = age;
   		
   	}
});

candidate_bio.addEventListener('change', () => { 
	let bio =  candidate_bio.value;
	if(bio != '') {
		candidate.candidateBio = bio;
	}
});

female.onchange = function() {
	slides.style.backgroundImage = 'url(img/construct-1.png)';
	slide.style.backgroundImage = 'url(img/construct-1.png)';
};
male.onchange = function() {
	slides.style.backgroundImage = 'url(img/construct-6.png)';
	slide.style.backgroundImage = 'url(img/construct-6.png)';
};

//слайдер 

let slideIndex = 1,
	slides = document.getElementsByClassName('person-easy')[0],
	slide = document.getElementsByClassName('preview')[0]
	prev = document.querySelector('.prev'),
	next = document.querySelector('.next');  

	showSlides(slideIndex);

	function showSlides(n) {

		if (n > 8) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = 8;
		}

		for (let i=1; i < n; i++) {
			slides.style.backgroundImage = 'url(img/construct-' + i+ '.png)';
			slide.style.backgroundImage = 'url(img/construct-' + i+ '.png)';
			 
			if (i > 0 && i < 5) {
				female.checked = true;
			}
			if (i > 4 && i < 9) {
				male.checked = true;
			}
		}	 
	}

	function plusSlides(n) {
		showSlides(slideIndex += n); 
	}

	function currentSlide(n) {
		showSlides(slideIndex = n); 
	}

	prev.addEventListener('click', function() {
	  plusSlides(-1);
	});

	next.addEventListener('click', function() {
	  plusSlides(1);
	});

			  

//кнопка готово

readyBtn.addEventListener('click', function() {
if(candidate_name.value != '' && candidate_age.value != '' && candidate_bio.value != '') {	
	main.style.display = 'block'; 
	custom.style.display = 'none';

	for (var i = 0; i < custom_elem.length; i++) {
	    custom_elem[i].style.display = 'none';
	    };

	candidates[0].classList.remove('main-cards-item-active');

	var new_candicate = document.createElement('div');
	new_candicate.classList.add('main-cards-item'); 

	cards.appendChild(new_candicate);
	new_candicate.innerHTML = candidates[1].innerHTML;
	cards.insertBefore(candidates[2], candidates[1]);

	let photo = document.getElementsByClassName('photo')[1];
	 
	photo.style.backgroundImage =  slides.style.backgroundImage;
	photo.style.backgroundSize =  'contain';

	names[1].innerHTML = candidate.candidateName;
	ages[1].innerHTML = candidate.candidateAge + ' лет';
	bios[1].innerHTML = candidate.candidateBio;
	
	if (male.checked = true) {
		sexs[1].innerHTML = 'Мужской';
	};
	
	if (female.checked = true) {
		sexs[1].innerHTML = 'Женский';
	};

   	if (candidate_view[1].selected) { 
   		let view = '';
   		views[1].innerHTML = 'Левые'   ;
   		candidate.candidateViews = view;
   	}
   	
   	if (candidate_view[2].selected) { 
   		let view = '';
   		views[1].innerHTML = 'Правые'   ; 
   		candidate.candidateViews = view;
   	}
   	
   	if (candidate_view[0].selected) { 
   		let view = '';
   		views[1].innerHTML = 'Либеральные'   ;
   		candidate.candidateViews = view;
   	}

	for (let i = 0; i <3; i++) {
		progress[i].style.height = '0';
		result[i].innerHTML = '0%';
	}
	 
} else {
	alert('Заполните все поля');
}

});
 

//кнопка сбросить результаты

let reset = document.getElementById('reset');

reset.addEventListener('click', () => {

	main.style.display = 'none';
	overlay.style.display = 'none';
	custom.style.display = 'flex';
	cards.removeChild(candidates[1]);
	console.log(candidate_view); 

	for (var i = 0; i < custom_elem.length; i++) {
	    custom_elem[i].style.display = 'block';
	    }

});

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }


//кнопка провести выборы

let resultBtn = document.getElementById('voting');

const arr = [];

resultBtn.addEventListener('click', () => {


	let max = 100,
		sum = 0;
	for (let i = 0; i < 3; i++) {
		arr[i] = randomInteger(1, max-2);
		progress[i].style.height = arr[i] + '%';
		result[i].innerHTML = arr[i] + '%';
		max -= arr[i];
		sum +=arr[i];
		if (sum !=100) {
			arr[2] = 100 - arr[1] - arr[0];
			progress[2].style.height = arr[2] + '%';
			result[2].innerHTML = arr[2] + '%';
		}

	}
	

	if (arr[0] > arr[1] && arr[0] > arr[2]) {
		candidates[0].classList.add('main-cards-item-active');
		candidates[1].classList.remove('main-cards-item-active');
		candidates[2].classList.remove('main-cards-item-active');
	} else if (arr[1] > arr[0] && arr[1] > arr[2]) {
		candidates[1].classList.add('main-cards-item-active');
		candidates[0].classList.remove('main-cards-item-active');
		candidates[2].classList.remove('main-cards-item-active');
	} else {
		candidates[2].classList.add('main-cards-item-active');
		candidates[1].classList.remove('main-cards-item-active');
		candidates[0].classList.remove('main-cards-item-active');
	}

});

//кнопка вмешаться в выборы

let crimeBtn = document.getElementById('crime');

crimeBtn.addEventListener('click', () => {

	arr[1] = 25 + randomInteger(1,73);
	arr[0] = randomInteger(1, 99 - arr[1]);
	arr[2] = 100 - arr[0] - arr[1];


	for (let i = 0; i <3; i++) {
		progress[i].style.height = arr[i] + '%';
		result[i].innerHTML = arr[i] + '%';

	}

	if (arr[0] > arr[1] && arr[0] > arr[2]) {
		candidates[0].classList.add('main-cards-item-active');
		candidates[1].classList.remove('main-cards-item-active');
		candidates[2].classList.remove('main-cards-item-active');
	} else if (arr[1] > arr[0] && arr[1] > arr[2]) {
		candidates[1].classList.add('main-cards-item-active');
		candidates[0].classList.remove('main-cards-item-active');
		candidates[2].classList.remove('main-cards-item-active');
	} else {
		candidates[2].classList.add('main-cards-item-active');
		candidates[1].classList.remove('main-cards-item-active');
		candidates[0].classList.remove('main-cards-item-active');
	}

});

