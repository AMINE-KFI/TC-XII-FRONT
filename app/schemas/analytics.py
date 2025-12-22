from pydantic import BaseModel
from datetime import datetime

class AnalyticsBase(BaseModel):
    metric_name: str
    value: int

class AnalyticsCreate(AnalyticsBase):
    pass

class Analytics(AnalyticsBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
