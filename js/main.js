var paragraph = "Really dont know what to type so imma just go Brrrrr";
var  words = paragraph.split(" ");
var app = document.getElementById("app");
var typedStr = "";
var typed = document.querySelector('.typed');
var bgs = ["#FFB500", "#FF00C8", "#8900FF", "#006CFF"];
var wordEls = [];

var selectedWords = [];


function rand(min, max){
	return Math.round((Math.random() * (max - min)) + min);
}

function showTyped(){
	typed.innerText = typedStr;
}

function fill(){
	for(var i = 0; i < 10; i++){
		selectedWords.push(words[i]);
		var p = document.createElement("p");
		p.classList.add("word");
		var it = "";
		var chars = words[i].split("");
		for(var c of chars){
			it += "<span>" + c + "</span>"
		}
		p.innerHTML = it;
		p.style.backgroundColor = bgs[rand(0, bgs.length - 1)];
		p.style.transform = "translate(" + rand(10, innerWidth - 100) + "px, " + rand(5, innerHeight - 100) + "px)";
		wordEls.push(p);
	}
}

function render(){
	for(var w of wordEls){
		app.appendChild(w);
	}
}

function matchCheck(){
	alert(selectedWords);
}



fill();
render();
matchCheck();

window.addEventListener('keyup', function(e){
	k = e.keyCode || e.which;
	if(k === 8 && typedStr.length > 0){
		typedStr = typedStr.substr(0, typedStr.length - 1);
	}else{
		typedStr += String.fromCharCode(k);
	}
	showTyped();
	matchCheck();
});