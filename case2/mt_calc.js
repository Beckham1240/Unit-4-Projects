"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Beckham Le
   Date:   
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
window.onload = init();

function init(){
   var calcButtons = document.getElementsByClassName("calcButton");
   for(var i = 0; i < calcButtons.length; i++){
      // adds an event listener to all the buttons on the calculator
      calcButtons[i].addEventListener("click", buttonClick);
   }
// puts the number into the calcWindow that was pressed on the calculator
   document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

function buttonClick(e){
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;
   var buttonValue = e.target.value;

   switch(buttonValue){
   case "del":
      // clears window when del is pressed
      calcValue = "";
      break;
   case "bksp":
      // clears last number if bksp is pressed
      calcValue = eraseChar(calcValue);
      break;
   case "enter":
      // solves the equation if enter is pressed
      calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
      break;
   case "prev":
      // copies the last equation if prev is pressed
      calcValue += lastEq(calcValue);
      break;
   default:
      // puts the value pressed into the window
      calcValue = calcValue + buttonValue
   }

   document.getElementById("calcWindow").value = calcValue;
   document.getElementById("calcWindow").focus();
}

function calcKeys(e){
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;

   switch(e.key){
      // does samething as above but if it is pressed on keyboard
      case "Delete":
         calcValue = "";
         break;
      case "Enter":
         calcValue += " = " + evalEq(calcValue, calcDecimal);
         break;
      case "ArrowUp":
         calcValue += lastEq(calcWindow.value);
         break;
   }

   document.getElementById("calcWindow").value = calcValue;
}

/* ===================================================================== */

function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}