const apiKey = '3b9ab6d9a5cfc4592cf3a3e2df3ea86a';

function updateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.querySelector(".time").textContent = `${hours}:${minutes}:${seconds}`;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.querySelector(".date").textContent = `${daysOfWeek[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    updateBackground(hours);
}

function updateBackground(hours) {
    document.body.style.backgroundColor = hours < 12 ? "#FFFAE3" : hours < 18 ? "#FFECB3" : "#2C3E50";
}

setInterval(() => {
    alert("Reminder: Drink water and take care of your health!");
}, 3600000);

const quotes = [
    "Start your day with optimism!",
    "Each day is a new opportunity!",
    "Work hard and achieve your dreams!",
    "Change begins with a small step.",
];

function displayQuote() {
    document.querySelector(".quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

displayQuote();

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error("Unable to fetch weather data");
        const data = await response.json();
        document.querySelector(".weather-info").textContent = `Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (error) {
        document.querySelector(".weather-info").textContent = "Weather data unavailable";
    }
}

document.querySelector(".city-btn").addEventListener("click", () => {
    const city = document.querySelector(".city-input").value;
    if (city) {
        fetchWeatherData(city);
    }
});

document.querySelector(".change-quote-btn").addEventListener("click", displayQuote);

updateTime();
setInterval(updateTime, 1000);
fetchWeatherData("Cairo");

const targetDate = new Date("2025-01-01T00:00:00");
startCountdown(targetDate);
