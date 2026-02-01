// StatMaxer - Main Application Logic

const API_URL = 'http://localhost:8080/api';

// State
let habits = [];

// DOM Elements
const habitsContainer = document.getElementById('habitsContainer');
const playerLevel = document.getElementById('playerLevel');
const levelBar = document.getElementById('levelBar');
const levelText = document.getElementById('levelText');
const habitModal = document.getElementById('habitModal');
const habitForm = document.getElementById('habitForm');
const addHabitBtn = document.getElementById('addHabitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    setupEventListeners();
});

function setupEventListeners() {
    addHabitBtn.addEventListener('click', () => openModal());
    cancelBtn.addEventListener('click', () => closeModal());
    habitModal.addEventListener('click', (e) => {
        if (e.target === habitModal) closeModal();
    });
    habitForm.addEventListener('submit', handleCreateHabit);

    // Sidebar navigation
    document.querySelectorAll('.sidebar-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-icon').forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
        });
    });
}

// API Functions
async function loadHabits() {
    try {
        const response = await fetch(`${API_URL}/habits`);
        habits = await response.json();
        renderHabits();
        updatePlayerLevel();
    } catch (error) {
        console.error('Failed to load habits:', error);
        renderEmptyState();
    }
}

async function createHabit(habitData) {
    try {
        const response = await fetch(`${API_URL}/habits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(habitData)
        });
        const newHabit = await response.json();
        habits.push(newHabit);
        renderHabits();
        updatePlayerLevel();
        return newHabit;
    } catch (error) {
        console.error('Failed to create habit:', error);
    }
}

async function toggleDayLog(habitId, date) {
    try {
        const response = await fetch(`${API_URL}/habits/${habitId}/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date })
        });
        const result = await response.json();

        // Update local state
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            habit.daily_logs[date] = result.value;
            habit.completed_count = result.completed_count;
            habit.xp_value = result.xp_value;
        }

        updateHabitRow(habitId);
        updatePlayerLevel();
        return result;
    } catch (error) {
        console.error('Failed to toggle log:', error);
    }
}

async function deleteHabit(habitId) {
    try {
        await fetch(`${API_URL}/habits/${habitId}`, { method: 'DELETE' });
        habits = habits.filter(h => h.id !== habitId);
        renderHabits();
        updatePlayerLevel();
    } catch (error) {
        console.error('Failed to delete habit:', error);
    }
}

// Render Functions
function renderHabits() {
    if (habits.length === 0) {
        renderEmptyState();
        return;
    }

    habitsContainer.innerHTML = habits.map(habit => createHabitRow(habit)).join('');

    // Attach event listeners to checkboxes
    document.querySelectorAll('.day-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', handleCheckboxClick);
    });

    // Attach delete listeners
    document.querySelectorAll('.habit-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const habitId = e.target.dataset.id;
            if (confirm('Delete this habit?')) {
                deleteHabit(habitId);
            }
        });
    });
}

function renderEmptyState() {
    habitsContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🎮</div>
            <p>No habits yet. Create your first habit to start leveling up!</p>
        </div>
    `;
}

function createHabitRow(habit) {
    const daysHtml = generateDaysHtml(habit);
    const percentage = Math.round(habit.xp_value || 0);

    return `
        <div class="habit-row" data-habit-id="${habit.id}">
            <div class="habit-info">
                <span class="habit-icon">${habit.icon || '🎯'}</span>
                <div class="habit-details">
                    <span class="habit-name">${habit.habit_name}</span>
                    <span class="habit-goal">Goal: ${habit.goal_value} days</span>
                </div>
            </div>
            <div class="days-carousel">
                ${daysHtml}
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar-wrapper">
                    <div class="stat-bar" style="width: ${percentage}%"></div>
                </div>
                <span class="stat-percentage">${percentage}%</span>
            </div>
        </div>
    `;
}

function generateDaysHtml(habit) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = '';
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isChecked = habit.daily_logs && habit.daily_logs[dateStr];
        const isToday = day === today.getDate();

        html += `
            <div class="day-checkbox ${isChecked ? 'checked' : ''} ${isToday ? 'today' : ''}" 
                 data-habit-id="${habit.id}" 
                 data-date="${dateStr}">
                ${day}
            </div>
        `;
    }
    return html;
}

function updateHabitRow(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const row = document.querySelector(`[data-habit-id="${habitId}"]`);
    if (!row) return;

    const percentage = Math.round(habit.xp_value || 0);
    const statBar = row.querySelector('.stat-bar');
    const statPercentage = row.querySelector('.stat-percentage');

    if (statBar) statBar.style.width = `${percentage}%`;
    if (statPercentage) statPercentage.textContent = `${percentage}%`;
}

async function updatePlayerLevel() {
    try {
        const response = await fetch(`${API_URL}/player/level`);
        const data = await response.json();

        playerLevel.textContent = `LVL ${data.level}`;
        levelBar.style.width = `${Math.min(data.avg_xp || 0, 100)}%`;
        levelText.textContent = `${Math.round(data.total_xp || 0)} XP`;
    } catch (error) {
        console.error('Failed to update player level:', error);
    }
}

// Event Handlers
function handleCheckboxClick(e) {
    const checkbox = e.target;
    const habitId = checkbox.dataset.habitId;
    const date = checkbox.dataset.date;

    // Optimistic UI update
    checkbox.classList.toggle('checked');

    // Send to server
    toggleDayLog(habitId, date);
}

async function handleCreateHabit(e) {
    e.preventDefault();

    const habitData = {
        habit_name: document.getElementById('habitName').value,
        icon: document.getElementById('habitIcon').value || '🎯',
        goal_value: parseInt(document.getElementById('habitGoal').value) || 30
    };

    await createHabit(habitData);
    closeModal();
    habitForm.reset();
}

// Modal Functions
function openModal() {
    habitModal.classList.add('active');
}

function closeModal() {
    habitModal.classList.remove('active');
}
