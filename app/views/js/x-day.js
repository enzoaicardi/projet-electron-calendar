
define('day', function(datas, render){

    this.effect('index', value => datas['day'] = Number(value) + 1);

    render(/*html*/`
        <div class="x-day">
            <div class="x-day-title" x-text="day"></div>
        </div>
    `);

})