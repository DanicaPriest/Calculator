var position = 0;
function chngClr(){
  var calcClrs = ["#cad3e7", "#68e3c5", "#f075f0", "#ff531a", "#a6733f", "#5299e0","#e8baf7", "#a682c9", "#c8d6ea", "#99002b" ]
var screenClrs = ["#e9deed","#bed9f3", "#f7d4e2", "#cffcfc", "#e8cbb0","#c2f0f0", "#fdffff", "#ffff99", "#ead0c8", "#4d0016"];
var textClrs = ["#522d2d", "#0a0f0d", "#120a29", "#4b0a02", "#3c2610","#000066", "#272d06", "#1a1023", "#783a4a", "white"];
var numClrs = ["#e8584a","#067966","#9494d1", "#8ce2d9", "#cce6ff", "#b30000", "#6a7c0e", "#ffd24d", "#dbbdbd", "#e46791"];
var clearClrs = ["#7d3636", "#0e251c","#3c2e6b", "#ca1b00", "#00284d", "#0047b3", "#7b1e3d", "#0d0d59", "#783a4a", "#f0a8c0" ];
var actionClrs = ["#ac3939", "#1c4a4a","#d9266e", "#2a6f69","#004f99", "#99000a", "#73262d", "#402759","#af6a8c", "#f7d4e0"];
 
 position++;
 if (position > calcClrs.length - 1){
   position = 0;
 };
  
  document.getElementById("calcbody").style.background = calcClrs[position];
  document.getElementById("screen").style.background = screenClrs[position];
  document.getElementById("calcbody").style.color = textClrs[position];
  var x = document.getElementsByClassName("smlbtn");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.backgroundColor =  numClrs[position];
 
  
}
  document.getElementById("ce").style.background = clearClrs[position];
  document.getElementById("ac").style.background = clearClrs[position];
  
  document.getElementById("plus").style.background = actionClrs[position];
  document.getElementById("minus").style.background = actionClrs[position];
  document.getElementById("times").style.background = actionClrs[position];
  document.getElementById("divide").style.background = actionClrs[position];
  document.getElementById("equals").style.background = "linear-gradient(to top left,"+ clearClrs[position] + " 0%," + actionClrs[position]+ " 20%,"+ numClrs[position]+ " 40%,"+ actionClrs[position] +" 70%,"+ clearClrs[position] + " 100%)";
  
  document.getElementById("calcbody").style.setProperty("--box-shadow-color", textClrs[position]);
  document.body.style.backgroundColor = actionClrs[position];
  document.getElementById("calcbody").style.setProperty("--screen-color", screenClrs[position]);
  
}
//Calculator Code

var topScreen = document.getElementById("display");
var lowScreen = document.getElementById("equation");
var maxLength = 14;
var current = "0";
var previous = "0";
var problem = [];
var answer = 0;

function addNum(num){if (answer === current){
  clearAll();
}
  if (current.length == maxLength){
  tooBig()
}else{
  if (eval(current)== 0 && current.indexOf(".") == -1){current = num.toString()} else{
    current = current + num.toString()};
  topScreen.innerHTML= current;
  previous = num;
}
                    };
function addDecimal(){
  
  if (current.indexOf(".")== -1){
    current= current + ".";
  }
  topScreen.innerHTML = current;
  
};
function addOp (op){
  if (answer === current){
    problem = [];
    lowScreen.innerHTML = " ";
  }
  if (previous == "+" || previous == "-" || previous == "/" || previous == "*"){
    problem.pop();
  }
  else{
  problem.push(current)};
  problem.push(op);
  topScreen.innerHTML = op;
  console.log(problem)
  previous = op;
  if(lowScreen.textContent.length > 20){
    var newDisplay = problem.join(" ");
    lowScreen.innerHTML = newDisplay.slice(-20)
  }
  else{
  lowScreen.innerHTML = problem.join(" ");}
  current = "0";
};
function calculate(){
  problem.push(current);
  problem = problem.join(" ");
  answer = eval(problem);
  if (answer.toString().length > maxLength){if (answer.toString().indexOf(".") !== -1 && answer.toString().indexOf(".") < maxLength -1){
     var displayAnswer = answer.toString().slice(0, maxLength);
    if (problem.length + answer.toString().length > 20){lowScreen.innerHTML = displayAnswer}else{
    
    lowScreen.innerHTML = problem + " = " + displayAnswer;  }
    topScreen.innerHTML = displayAnswer;
    current = answer;
    return;
  } else{ return tooBig(); }}
  if (problem.length + answer.toString().length > 20){
    lowScreen.innerHTML = answer;
  }else{lowScreen.innerHTML = problem + " = " + answer;};
  
  topScreen.innerHTML = answer;
  
  current= answer;
    
};
function backspace(){
  current = current.slice(0,current.length -1);
  if (current.length <= 0){
    current = "0";
  }
  topScreen.innerHTML = current;
};
function clearAll (){
  current = "0";
  problem = [];
  topScreen.innerHTML= "0";
  lowScreen.innerHTML= " ";
};
function tooBig(){
  alert("Sorry this calculator screen can't handle that many numbers");
  clearAll();
  
}

/*//keyboard shortcuts
evaluate() function has an error when mixing button click events with keyboard events. 

  $(document).bind('keyup', function(e){
    if(e.which ===8 ||e.which === 46){
      backspace();
    };
    if(e.which === 13){
        calculate();
    }})*/