
define('day', function(datas, render){

    this.effect('index', value => datas['day'] = value+1)

    render(/*html*/`
        <div class="x-day" x-text="day">
            I'm a day
        </div>
    `);

})