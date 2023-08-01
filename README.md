# Projet electron calendrier

Les consignes :

[x] Réaliser une page qui affiche le calendrier mois par mois avec possibilité de changer de mois
[x] Gérer les évenements dans la base de données
[x] CRUD évenement depuis electron
[x] Faire la page de nouvel évènement
[x] Faire la page de modif évènement
[x] Faire la page de détail évènement

[ ] Afficher les évènements stockés en BDD dans l'affichage du calendrier
[ ] Convertir les dates en timestamp de 1899.
[ ] Gérer le bouton de suppression d'évènement
[ ] Gérer le bouton de creation/modification d'évènement
[ ] Importer les données d'un event dans la page event
[ ] Sauvegarder un évènement en ICS (optionnel)
[ ] Charger un évènement depuis un fichier ICS et permettre de l'enregistrer en BDD (optionnel)

# Composants

- Calendar
- Day

# Entités

- Event
    - name
    - description
    - date de début / fin
    - heure de debut / fin (option)
    - couleur