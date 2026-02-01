from fastapi import APIRouter, HTTPException
from typing import List
from models import Habit, HabitCreate, HabitUpdate, LogToggle

router = APIRouter(prefix="/api/habits", tags=["habits"])

# In-memory storage (replace with database in production)
habits_db: dict[str, Habit] = {}


@router.get("", response_model=List[dict])
async def get_all_habits():
    """Get all habits with their XP values"""
    return [
        {
            "id": h.id,
            "habit_name": h.habit_name,
            "icon": h.icon,
            "goal_value": h.goal_value,
            "daily_logs": h.daily_logs,
            "completed_count": h.completed_count,
            "xp_value": h.xp_value,
            "created_at": h.created_at.isoformat()
        }
        for h in habits_db.values()
    ]


@router.post("", response_model=dict)
async def create_habit(habit: HabitCreate):
    """Create a new habit"""
    new_habit = Habit(**habit.model_dump())
    habits_db[new_habit.id] = new_habit
    return {
        "id": new_habit.id,
        "habit_name": new_habit.habit_name,
        "icon": new_habit.icon,
        "goal_value": new_habit.goal_value,
        "daily_logs": new_habit.daily_logs,
        "xp_value": new_habit.xp_value,
        "created_at": new_habit.created_at.isoformat()
    }


@router.put("/{habit_id}", response_model=dict)
async def update_habit(habit_id: str, habit_update: HabitUpdate):
    """Update an existing habit"""
    if habit_id not in habits_db:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    habit = habits_db[habit_id]
    update_data = habit_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(habit, key, value)
    
    return {
        "id": habit.id,
        "habit_name": habit.habit_name,
        "icon": habit.icon,
        "goal_value": habit.goal_value,
        "xp_value": habit.xp_value
    }


@router.delete("/{habit_id}")
async def delete_habit(habit_id: str):
    """Delete a habit"""
    if habit_id not in habits_db:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    del habits_db[habit_id]
    return {"message": "Habit deleted successfully"}


@router.post("/{habit_id}/log", response_model=dict)
async def toggle_daily_log(habit_id: str, log: LogToggle):
    """Toggle a daily log for a habit"""
    if habit_id not in habits_db:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    habit = habits_db[habit_id]
    
    # Toggle the log for the given date
    current_value = habit.daily_logs.get(log.date, False)
    habit.daily_logs[log.date] = not current_value
    
    return {
        "id": habit.id,
        "date": log.date,
        "value": habit.daily_logs[log.date],
        "completed_count": habit.completed_count,
        "xp_value": habit.xp_value
    }
