let batteryGroup = document.getElementById("batteryGroup");
let batteryLevel = document.getElementById("batteryLevel");

let success = function(battery) {
    if (battery) {
        setStatus();
        function setStatus() {
            batteryLevel.innerHTML = Math.round(battery.level * 100) + "%";
            if(battery.level * 100 > 20)
            {
                batteryGroup.classList.remove("text-red-500");
                batteryGroup.classList.add("text-white");
            }else{
                batteryGroup.classList.add("text-red-500");
                batteryGroup.classList.remove("text-white");
            }
            battery.addEventListener("levelchange", setStatus, false);
        }
    }
};

navigator.getBattery()
    .then(success);