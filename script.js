// Assignment 5 Testcases
// Make sure webpage fetches planets.json when page loads and updates missionTarget div HTML
// Check each field for emptiness, 1 by 1 -> error alert
// Check pilot names for numeric values -> error alert
// Check fuel level + cargo mass for non-numeric values -> error alert
// Check inputs of spaces as well as empty strings
// Submit “valid” data types but check values of fuel level + cargo mass
// Check fuel level too low
// Check cargo mass too high
// Check both fuel level and cargo mass too low + too high
// Check valid values for fuel level & cargo mass after refresh
// Check valid values for fuel level & cargo mass after submitting invalid values

// Write your JavaScript code here!

// Adding alerts

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   // console.log(form);
   form.addEventListener("submit", function(event) {
      // console.log("submitting form");
      let pilotName = document.querySelector("input[name=pilotName]");
      // console.log(pilotName);
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let issues = "";
      let check = function (invalidCondition, li, prefix, value, requirement) {
        let listItem = document.getElementById(li);
        let msg = prefix + " " + value;
        if (invalidCondition) {
          listItem.innerHTML = msg + " " + requirement;
          return "\n - " + msg + " " + requirement;
        } 
        else {
          listItem.innerHTML = msg + " is ready for launch.";
          return "";
        }
      }      

      issues = check(  pilotName.value === "",   "pilotStatus", "Pilot", pilotName.value, "name is required.")
             + check( //(pilotName.value !== ""&&   
                  !isNaN(pilotName.value),    "pilotStatus", "Pilot", pilotName.value, "name must be a string.")
             + check(copilotName.value === "", "copilotStatus", "Copilot", copilotName.value, "name is required.")
             + check(!isNaN(copilotName.value),"copilotStatus", "Copilot", copilotName.value, "name must be a string.")
             + check(fuelLevel.value === "",      "fuelStatus", "Fuel level", fuelLevel.value, "is required.")
             + check(isNaN(fuelLevel.value),      "fuelStatus", "Fuel level", fuelLevel.value, "must be a number.")
             + check(fuelLevel.value < 10000,           "fuelStatus", "Fuel level", fuelLevel.value, "too low for launch.")
             + check(cargoMass.value === "",     "cargoStatus", "Cargo mass", cargoMass.value, "is required.")
             + check(isNaN(cargoMass.value),     "cargoStatus", "Cargo mass", cargoMass.value, "must be a number.")
             + check( //cargoMass.value !== ""&&
                   cargoMass.value > 10000,          "cargoStatus", "Cargo mass", cargoMass.value, "too high for the shuttle to take off");
             
      if (issues !== "") {
        alert("Houston, we have a problem:" + issues);
        let launchStatus = document.getElementById("launchStatus");
        launchStatus.style.color = "red"; 
        launchStatus.innerHTML = "Shuttle not ready for launch";
      }  
      else {
        populateTopArea();
        let launchStatus = document.getElementById("launchStatus");
        launchStatus.style.color = "green"; 
        launchStatus.innerHTML = 'Shuttle is ready for launch';
        // updateShuttleRequirements();
      }
      document.getElementById("faultyItems").style.visibility = "visible"
      event.preventDefault();
    });

  // This block of code shows how to format the HTML once you fetch some planetary JSON!
  function populateTopArea() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
        const missionTarget = document.getElementById("missionTarget");
        let index = 0;
        missionTarget.addEventListener("click", function() {
          missionTarget.innerHTML = `
              <div>
                <h2 style="text-align: center">Mission Destination</h2>
                <ol style="text-align: center">
                  <li>Name: ${json[index].name}</li>
                  <li>Diameter: ${json[index].diameter}</li>
                  <li>Star: ${json[index].star}</li>
                  <li>Distance from Earth: ${json[index].distance}</li>
                  <li>Number of Moons: ${json[index].moons}</li>
                </ol>
                <img src=${json[index].image} height=250 class="center"></img>
              </div>
           `;
          index = (index + 1) % json.length;
        });
        missionTarget.click();
      });
    });
  }
});

// function updateShuttleRequirements() {
   
//     let pilotStatus = document.getElementById("pilotStatus");
//     pilotStatus.innerHTML = `Pilot`+ pilotName + `is ready for launch`;
      
//     let copilotStatus = document.getElementById("copilotStatus");
//     copilotStatus.innerHTML = `Copilot`+ copilotName + `is ready for launch`;

//     if (fuelLevel < 10000) {
//       let launchStatus = document.getElementById("launchStatus");
//       launchStatus.style.color = "red"; 
//       launchStatus.innerHTML = "Shuttle not ready for launch"; 

//       let fuelStatus = document.getElementById("fuelStatus");
//       fuelStatus.innerHTML = `Fuel level too low for launch`;
//     }

//     if (cargoMass > 10000) {
//       let launchStatus = document.getElementById("launchStatus");
//       launchStatus.style.color = "red"; 
//       launchStatus.innerHTML = "Shuttle not ready for launch"; 

//       let cargoStatus = document.getElementById("cargoStatus");
//       cargoStatus.innerHTML = `Too much mass for the shuttle to take off`;
//     }
      
//     if (numFuelLevel.value >= 10000 && numCargoMass <= 10000 ) {
//       let launchStatus = document.getElementById("launchStatus");
//       launchStatus.innerHTML = 'Shuttle is ready for launch';
//       let fuelStatus = document.getElementById("fuelStatus");
//       fuelStatus.innerHTML = `Fuel level enough for launch`;
//       let cargoStatus = document.getElementById("cargoStatus");
//       cargoStatus.innerHTML = `Cargo mass low enough for launch`;
//     }
//     // event.preventDefault();
//   // });
// }




