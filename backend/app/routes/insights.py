from fastapi import APIRouter
from app.services.mock_data import fairness_summary, frugality_summary, employees

router = APIRouter(prefix="/insights", tags=["insights"])


@router.get("/fairness")
def get_fairness():
    return fairness_summary


@router.get("/frugality")
def get_frugality():
    return frugality_summary


@router.get("/overview")
def get_overview():
    total_employees = len(employees)
    turnover_rate = sum(emp["term"] for emp in employees) / total_employees
    avg_risk = sum(emp["risk_score"] for emp in employees) / total_employees
    avg_salary = sum(emp["salary"] for emp in employees) / total_employees

    return {
        "total_employees": total_employees,
        "turnover_rate": round(turnover_rate, 3),
        "average_risk_score": round(avg_risk, 3),
        "average_salary": round(avg_salary, 2)
    }
