# LIVRABLE 3 : Schéma d'Architecture (Pipeline)

Voici la représentation du flux de données, de l'ingestion jusqu'à la restitution au métier.

```text
[ Sources de Données ]
         │
         ▼
[ 1. Ingestion & Preprocessing ] 
  ├─ Chargement (Kaggle dataset)
  ├─ Anonymisation (Drop ID/Names)
  ├─ Drop Data Leaks (TermReason)
  └─ Nettoyage (NaNs handling)
         │
         ▼
[ 2. Feature Engineering & IA Éthique ]
  ├─ Création: Age, SalaryDiff
  ├─ Drop Variables Sensibles (Sexe, Ethnie)
  └─ Encodage (One-Hot) & Scaling (StandardScaler)
         │
         ▼
[ 3. Machine Learning (Frugal AI) ] <── [ Tracker CodeCarbon (CO2) ]
  ├─ Séparation: Train (80%) / Test (20%)
  └─ Entraînement: Random Forest (class_weight='balanced')
         │
         ├─────────────────────────────────────────┐
         ▼                                         ▼
[ 4. Moteur de Prédiction ]              [ 5. Audit de Biais (AIF360) ]
  ├─ risk_scores = predict_proba()         ├─ Vérification Disparate Impact
  └─ SHAP Values (Explicabilité)           └─ Certification Non-Discriminatoire
         │
         ▼
[ 6. Restitution Métier (Dashboard RH) ]
  ├─ Liste des talents à risque (Top %)
  ├─ Graphiques d'explicabilité par employé (SHAP)
  └─ Action RH (Persona Camille)