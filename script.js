
   // Habit List
    document.addEventListener("DOMContentLoaded", function () {
        const habitForm = document.getElementById("habit-form");
        const habitInput = document.getElementById("habit-input");
        const habitContainer = document.getElementById("habit-container");
        const previewHabit = document.getElementById("preview-habit");
        const clearButton = document.getElementById("clear-habits");
    
        let habits = JSON.parse(localStorage.getItem("habitList")) || [];
    
        function renderHabits() {
            habitContainer.innerHTML = "";
            habits.forEach((habit, index) => {
                const li = document.createElement("li");
                li.textContent = habit;
    
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌";
                deleteBtn.style.marginLeft = "10px";
                deleteBtn.onclick = () => removeHabit(index);
    
                li.appendChild(deleteBtn);
                habitContainer.appendChild(li);
            });
    
            localStorage.setItem("habitList", JSON.stringify(habits));
        }
    
        function addHabit(event) {
            event.preventDefault();
            const newHabit = habitInput.value.trim();
            if (newHabit) {
                habits.push(newHabit);
                habitInput.value = "";
                renderHabits();
            }
        }
    
        function removeHabit(index) {
            habits.splice(index, 1);
            renderHabits();
        }
    
        function clearHabits() {
            habits = [];
            renderHabits();
        }
    
        habitForm.addEventListener("submit", addHabit);
        clearButton.addEventListener("click", clearHabits);
        habitInput.addEventListener("input", () => {
            previewHabit.textContent = habitInput.value;
        });
    
        renderHabits();
    });
    
    // Streak Tracker
    let streakData = JSON.parse(localStorage.getItem("streakData")) || { count: 0, lastDate: null, week: {} };
    const streakDisplay = document.getElementById("streak-display-1");
    const lastUpdated = document.getElementById("last-updated");
    const checkInButton = document.getElementById("check-in");
    const resetButton = document.getElementById("reset-button");
    const weeklyTracker = document.getElementById("weekly-tracker");
    
    function updateStreakUI() {
        streakDisplay.innerText = `🔥 Current Streak: ${streakData.count} Days`;
        lastUpdated.innerText = `Last checked: ${streakData.lastDate || "Never"}`;
        renderWeeklyProgress();
    }
    
    function renderWeeklyProgress() {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        weeklyTracker.innerHTML = "";
        days.forEach(day => {
            const div = document.createElement("div");
            div.textContent = day;
            div.style.backgroundColor = streakData.week[day] ? "green" : "lightgray";
            weeklyTracker.appendChild(div);
        });
    }
    
    checkInButton.addEventListener("click", () => {
        const today = new Date().toISOString().split("T")[0];
        const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    
        if (streakData.lastDate && streakData.lastDate !== today) {
            const difference = (new Date(today) - new Date(streakData.lastDate)) / (1000 * 60 * 60 * 24);
            if (difference > 1) {
                streakData.count = 0;
                streakData.week = {};
                alert("❌ You missed a day! Streak reset.");
            }
        }
    
        streakData.lastDate = today;
        streakData.count++;
        streakData.week[todayDay] = true;
        localStorage.setItem("streakData", JSON.stringify(streakData));
        updateStreakUI();
    });
    
    resetButton.addEventListener("click", () => {
        if (confirm("⚠️ Are you sure you want to reset your streak?")) {
            streakData = { count: 0, lastDate: null, week: {} };
            localStorage.setItem("streakData", JSON.stringify(streakData));
            updateStreakUI();
        }
    });
    
    updateStreakUI();
