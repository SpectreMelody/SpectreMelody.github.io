const dateElement = document.getElementById('date');

function getCurrentDateTime() {
    const now = new Date();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${month} ${day}, ${hours}:${minutes}`;
}

function updateDateTime() {
    const formattedDateTime = getCurrentDateTime();
    dateElement.textContent = formattedDateTime;
}

updateDateTime();

setInterval(updateDateTime, 1000);