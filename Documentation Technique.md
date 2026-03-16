# LIVRABLE 2 : Documentation Technique

### 1. Ingestion et Nettoyage des Données (Data Preparation)

* **Source :** API KaggleHub (`rhuebner/human-resources-data-set`).
* **Anonymisation :** Suppression stricte des variables identifiantes (`Employee_Name`, `EmpID`).
* **Prévention du Data Leakage :** Suppression des variables renseignées *après* ou *pendant* le départ (`TermReason`, `DateofTermination`, `EmploymentStatus`).
* **Gestion des valeurs manquantes :** Suppression des lignes sans cible (`Termd`) ou sans salaire (`Salary`). Imputation par la médiane pour l'Âge.

### 2. Ingénierie des Caractéristiques (Feature Engineering)

* `Age` : Calculé à partir de la date de naissance (`DOB`) pour éviter la malédiction de la dimensionnalité liée à un encodage One-Hot de dates.
* `SalaryDiff` : Variable métier clé. Écart entre le salaire de l'employé et la moyenne des salaires pour sa position (`AvgSalaryForPosition`).
* **Encodage :** Variables catégorielles transformées via One-Hot Encoding (`drop_first=True` pour éviter la colinéarité).

### 3. Modélisation (Modeling)

* **Split Train/Test :** 80/20 avec paramètre `stratify=y` pour respecter le déséquilibre naturel des classes (peu de départs par rapport aux employés qui restent).
* **Algorithme :** `RandomForestClassifier`.
* **Hyperparamètres clés :** `n_estimators=100`, `max_depth=5` (pour éviter le surapprentissage), `class_weight='balanced'` (pénalise plus lourdement les erreurs sur la classe minoritaire "Départ").

### 4. Explicabilité, Éthique et Frugalité

* **Explicabilité :** Utilisation de `shap.TreeExplainer` pour générer un Summary Plot. Permet de décomposer le score de risque en facteurs compréhensibles pour les RH (ex: "Score de 82% poussé par un SalaryDiff négatif").
* **Éthique (AIF360) :** Exclusion des variables protégées (Sexe, Ethnie) de l'entraînement (`drop`). Évaluation post-prédiction via `ClassificationMetric` (Disparate Impact, Statistical Parity) pour certifier l'absence de biais.
* **Frugalité :** Utilisation de `EmissionsTracker` (CodeCarbon) pour mesurer l'impact énergétique de l'entraînement du modèle sur CPU.