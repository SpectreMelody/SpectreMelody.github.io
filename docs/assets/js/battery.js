let batteryLevel = document.getElementById("battery-level");

let success = function(battery) {
    if (battery) {
        setStatus();
        function setStatus() {
            batteryLevel.innerHTML = Math.round(battery.level * 100) + "%";

            battery.addEventListener("levelchange", setStatus, false);
        }
    }
};

navigator.getBattery()
    .then(success);