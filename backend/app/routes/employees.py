from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.mock_data import employees

router = APIRouter(prefix="/employees", tags=["employees"])


class EmployeeCreate(BaseModel):
    name: str
    department: str
    position: str
    age: int
    salary: float
    satisfaction_score: float
    engagement_score: float
    absences: int
    years_at_company: float
    performance_score: str
    sex: str
    race: str


@router.get("")
def get_employees():
    return employees


@router.get("/{employee_id}")
def get_employee(employee_id: int):
    employee = next((emp for emp in employees if emp["employee_id"] == employee_id), None)

    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee


@router.get("/{employee_id}/predict")
def predict_employee(employee_id: int):
    employee = next((emp for emp in employees if emp["employee_id"] == employee_id), None)

    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {
        "employee_id": employee["employee_id"],
        "name": employee["name"],
        "department": employee["department"],
        "risk_score": employee["risk_score"],
        "risk_label": employee["risk_label"],
        "top_factors": employee["top_factors"],
        "recommendation": build_recommendation(employee["risk_score"])
    }


@router.post("")
def create_employee(payload: EmployeeCreate):
    new_id = max(emp["employee_id"] for emp in employees) + 1 if employees else 101

    risk_score, risk_label, top_factors = compute_risk_profile(payload.model_dump())

    new_employee = {
        "employee_id": new_id,
        "name": payload.name,
        "department": payload.department,
        "position": payload.position,
        "age": payload.age,
        "salary": payload.salary,
        "satisfaction_score": payload.satisfaction_score,
        "engagement_score": payload.engagement_score,
        "absences": payload.absences,
        "years_at_company": payload.years_at_company,
        "performance_score": payload.performance_score,
        "sex": payload.sex,
        "race": payload.race,
        "term": 0,
        "risk_score": risk_score,
        "risk_label": risk_label,
        "top_factors": top_factors
    }

    employees.append(new_employee)
    return new_employee

@router.delete("/{employee_id}")
def delete_employee(employee_id: int):
    employee = next((emp for emp in employees if emp["employee_id"] == employee_id), None)

    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")

    employees.remove(employee)

    return {
        "message": "Employee deleted successfully",
        "employee_id": employee_id
    }


def compute_risk_profile(employee: dict):
    score = 0.0
    factors = []

    # Satisfaction
    if employee["satisfaction_score"] < 2.5:
        score += 0.25
        factors.append("Low satisfaction")
    elif employee["satisfaction_score"] < 3.2:
        score += 0.12
        factors.append("Moderate satisfaction")

    # Engagement
    if employee["engagement_score"] < 2.5:
        score += 0.20
        factors.append("Low engagement")
    elif employee["engagement_score"] < 3.2:
        score += 0.10
        factors.append("Moderate engagement")

    # Absences
    if employee["absences"] >= 10:
        score += 0.18
        factors.append("High absenteeism")
    elif employee["absences"] >= 5:
        score += 0.10
        factors.append("Frequent absences")

    # Tenure
    if employee["years_at_company"] < 2:
        score += 0.15
        factors.append("Short tenure")
    elif employee["years_at_company"] < 4:
        score += 0.08
        factors.append("Limited tenure")

    # Salary
    if employee["salary"] < 40000:
        score += 0.15
        factors.append("Salary below benchmark")
    elif employee["salary"] < 50000:
        score += 0.07
        factors.append("Salary slightly below benchmark")

    # Performance
    if employee["performance_score"] == "Low":
        score += 0.07
        factors.append("Low performance score")

    # Clamp
    score = min(max(score, 0.05), 0.95)

    if score >= 0.66:
        label = "High"
    elif score >= 0.33:
        label = "Medium"
    else:
        label = "Low"

    if not factors:
        factors = ["Stable profile"]

    return round(score, 2), label, factors[:4]


def build_recommendation(risk_score: float) -> str:
    if risk_score >= 0.66:
        return (
            "High risk profile. Recommend managerial review, satisfaction check, "
            "and career progression discussion."
        )
    if risk_score >= 0.33:
        return (
            "Medium risk profile. Monitor engagement, workload, and early warning signals."
        )
    return "Low risk profile. No critical signal detected at this stage."
