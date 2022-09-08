const getRemainTime = (deadline) => {
    let now = new Date();
    let remainTime = (new Date(deadline) - now + 1000) / 1000;
    let remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
    let remainMinutes = ('0'+ Math.floor(remainTime / 60 % 60)).slice(-2);
    let remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2);
    let remainDays = Math.floor(remainTime / (3600 * 24));  
    let remainDaysT = remainDays.toString()

    return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDaysT
    }
}

const countdown = (deadline) => {
    const tDays = document.querySelector('[data-days]')
    const tHours = document.querySelector('[data-Hours]')
    const tMinutes = document.querySelector('[data-Minutes]')
    const tSeconds = document.querySelector('[data-Seconds]')


    const timerUpdate = setInterval(() => {
        let time = getRemainTime(deadline)
        flip(tDays, time.remainDaysT)
        flip(tHours, time.remainHours)
        flip(tMinutes, time.remainMinutes)
        flip(tSeconds, time.remainSeconds)
    }, 1000)
}

countdown('Jan 01 2023 00:00:00 GMT-0500');


async function flip (flipCard, newNumber){
    const topHalf = flipCard.querySelector('.top');
    const startNumber = topHalf.textContent;
    if (newNumber===startNumber) return

    const botHalf = flipCard.querySelector('.bottom');
    const topFlip = document.createElement('div');
    topFlip.classList.add('top-flip');
    const bottomFlip = document.createElement('div');
    bottomFlip.classList.add('bottom-flip');

    top.textContent = startNumber
    bottomFlip.textContent = newNumber
    bottomFlip.innerHTML = `<span class="text text--bot">${newNumber}</span>`

    topFlip.addEventListener('animationstart', e => {
        topFlip.innerHTML =  `<span class="text text--top">${newNumber}</span>`
        topHalf.innerHTML=  `<span class="text text--top--under">${newNumber}</span>`
    })
    
    topFlip.addEventListener('animationend', e => {
        topFlip.remove()
    })
    
    bottomFlip.addEventListener('animationend', e => {
        botHalf.innerHTML = `<span class="text text--bot">${newNumber}</span>`        
        bottomFlip.remove()
    })
        
    flipCard.append(topFlip, bottomFlip)
}   