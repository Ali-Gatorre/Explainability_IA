employees = [
    {
        "employee_id": 101,
        "name": "Alice Martin",
        "department": "IT",
        "position": "Data Analyst",
        "age": 29,
        "salary": 42000,
        "satisfaction_score": 2.1,
        "engagement_score": 2.4,
        "absences": 8,
        "years_at_company": 1.4,
        "performance_score": "Medium",
        "sex": "F",
        "race": "Group A",
        "term": 1,
        "risk_score": 0.78,
        "risk_label": "High",
        "top_factors": [
            "Low satisfaction",
            "Low engagement",
            "Short tenure",
            "Salary below median"
        ]
    },
    {
        "employee_id": 102,
        "name": "Bilal Hassan",
        "department": "Finance",
        "position": "Financial Analyst",
        "age": 37,
        "salary": 56000,
        "satisfaction_score": 3.7,
        "engagement_score": 3.9,
        "absences": 2,
        "years_at_company": 5.8,
        "performance_score": "High",
        "sex": "M",
        "race": "Group B",
        "term": 0,
        "risk_score": 0.29,
        "risk_label": "Low",
        "top_factors": [
            "Stable profile"
        ]
    },
    {
        "employee_id": 103,
        "name": "Chloe Bernard",
        "department": "Sales",
        "position": "Sales Specialist",
        "age": 31,
        "salary": 39000,
        "satisfaction_score": 2.8,
        "engagement_score": 2.9,
        "absences": 6,
        "years_at_company": 2.0,
        "performance_score": "Medium",
        "sex": "F",
        "race": "Group A",
        "term": 1,
        "risk_score": 0.61,
        "risk_label": "Medium",
        "top_factors": [
            "Moderate satisfaction",
            "Moderate engagement",
            "Frequent absences"
        ]
    }
]

fairness_summary = {
    "sex_gap": [
        {"group": "F", "avg_risk": 0.60, "count": 2},
        {"group": "M", "avg_risk": 0.29, "count": 1}
    ],
    "race_gap": [
        {"group": "Group A", "avg_risk": 0.695, "count": 2},
        {"group": "Group B", "avg_risk": 0.29, "count": 1}
    ],
    "summary": {
        "demographic_parity_comment": "Mock fairness results for prototype only.",
        "warning": "Replace with real fairness metrics from notebook."
    }
}

frugality_summary = [
    {
        "model": "Logistic Regression",
        "f1_score": 0.79,
        "accuracy": 0.81,
        "training_time_seconds": 1.2,
        "estimated_energy_cost": 1,
        "explainability_score": 5,
        "recommended": True
    },
    {
        "model": "Decision Tree",
        "f1_score": 0.76,
        "accuracy": 0.78,
        "training_time_seconds": 1.8,
        "estimated_energy_cost": 2,
        "explainability_score": 4,
        "recommended": False
    },
    {
        "model": "Random Forest",
        "f1_score": 0.82,
        "accuracy": 0.84,
        "training_time_seconds": 4.5,
        "estimated_energy_cost": 4,
        "explainability_score": 3,
        "recommended": False
    }
]
