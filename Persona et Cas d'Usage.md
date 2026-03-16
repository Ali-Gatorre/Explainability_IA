# Persona et Cas d'Usage

## 👤 Le Persona : Camille, la "HR Business Partner" (HRBP) proactive

**Profil :**

* **Rôle :** HR Business Partner (partenaire RH) dédiée au pôle "Tech & IT" de l'entreprise.
* **Son quotidien :** Elle accompagne les managers de son pôle dans la gestion de leurs équipes (recrutement, évolution, conflits, rémunération).
* **Compétences techniques :** Elle connaît parfaitement l'humain et le business, mais elle **n'est pas une experte en data**. Elle a besoin d'outils visuels, simples et explicables (pas de "boîte noire").

**Ses objectifs :**

1. Fidéliser les talents clés (notamment les développeurs et ingénieurs très chassés par la concurrence).
2. Optimiser le budget alloué aux augmentations (ne pas saupoudrer l'argent au hasard, mais cibler ceux qui en ont le plus besoin pour rester).

**Ses frustrations (avant notre modèle) :**

* Elle est souvent mise devant le fait accompli : "Camille, Julien vient de poser sa démission, il faut lancer un recrutement en urgence."
* Les entretiens annuels arrivent trop tard pour capter les signaux faibles de démotivation.

---

## 🎯 Le Cas d'Usage : La campagne de rétention préventive

**Contexte :** Nous sommes en octobre, deux mois avant la période officielle des augmentations et des entretiens annuels. Camille veut identifier les personnes à risque pour anticiper.

**Étape 1 : L'Alerte du Modèle**
Camille ouvre son tableau de bord RH (alimenté par notre modèle Random Forest). Le système met en évidence une alerte : **Julien (Développeur Senior)** présente un **risque de départ estimé à 82%** pour les 3 prochains mois.

**Étape 2 : L'Explicabilité (La magie de SHAP)**
Camille ne va pas voir Julien en lui disant "l'algorithme a dit que tu partais". Elle regarde d'abord *pourquoi* le modèle a sorti ce score de 82%.
Le graphique d'explicabilité (SHAP) lui montre les 3 facteurs aggravants pour Julien :

1. **SalaryDiff (Impact très fort) :** Son salaire est de 15% inférieur à la moyenne des autres Développeurs Seniors de l'entreprise.
2. **Absences (Impact modéré) :** Il a posé 4 jours de congés isolés (souvent des vendredis ou lundis) sur le dernier mois, ce qui est un comportement inhabituel pour lui (potentiels entretiens d'embauche ailleurs).
3. **DaysLate (Impact faible) :** Quelques retards récents.

**Étape 3 : L'Action RH (Intervention Humaine)**
Forte de ces données, Camille contacte le manager direct de Julien :

* *"J'ai analysé le positionnement de Julien. C'est un talent clé, mais il est significativement sous-payé par rapport au marché interne, et je sens des signaux de désengagement. Es-tu satisfait de son travail ?"*
* Le manager confirme que Julien est indispensable au projet actuel.

**Étape 4 : La Résolution**
Camille et le manager décident de ne pas attendre décembre. Le manager organise un déjeuner informel avec Julien la semaine suivante. Il tâte le terrain et lui propose de manière proactive une revalorisation salariale anticipée pour "récompenser son investissement sur le dernier projet".

**Bilan (ROI) :**
Julien, qui passait effectivement des entretiens à l'extérieur car il se sentait lésé financièrement, décide de rester, touché par la reconnaissance proactive de son entreprise.
L'entreprise a dépensé 5 000 € en augmentation, mais a **économisé 25 000 €** (coût moyen d'un recrutement externe, chasseur de tête, mois de carence et formation d'un nouvel arrivant).