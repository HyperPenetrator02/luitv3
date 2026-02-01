from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.habits import router as habits_router, habits_db

app = FastAPI(
    title="StatMaxer API",
    description="Life Gamification Dashboard Backend",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(habits_router)


@app.get("/")
async def root():
    return {"message": "StatMaxer API", "status": "online"}


@app.get("/api/player/level")
async def get_player_level():
    """Get aggregated player level from all habits"""
    if not habits_db:
        return {"level": 0, "total_xp": 0, "habit_count": 0}
    
    total_xp = sum(h.xp_value for h in habits_db.values())
    avg_xp = total_xp / len(habits_db)
    
    # Level calculation: every 100 XP = 1 level
    level = int(avg_xp / 10)  # More granular leveling
    
    return {
        "level": level,
        "total_xp": round(total_xp, 2),
        "avg_xp": round(avg_xp, 2),
        "habit_count": len(habits_db),
        "progress_to_next": round(avg_xp % 10, 2)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
