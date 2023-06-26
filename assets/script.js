// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {   
  currentDayEl = $("#currentDay");
  

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 
    function updateBlockClass() {
      var currentHour = dayjs().format("H");
      var currentHourInt = parseInt(currentHour);
      console.log(currentHour);

      $(".time-block").each(function () {
        var timeBlock = parseInt($(this).attr("id").split("-")[1]);
        if (timeBlock < currentHourInt) {
          $(this).addClass("past").removeClass("present future");
        } else if (timeBlock === currentHourInt) {
          $(this).addClass("present").removeClass("past future");
        } else {
          $(this).addClass("future").removeClass("past present");
        }
      });
    }
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var currentDay = dayjs().format("dddd, MMM DD[th] mm:ss");
    currentDayEl.text(currentDay);
  }

  function init() {
    displayDate();
    updateBlockClass();
  }

  init ();

  setInterval(displayDate, 1000);
  setInterval(updateBlockClass, 60000);
});


