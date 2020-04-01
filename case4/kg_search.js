"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: 
   Date:   
   
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

var allCells;
var found = false;

//runs the init function when the page loads
window.onload = init;

function init() {
   //inserts the wordSearchTitle variable into the h1 of the aside
   document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
   //inserts the word search into the figure with the id wordTable
   document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
   //inserts the list of words into the part with the id wordList
   document.getElementById("wordList").innerHTML = showList(wordArray);
   

   allCells = document.querySelectorAll("table#wordSearchTable td");
   
   //changes the cursor style to a pointer and listens for when the mouse is pressed down on to run the function startRecording
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.cursor = "pointer";
      allCells[i].addEventListener("mousedown", startRecording);
   }
   
   //when the mouse is released it runs the stopRecording function and checks if the puzzle has been solved or not and alerts you if you have
   document.getElementById("wordSearchTable").onmouseup = function() {
      stopRecording();
      var wordList = document.querySelectorAll("ul#wordSearchList li");
      var solved = true;
      for (var i = 0; i < wordList.length; i++) {
         if (wordList[i].style.textDecoration !== "line-through") {
            solved = false;
            break;
         }
      }
      if (solved) {
         alert("You solved the puzzle!");
      }
   };
   
   //shows the answer to the puzzle when the showSolution button has been clicked on
   document.getElementById("showSolution").onclick = function() {
      for (var i = 0; i < allCells.length; i++) {
         if (allCells[i].className === "wordCell") {
            allCells[i].style.backgroundColor = "rgb(191, 191, 255)";
         }
      }
   };

}

//changes the background color of the cell pressed down on/targeted and listens for if the mouse is going to move to run the continueRecording function
function startRecording(e) {
   document.getElementById("pickedLetters").value += e.target.textContent;
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].addEventListener("mouseenter", continueRecording);
   }
   e.preventDefault();
}

//changes the background color of the cells pressed down/targeted by the mouse
function continueRecording(e) {
   if (e.target.style.backgroundColor !== "rgb(28, 255, 132)") {
      e.target.style.backgroundColor = "rgb(255, 197, 153)";
   }
   document.getElementById("pickedLetters").value += e.target.textContent;
}

//stops the eventListener that changes the background of the cells and checks if the user has gotten a word right
function stopRecording() {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].removeEventListener("mouseenter", continueRecording);
   }
   checkLetters();
}
  
//checks if the letters chosen make a word from the wordbank and change their text and background color
function checkLetters() {
   var currentLetters = document.getElementById("pickedLetters").value;
   var wordList = document.querySelectorAll("ul#wordSearchList li");
   for (var i = 0; i < wordList.length; i++) {
      if (currentLetters === wordList[i].textContent) {
         wordList[i].style.textDecoration = "line-through";
         wordList[i].style.color = "rgb(191, 191, 191)";
         found = true;
      }
   }
   
   for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].style.backgroundColor !== "rgb(28, 255, 132)") {
         if (allCells[i].style.backgroundColor === "rgb(255, 197, 153)" && found) {
            allCells[i].style.backgroundColor = "rgb(28, 255, 132)";
         } else {
            allCells[i].style.backgroundColor = "";
         }
      }
   }
   document.getElementById("pickedLetters").value = "";
   found = false;
}



/*============================================================*/

function drawWordSearch(letters, words) {
   var rowSize = letters.length;
   var colSize = letters[0].length;

   var htmlCode = "<table id='wordSearchTable'>";
   htmlCode += "<caption>Word Search</caption>";

   for (var i = 0; i < rowSize; i++) {
      htmlCode += "<tr>";

      for (var j = 0; j < colSize; j++) {
         if (words[i][j] == " ") {
            htmlCode += "<td>";
         } else {
            htmlCode += "<td class='wordCell'>";
         }
         htmlCode += letters[i][j];
         htmlCode += "</td>";
      }

      htmlCode += "</tr>";
   }
   htmlCode += "</table>";

   return htmlCode;
}

function showList(list) {
   var htmlCode = "<ul id='wordSearchList'>";

   for (var i = 0; i < list.length; i++) {
      htmlCode += "<li>" + list[i] + "</li>";
   }

   htmlCode += "</ul>";

   return htmlCode;
}
