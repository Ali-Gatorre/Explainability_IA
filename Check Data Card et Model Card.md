# LIVRABLE 4 : Check Data Card & Model Card

## 📄 MODEL CARD : HR Attrition Predictor

### 1. Objectif du modèle

* **Nom du Modèle :** HR Attrition Risk Predictor (Random Forest)
* **Cas d'usage visé :** Prédire la probabilité (score de risque) qu'un employé quitte l'entreprise, afin de permettre aux équipes RH de mettre en place des actions de rétention préventives et ciblées.
* **Entrées :** Tableau de données structurelles et comportementales de l'employé (Âge, Écart salarial, Score d'engagement, Historique d'absences/retards, Projets spéciaux...).
* **Sorties :** Probabilité continue de démission (score de 0 à 1, ou 0% à 100%) accompagnée d'une explication locale (valeurs SHAP).

### 2. Données d'entraînement

* **Dataset(s) utilisés :** "Human Resources Data Set" v14 (Source : Kaggle - *rhuebner/human-resources-data-set*).
* **Taille / diversité :**
* **Nombre d'échantillons :** ~311 employés (après nettoyage).
* **Répartition des classes :** Dataset déséquilibré (le taux de démission moyen historique est minoritaire, géré via le paramètre `class_weight='balanced'` lors de l'entraînement).

* **Limites connues :** Taille du dataset modeste. Les données sont historiques et spécifiques à la culture de l'entreprise étudiée. Le modèle pourrait ne pas généraliser à d'autres secteurs d'activité ou entreprises sans un réentraînement local.

### 3. Performances

* **Métriques utilisées :** ROC-AUC (privilégiée pour évaluer la capacité du modèle à bien classer les probabilités sur un jeu déséquilibré), Recall (pour minimiser les départs ratés), et Precision.
* **Résultats :** Évalué sur un split de test (20%). Le modèle Random Forest a été retenu face à la Régression Logistique pour sa capacité à capter les relations non-linéaires tout en restant explicable.

### 4. Limites

* **Risques d'erreur connus :** * *Faux Positifs :* Prédire un départ imminent pour un employé fidèle (risque de gaspiller du budget RH en primes de rétention inutiles).
* *Faux Négatifs :* Rater un départ (perte sèche de talent).

* **Situations non couvertes :** Le modèle ne peut pas prédire les démissions liées à des chocs externes imprévisibles (crise macroéconomique, rachat de l'entreprise, événement personnel soudain de l'employé).
* **Risques de biais :** Bien que les variables protégées aient été exclues (IA éthique), des "proxy-biais" peuvent exister. Par exemple, si historiquement le salaire (`SalaryDiff`) est corrélé au genre dans l'entreprise, le modèle pourrait indirectement reproduire ce biais structurel.

### 5. Risques & mitigation

* **Risques de mauvaise utilisation :** Utilisation punitive du modèle (ex: licencier préventivement ou refuser une promotion à un employé considéré "à risque").
* **Contrôles mis en place :**
* **Anonymisation :** Suppression des noms et IDs.
* **Anti-Discrimination (By Design) :** Exclusion totale des variables sensibles (`Sex`, `RaceDesc`, `HispanicLatino`, `CitizenDesc`) de l'entraînement.
* **Explicabilité imposée :** Le score de risque est toujours livré avec l'explication SHAP. Les RH ne doivent pas agir aveuglément sur le score, mais traiter la cause racine (ex: ajuster le salaire si `SalaryDiff` est le facteur déclenchant).

### 6. Énergie et frugalité

* **Poids du modèle :** Très léger (quelques mégaoctets). Algorithme de Machine Learning classique (Random Forest), sans recours au Deep Learning coûteux en ressources.
* **Temps d'inférence :** Quasi-instantané sur CPU standard. Ne nécessite aucune infrastructure GPU pour l'inférence.
* **Énergie estimée :** Suivi actif de l'empreinte carbone de la phase d'entraînement en kilogrammes d'équivalent CO2 via la librairie `CodeCarbon`.

---

### 🗂️ DATA CARD : HRDataset v14

### 1. Provenance et Qualité

* **Source :** Dataset de synthèse généré par le Dr. Rich Huebner, hébergé sur Kaggle.
* **Statut :** Données simulées mais structurellement fidèles à la réalité d'un système d'information RH américain (SIRH).
* **Qualité globale :** Bonne. Quelques valeurs manquantes isolées, mais aucune corruption majeure.

### 2. Architecture du Dataset

* **Format :** CSV (Comma-Separated Values).
* **Dimensions :** 311 lignes (employés), 36 colonnes (avant nettoyage).
* **Variable Cible (Target) :** `Termd` (Binaire : 1 = Départ, 0 = Actif).
* **Typologie des variables :**
* *Démographiques :* Âge, Sexe, Ethnie, Statut marital (exclues ou transformées pour l'entraînement).
* *Organisationnelles :* Département, Position, Manager, Date d'embauche.
* *Comportementales :* Score de performance, Absences, Retards sur 30 jours, Projets spéciaux, Engagement.
* *Salariales :* Salaire annuel.

### 3. Statistiques Descriptives (Baseline)

* **Taux d'attrition global :** ~33% (Donnée déséquilibrée).
* **Départements les plus touchés :** Production et IT/IS.
* **Départements les plus stables :** Admin et Executive Office.

### 4. Considérations Éthiques et Légales relatives aux données

* **RGPD / Privacy :** Les données d'origine contiennent des noms complets et des identifiants employés. Un traitement d'anonymisation strict est appliqué en étape 1 du pipeline.
* **Critères sensibles :** Le dataset originel inclut des données protégées par la loi (Sexe, Origine ethnique). Ces colonnes sont isolées et conservées **uniquement** pour l'audit d'équité post-prédiction, elles ne sont jamais injectées dans le modèle.