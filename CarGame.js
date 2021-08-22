const rootBody   = document.querySelector('.rootbody'),
      btnStart   = document.getElementById('start'),
      btnRestart   = document.getElementById('restart');
      
btnStart.addEventListener('click', () => {
  rootBody.innerHTML = '';
  runGame();
});

btnRestart.addEventListener('click', () => {
  rootBody.innerHTML = '';
});

function runGame() {
  const consumptionPerLit   = 0.5,
        minStep             = 0,
        maxStep             = 6,
        initialPetrol       = 50,
        pumpsCount          = 6,
        refillAmount        = 30,
        startLocation       = 0,
        endLocation         = 100,
        petrolPumpLocations = getRandomIntegers( 
                                 pumpsCount, 
                                 startLocation, 
                                 endLocation 
                              ).sort(function(a, b){return a - b});
  
  let position = startLocation,
      petrol = initialPetrol,
      count=0;
      
  logStr(`Game Started \nPetrol pumps generated at ${
         petrolPumpLocations}\n`);
           
  // While we've not reached our destination and still have petrol
  while(position < endLocation && petrol > 0) {
    // Calculations
    count++;
    const autonomy      = petrol * consumptionPerLit,
          remainingDistance = endLocation - position,
          maxDistance       = Math.min(autonomy, remainingDistance, maxStep),
          stepDistance      = getRandomInteger(minStep, maxDistance),
          stepConsumption   = stepDistance / consumptionPerLit;
    
     position += stepDistance;
     petrol -= stepConsumption;

    if (isAtPump()) {
      petrol += refillAmount;
    }
    logState();
  }
  
  if (position === endLocation) {
    logStr("You've reached your destination!");
  } else {
    logStr(`\nMove ${count} - Car at ${position}km, Petrol remaining ${petrol}L \n!!** GAME OVER **!!`);
  }
  
  function isAtPump() {
    return petrolPumpLocations.includes(position);
  }
  
  function logState() {
    let str = `\nMove ${count} - Car at ${position}km, Petrol remaining ${petrol}L`;
    if (isAtPump()) {
      str += ` Refilled !`;
    }
    logStr(str);
  }
}

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomIntegers(n, min, max) {
  const res = [];
  
  while (res.length !== n) {
    const value = getRandomInteger(min, max);
    if (!res.includes(value)) {
      res.push(value);
    }
  }
  
  return res;
}

function logStr(str) {
  rootBody.innerHTML += '\n' + str;
}
