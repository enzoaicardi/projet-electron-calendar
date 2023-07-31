
define('event', function(datas, render){

    render(/*html*/`
        <form class="x-event">

            <input type="text" name="name" placeholder="Titre">

            <textarea name="description" placeholder="Description de l'évenemment"></textarea>
            
            <div class="flex">
                <input type="color" name="color">
                
                <input type="date" name="date_start" placeholder="date">
                <input type="date" name="date_end" placeholder="date">
            </div>

            <div class="flex">
                <button>Enregistrer</button>
                <button>Supprimer</button>
            </div>

        </form>
    `)

})