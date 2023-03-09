let daily = document.getElementById('daily')
let weekly = document.getElementById('weekly')
let monthly = document.getElementById('monthly')

let configurator = [daily,weekly,monthly]

async function getData(type) {
    
    const res = await fetch("/data.json");
    const data = await res.json();

    for(let field in data){
        let title = data[field].title
        let timeframe = data[field].timeframes

        let element = document.querySelector(`li[name="${title}"]`)

        let currentInput = element.querySelector('h3[name="current"');
        let previousInput = element.querySelector('span[name="previous"')

        currentInput.innerText = `${timeframe[type].current}hrs`
        previousInput.innerText = `${timeframe[type].previous}`
    }
}

window.onload = () => {
    getData('daily')
}

configurator.forEach(state => {
    state.addEventListener("click", () => {
        let text = state.innerText.toLowerCase();
        getData(text);

        let calendarType = document.querySelectorAll('span[name="calendar"');
        calendarType.forEach( cal => {
            switch(text){
            case 'daily':
                cal.innerText = 'day'
                break;
            case 'weekly':
                cal.innerText = 'week'
                break;
            case 'monthly':
                cal.innerText = 'month'
                break;
            }
        })
    })
})



