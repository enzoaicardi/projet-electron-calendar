
const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

function daysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

define('calendar', function(datas, render){

    let date = new Date();
    let events = [];

    function getLimits(){
        let date_start = new Date(Date.UTC(datas['year'], datas['month'], 1));
        let date_end = new Date(Date.UTC(datas['year'], datas['month'], datas['days']));
        return { start: date_start, end: date_end };
    }
    
    this.effect('month', value => {

        datas['days'] = daysInMonth(datas['year'], value+1)
        datas['monthName'] = monthNames[value]

        let limits = getLimits();

        window.calendar.getEvents(limits.start.getTime(), limits.end.getTime())
        .then(res => datas['events'] = res);
        
    });

    this.effect('events', value => {

        let limits = getLimits();

        for(let eventElement of events){
            eventElement.remove();
        }

        for(let event of value){

            let start = new Date(event.date_start).getTime() <= limits.start.getTime() ? limits.start : new Date(event.date_start);
            let end = new Date(event.date_end).getTime() >= limits.end.getTime() ? limits.end : new Date(event.date_end);

            for(let x=start.getDate()-1; x<end.getDate(); x++){

                let element = document.createElement('div');
                    element.classList.add('event-element');
                    element.style.backgroundColor = event.color;
                    element.textContent = event.name;
                    element.addEventListener('click', e => {
                        window.calendar.openEvent(event.id)
                    });

                events.push(element);
                this.ref('grid').children[x].appendChild(element);

            }

        }

    });

    datas['year'] = date.getFullYear();
    datas['month'] = date.getMonth();

    this.iterable('days', 'iterable');

    render(/* html */`
    
        <section class="x-calendar">

            <header class="x-calendar-header">
                <button onclick="this.component.custom.previousMonth()">&lt;</button>
                <h2>
                    <span x-text="monthName"></span>
                    <span x-text="year"></span>
                </h2>
                <button onclick="this.component.custom.nextMonth()">&gt;</button>
            </header>

            <div ref="grid" class="x-calendar-grid" x-for="iterable" var="day">
                <x-day x-year="year" x-month="month" x-index="day.key"></x-day>
            </div>

            <button onclick="window.calendar.openEvent()">Créer un evenement</button>

        </section>

    `)

    this.custom.nextMonth = function(){
        if(datas['month'] === 11) { datas['month'] = 0; datas['year']++; }
        else datas['month']++;
    }

    this.custom.previousMonth = function(){
        if(datas['month'] === 0) { datas['month'] = 11; datas['year']--; }
        else datas['month']--;
    }

});