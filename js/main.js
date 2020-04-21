var paragraph = "really dont know what to type so imma just go brrrrr";
var types = [
	["one", "sun", "fun", "bye", "hi", "go", "bro", "low", "call", "sky"],
	["seven", "twin", "between", "space", "void", "empty", "crush", "angry", "rude", "crude"],
	["typewriter", "democracy", "diplomatic", "hypothesis", "pythagoras", "trapezium", "gymnasium", "conspicuous", "moment", "spectrum"]
];

var app = document.getElementById("app");
var typedStr = "";
var typed = document.querySelector('.typed');
var bgs = ["#FFB500", "#FF00C8", "#8900FF", "#006CFF"];
var wordEls = [];
var scoreEl = document.querySelector(".scoreEl");
var score = 0;
var level = 0;
var progressBar = document.querySelector('.progress-bar');


function rand(min, max){
	return Math.round((Math.random() * (max - min)) + min);
}

function showTyped(){
	typed.innerText = typedStr;
}

function showScore(){
	scoreEl.innerText = score;
}

function fill(){
	var  words = types[level];
	for(var i = 0; i < words.length; i++){
		var p = document.createElement("p");
		p.classList.add("word");
		var it = "";
		var chars = words[i].split("");
		for(var c of chars){
			it += "<span>" + c + "</span>"
		}
		p.innerHTML = it;
		p.style.backgroundColor = bgs[rand(0, bgs.length - 1)];
		p.style.left =  rand(10, innerWidth - 100) + "px";
		p.style.top = rand(5, innerHeight - 100) + "px";
		wordEls.push({el: p, word: words[i]});
	}
	
}

function render(){
	for(var p of wordEls){
		app.appendChild(p.el);
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
		setTimeout(function(){
			app.removeChild(o.el);
			wordEls = wordEls.filter(function(e){
				return e.word !== o.word;
			});
		}, 500);
		return;
	}
	for(var i  = 0; i < typedStr.length; i++){
		var c = typedStr[i];
		for(var _el of wordEls){
			var el = _el.el;
			var spans = el.querySelectorAll('span');
			if(i >= spans.length) continue
			var t = spans[i].innerText;
			if(t === c){
				if(!spans[i].classList.contains("active")){
					spans[i].classList.add("active")
				}
			}else{
				if(spans[i].classList.contains("active")){
					spans[i].classList.remove("active")
				}
			}
		}
	}
}

function init(){
	progressBar.classList.remove("active");
	typedStr = "";
	wordEls = [];
	var ps = document.querySelectorAll(".word");
	for(var p of ps){
		app.removeChild(p);
	}
	fill();
	render();
	showTyped();
	showScore();
	progressBar.classList.add("active");
}


function start(){
	var modal = document.querySelector('.modal');
	modal.classList.add("hide");
	modal.querySelector('.body.welcome').style.display = "none";
	modal.querySelector('.body.died').style.display = "block";
	init();
}




window.addEventListener('keydown', function(e){
	var k = e.key;
	if(k === "Backspace"){
		if(typedStr === "") return;
		typedStr = typedStr.substr(0, typedStr.length - 1);
	}else{
		typedStr += k;
	}
	showTyped();
	matchCheck();
});