# LIVRABLE 1 : README.md

### 📌 Objectifs du Projet

Ce projet déploie une solution de Machine Learning (HR Attrition Predictor) visant à anticiper le risque de démission des collaborateurs. L'objectif principal est de passer d'une gestion RH réactive (subir les départs) à une gestion proactive (anticiper et retenir les talents clés) grâce à l'analyse de données comportementales et structurelles, tout en garantissant une approche éthique et frugale.

### 🎯 Périmètre (Scope)

* **Inclus :** Prédiction de la probabilité de départ (0 à 100%) sur la base de l'historique interne (salaires, absences, retards, âge, etc.). Explicabilité locale des prédictions (SHAP) pour guider l'action RH. Audit d'équité (AIF360) et suivi carbone (CodeCarbon).
* **Exclu :** Prédiction des départs liés à des facteurs externes (chocs macro-économiques, événements familiaux soudains). Le modèle ne prend aucune décision automatisée (pas de licenciement ou de promotion algorithmique) : il agit comme un radar d'aide à la décision.

### 👤 Persona Utilisateur

* **Nom :** Camille, HR Business Partner (Pôle Tech & IT).
* **Profil :** Experte métier, non experte en Data.
* **Objectifs :** Fidéliser les talents clés, optimiser le budget de rétention.
* **Besoin :** Un outil visuel, simple et explicable (White-box AI) pour justifier ses interventions auprès des managers.

### ⚙️ Instructions d'Installation et d'Exécution

1. **Cloner le dépôt et installer les dépendances :**
```bash
pip install pandas numpy scikit-learn shap codecarbon aif360 fairlearn kagglehub

```


2. **Exécution du pipeline :** Lancer séquentiellement les cellules du notebook `HR_Attrition_Predictor_Final.ipynb`.
3. **Ordre d'exécution :**
* Ingestion via KaggleHub.
* Nettoyage (Anonymisation & Anti-Fuite de données).
* Entraînement du Random Forest (avec suivi carbone).
* Génération des prédictions (probabilités).
* Génération des visualisations SHAP.
* Audit de biais via AIF360.


### 🧠 Pull Request — MVP Web Application (Dashboard RH Explainable AI)

Cette pull request introduit la première version MVP de notre solution, implémentée sous forme de web application full-stack.

### 🚀 Vue d’ensemble

Ce MVP vise à fournir un dashboard RH interactif et explicable permettant d’analyser le risque de démission des employés.

La solution repose sur :

un backend FastAPI pour le traitement des données et l’estimation du risque

un frontend React pour la visualisation et l’interaction utilisateur

### 🛠️ Fonctionnalités principales
🔹 Backend (FastAPI)

API REST pour la gestion des employés :

GET /employees

POST /employees

DELETE /employees/{id}

Système de scoring heuristique (proxy du futur modèle ML)

Intégration d’une base de données SQLite (stockage persistant)

Endpoints d’analyse :

/insights/overview

/insights/fairness

/insights/frugality

🔹 Frontend (React)

Dashboard RH interactif

Tableau des employés avec :

### recherche 🔍

filtres (département, niveau de risque)

tri (risque, ancienneté, ordre alphabétique)

Formulaire d’ajout d’employé avec estimation automatique du risque

Suppression d’employé

Interface propre, responsive et orientée produit

### 🧪 Logique du MVP

À ce stade, le moteur de prédiction repose sur un système de règles heuristiques simulant le comportement d’un modèle.

👉 Il sera remplacé dans les prochaines étapes par un modèle de machine learning entraîné via le notebook.

### 🎯 Objectif

Ce MVP démontre :

une pipeline complète (data → prédiction → interface)

une approche orientée explicabilité

une intégration des enjeux éthiques et frugaux de l’IA

### 📌 Prochaines étapes

Intégration du modèle ML réel

Ajout d’un module d’explicabilité (type SHAP)

Amélioration des métriques de fairness

Ajout de visualisations (graphiques)
