from pydantic import BaseModel, Field
from typing import Dict, Optional
from datetime import datetime
import uuid


class HabitBase(BaseModel):
    habit_name: str = Field(..., description="Name of the habit")
    icon: str = Field(default="🎯", description="Emoji or SVG path")
    goal_value: int = Field(default=30, description="Target days to complete")


class HabitCreate(HabitBase):
    pass


class HabitUpdate(BaseModel):
    habit_name: Optional[str] = None
    icon: Optional[str] = None
    goal_value: Optional[int] = None


class Habit(HabitBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    daily_logs: Dict[str, bool] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.now)

    @property
    def completed_count(self) -> int:
        return sum(1 for v in self.daily_logs.values() if v)

    @property
    def xp_value(self) -> float:
        if self.goal_value == 0:
            return 0.0
        return (self.completed_count / self.goal_value) * 100

    class Config:
        from_attributes = True


class LogToggle(BaseModel):
    date: str = Field(..., description="Date in YYYY-MM-DD format")
