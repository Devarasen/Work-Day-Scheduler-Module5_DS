// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {   
  var currentDayEl = $("#currentDay");
  var saveButton = $(".saveBtn");
  var timeBlockEl = $(".time-block");
  

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  saveButton.on("click", savePlan)


  function savePlan() {
    var timeBlockId = $(this).parent().attr("id");

    var descriptionId = $(this).siblings(".description").val();

    var plan = {
      timeBlockId: timeBlockId,
      description: descriptionId
    }

    var existingPlans = JSON.parse(localStorage.getItem("plans")) || [];

    var index = existingPlans.findIndex(function (plan) {
      return plan.timeBlockId === timeBlockId;
    });

    if (index !== -1) {
      existingPlans[index].description = descriptionId;
    } else {      
      existingPlans.push(plan);
    }
  
    localStorage.setItem("plans", JSON.stringify(existingPlans));

    alert("Schedule Updated");
  }


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function retrieveSavedPlans() {
    var existingPlans = JSON.parse(localStorage.getItem("plans")) || [];
  
    existingPlans.forEach(function (plan) {
      $("#" + plan.timeBlockId).find(".description").val(plan.description);
    });
  }


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 
  function updateBlockClass() {
    var currentHour = dayjs().format("H");
    var currentHourInt = parseInt(currentHour);
    console.log(currentHour);

    timeBlockEl.each(function () {
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
  

  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var currentDay = dayjs().format("dddd, MMM DD[th]");
    currentDayEl.text(currentDay);
  }


  //init functions for responsiveness
  function init() {
    displayDate();
    updateBlockClass();
    retrieveSavedPlans();
  }

  init ();

  setInterval(displayDate, 60000);
  setInterval(updateBlockClass, 60000);
  setInterval(retrieveSavedPlans, 60000);
});


