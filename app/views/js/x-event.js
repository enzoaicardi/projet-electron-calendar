
function toInputDate(timestamp){
    let date = new Date(timestamp);
    return date.getFullYear() + '-' + (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
}

define('event', function(datas, render){

    datas['id'] = new URLSearchParams(window.location.search).get('id') || '';

    if(datas['id']){
        window.calendar.getEvent(Number(datas['id'])).then(res => {
            datas['event'] = res[0];
            datas['date_start'] = toInputDate(datas['event'].date_start);
            datas['date_end'] = toInputDate(datas['event'].date_end);
        });
    }

    const getDatas = ()=>{
        if(!this.ref('date_start').value || !this.ref('date_end').value){
            this.ref('date_start').style.border = this.ref('date_end').style.border = '2px solid red';
            return;
        }
        let array = [
            this.ref('title').value,
            this.ref('description').value,
            new Date(this.ref('date_start').value).getTime(),
            new Date(this.ref('date_end').value).getTime(),
            this.ref('color').value
        ];
        if(datas['id']){
            array.unshift(Number(datas['id']));
        }
        return array;
    }

    render(/*html*/`
        <form class="x-event">

            <input type="hidden" name="id" x-value="id">
            <input ref="title" type="text" name="name" placeholder="Titre" x-value="event.name">

            <textarea ref="description" name="description" placeholder="Description de l'évenemment" x-text="event.description"></textarea>
            
            <div class="flex">
                <input ref="color" type="color" name="color" x-value="event.color">
                
                <input ref="date_start" type="date" name="date_start" placeholder="date" x-value="date_start">
                <input ref="date_end" type="date" name="date_end" placeholder="date" x-value="date_end">
            </div>

            <div class="flex">
                <button type="button" ref="save">Enregistrer</button>
                <button type="button" ref="delete" x-show="id">Supprimer</button>
            </div>

        </form>
    `)

    this.ref("save").addEventListener('click', async e => {
        if(!datas['id']) {
            let id = await window.calendar.addEvent(getDatas());
            datas['id'] = id;
        }
        else{
            window.calendar.updateEvent(getDatas());
        }
    })

    this.ref("delete").addEventListener('click', e => {
        if(!datas['id']) return;
        window.calendar.deleteEvent(Number(datas['id']));
    })

})