import {MiniMaple} from './miniMaple.js'


window.onload = function() {
    document.querySelector('input#expression').value = "x^2+7x";
    document.querySelector('input#variable').value = "x";
}

const maple = new MiniMaple();

calculate.onclick = function() {

    let answer = document.querySelector("div#answer");
    answer.removeChild(answer.firstChild);

    let variable = document.getElementById('variable').value;
    let equation = document.getElementById('expression').value;

    let res = '';
    if(!variable.match(/[a-z]/)){
        res = 'Error';
    }
    else{
        res = maple.derivative(equation, variable);
        maple.graph();

    }
/*
    let node = document.createTextNode("Производная:" + res);
    answer.appendChild(node);

    node = document.createElement('br')
    answer.appendChild(node);

    node = document.createTextNode("Интеграл:" + res);
    answer.appendChild(node);

    //node = document.createElement('br')
    //answer.appendChild(node);

    //node = document.createElement("Граф:" + res2);
    //node = document.createTextNode("Граф:" + res);
    //root.appendChild(node);
*/
};
