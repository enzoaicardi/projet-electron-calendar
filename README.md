# Projet electron calendrier

Les consignes :

- [x] Réaliser une page qui affiche le calendrier mois par mois avec possibilité de changer - de mois
- [x] Gérer les évènements dans la base de données
- [x] CRUD évènement depuis electron
- [x] Faire la page de nouvel évènement
- [x] Faire la page de modif évènement
- [x] Faire la page de détail évènement
- [x] Convertir les dates en timestamp de 1899.
- [x] Gérer le bouton de suppression d'évènement
- [x] Gérer le bouton de creation/modification d'évènement
- [x] Importer les données d'un event dans la page event
- [x] Afficher les évènements stockés en BDD dans l'affichage du calendrier
- [x] Gérér la modification d'évènement au clic sur celui-ci
- [x] Eviter de créer un evenement incomplet (ex : date)
- [x] Reload automatique a l'update (ou sinon juste passer par la lib)
- [x] Sauvegarder un évènement en ICS (optionnel)
- [x] Charger un évènement depuis un fichier ICS et permettre de l'enregistrer en BDD (optionnel)

# Composants

- Calendar
- Day

# Entités

- Event
    - name
    - description
    - date de début / fin
    - couleur