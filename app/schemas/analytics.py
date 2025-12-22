from pydantic import BaseModel

class AnalyticsBase(BaseModel):
    metric_name: str
    value: int

class AnalyticsCreate(AnalyticsBase):
    pass

class Analytics(AnalyticsBase):
    id: int
    created_at: str

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_tickets: int
    ai_resolved_tickets: int
    average_response_time_hours: float
    escalation_percentage: float
