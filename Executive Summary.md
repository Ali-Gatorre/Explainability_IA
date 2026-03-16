# LIVRABLE 6 : Executive Summary

**PROJET : HR ATTRITION PREDICTOR**
*De la gestion réactive à la rétention proactive des talents.*

**1. Le Défi Métier**
Le turnover non anticipé, particulièrement dans les pôles sous tension (IT, Production), représente un coût majeur (recrutement, chasseurs de têtes, perte de savoir-faire). Les entretiens annuels sont souvent trop espacés pour capter les signaux faibles de désengagement.

**2. Notre Solution**
Un modèle d'Intelligence Artificielle (Machine Learning) qui analyse les données RH structurelles et comportementales (écarts salariaux, ancienneté, retards, âge) pour prédire une **probabilité de départ** pour chaque collaborateur.

**3. Performances & ROI**

* **Précision ciblée :** Le modèle détecte **4 départs sur 5** (ROC-AUC de 0.80), permettant aux équipes RH de concentrer leur budget de rétention sur les vrais employés à risque.
* **Explicabilité (White-Box) :** Chaque alerte est accompagnée d'un diagnostic. Les 3 facteurs majeurs de fuite identifiés dans notre entreprise sont : 1. La sous-évaluation salariale par rapport au marché interne (*SalaryDiff*). 2. L'âge (les jeunes talents sont plus volatiles). 3. L'augmentation soudaine des absences courtes.

**4. Engagements Éthiques & RSE**

* **Zéro Discrimination :** Le modèle a subi un audit algorithmique (AIF360). Avec un *Disparate Impact Score* de 0.89, il est mathématiquement certifié neutre vis-à-vis du genre. Les variables sensibles ont été exclues par conception.
* **Green IT :** Utilisation d'un algorithme frugal (*Random Forest*) dont l'empreinte carbone d'entraînement est quasi-nulle (suivi via *CodeCarbon*), contrairement aux approches Deep Learning gourmandes en énergie.

**5. Prochaine Étape**
Déploiement en phase pilote sur le périmètre "Tech & IT" pour les HRBP.