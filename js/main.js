var types = [
	["one", "sun", "fun", "bye", "hi", "go", "bro", "low", "call", "sky", "joy", "bull", "bat", "cat", "odd"],
	["seven", "twin", "round", "space", "void", "empty", "crush", "angry", "rude", "crude", "even", "swim", "string", "team", "dream"],
	["typewriter", "democracy", "diplomatic", "hypothesis", "pythagoras", "trapezium", "gymnasium", "conspicuous", "moment", "spectrum", "analysis", "dentist", "inovation", "coding", "humanoid"],
	["pulchritudinous", "consanguineous", "psychotomimetic", "trichotillomania", "omphaloskepsis", "myrmecophilous", "xenotransplantation", "embourgeoisement", "polyphiloprogenitive", "tergiversation", "impedimenta", "jackasseries", "connecticutian", "demonitization", "horizontal"]
];
var dl = 10;
var app = document.getElementById("app");
var typedStr = "";
var typed = document.querySelector('.typed');
var bgs = ["#f44336", "#9c27b0", "#673ab7", "#2196f3", "#009688", "#4caf50", "#ff9800", "#795548", "#000000", "#607d8b"];
var wordEls = [];
var scoreEl = document.querySelector(".scoreEl");
var score = 0;
var level = 0;
var progressBar = document.querySelector('.progress-bar');
var modal = document.querySelector('.modal');
var renderer;
var gameHasStarted = false;

function rand(min, max){
	return Math.round((Math.random() * (max - min)) + min);
}

function setDifficulty(v){
	dl = parseInt(v);
}

function showTyped(){
	typed.innerText = typedStr || "Start typing ...";
}

function showScore(){
	scoreEl.innerText = score;
}

function fill(){
	var  words = types[level];
	for(var i = 0; i < dl; i++){
		var p = document.createElement("p");
		p.classList.add("word");
		var it = "";
		var chars = words[i].split("");
		for(var c of chars){
			it += "<span>" + c + "</span>";
		}
		p.innerHTML = it;
		wordEls.push({el: p, word: words[i]});
	}
	
}

function render(){
	for(var el of wordEls){
		var p = el.el;
		p.style.backgroundColor = bgs[rand(0, bgs.length - 1)];
		p.style.left =  rand(10, innerWidth - ((level + 1) * 70)) + "px";
		p.style.top = rand(5, innerHeight - 100) + "px";
		app.appendChild(p);
		p.style.left =  rand(10, innerWidth - ((level + 1) * 70)) + "px";
		p.style.top = rand(5, innerHeight - 100) + "px";
	}
}

function highlight(){
	for(var i  = 0; i < typedStr.length; i++){
		var c = typedStr[i];
		for(var _el of wordEls){
			var el = _el.el;
			var spans = el.querySelectorAll('span');
			if(i >= spans.length) continue
			var t = spans[i].innerText;
			if(t === c){
				spans[i].classList.add("active");
			}
		}
	}
}

function clearHighlighted(){
	for(var _el of wordEls){
		var el = _el.el;
		var spans = el.querySelectorAll('span');
		for(var span of  spans){
			span.classList.remove("active");
		}
	}
}

function clearWords(){
	var ps = document.querySelectorAll(".word");
	for(var p of ps){
		app.removeChild(p);
	}
}

function matchCheck(){
	clearHighlighted();
	var o = wordEls.find(function(e){
		return e.word === typedStr;
	});
	if(o){
		o.el.classList.add("fade");
		typedStr = "";
		score += 10;
		showTyped();
		showScore();
		wordEls = wordEls.filter(function(e){
			return e.word !== o.word;
		});
		if(wordEls.length < 1){
			next();
		}
		setTimeout(function(){
			app.removeChild(o.el);
		}, 500);
		return;
	}
	highlight();
}

function init(){
	progressBar.classList.remove("active");
	typedStr = "";
	wordEls = [];
	clearWords();
	fill();
	render();
	typed.innerText = "Start typing ...";
	showScore();
	progressBar.classList.add("active");
}

function timer(){
	renderer = setTimeout(function(){
		gameHasStarted = false;
		modal.classList.remove("hide");
	}, 60000);
}

function start(){
	modal.classList.add("hide");
	modal.querySelector('.body.welcome').style.display = "none";
	modal.querySelector('.body.died').style.display = "block";
	level = 0;
	score = 0;
	init();
	timer();
	gameHasStarted = true;
}

function next(){
	clearTimeout(renderer);
	level++;
	timer();
	if(level < types.length){
		init();
		return;
	}
	modal.classList.remove("hide");
	document.querySelector(".finalMsg").innerText = "Game Completed!!!";
}




window.addEventListener('keydown', function(e){
	if(!gameHasStarted){
		start();
		return;
	}
	var k = e.key;
	if(k === " ") return;
	if(k === "Backspace"){
		if(typedStr === "") return;
		typedStr = typedStr.substr(0, typedStr.length - 1);
	}else{
		typedStr += k;
	}
	showTyped();
	matchCheck();
});