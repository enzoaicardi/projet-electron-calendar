
const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

function daysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

define('calendar', function(datas, render){

    let date = new Date();
    datas['year'] = date.getFullYear();
    datas['month'] = date.getMonth();
    datas['monthName'] = monthNames[datas['month']];
    datas['days'] = daysInMonth(datas['year'], datas['month']+1);

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

            <div class="x-calendar-grid" x-for="days" var="day">
                <x-day x-year="year" x-month="month" x-index="day"></x-day>
            </div>

        </section>

    `)

    this.effect('month', value => {
        datas['days'] = daysInMonth(datas['year'], value+1)
        datas['monthName'] = monthNames[value]
    });

    this.custom.nextMonth = function(){
        if(datas['month'] === 11) { datas['month'] = 0; datas['year']++; }
        else datas['month']++;
    }

    this.custom.previousMonth = function(){
        if(datas['month'] === 0) { datas['month'] = 11; datas['year']--; }
        else datas['month']--;
    }

});