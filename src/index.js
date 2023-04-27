import {MiniMaple} from './miniMaple.js'


window.onload = function() {
    document.querySelector('input#expression').value = "x^2";
    document.querySelector('input#variable').value = "x";
}

const maple = new MiniMaple();

calculate.onclick = function() {

    let answer = document.querySelector("div#answer");
    //answer.removeChild(answer.firstChild);
    let grap;

    let variable = document.getElementById('variable').value;
    let equation = document.getElementById('expression').value;
    while (answer.firstChild) {
        answer.removeChild(answer.firstChild);
    }
    let res = '';
    let res2 = '';
    if(!variable.match(/[a-z]/)){
        res = 'Error';
    }
    else{
        res = maple.derivative(equation, variable);
        res2 = maple.integral(equation, variable);
         
        grap = maple.graph(equation, variable);

    }

    let node = document.createTextNode("Производная:" + res);
    answer.appendChild(node);

    node = document.createElement('br')
    answer.appendChild(node);

    node = document.createTextNode("Интеграл:" + res);
    answer.appendChild(node);

};
