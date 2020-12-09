const shuffle = require('./shuffle')

module.exports = (participants) => {
    const result = []
    const shuffled = shuffle(participants) //resultado do embaralhamento
    const total = shuffled.length

    for (let i = 0;i < total -1;i++) {
        result.push({
            giver: shuffled[i],//sorteou o receiver
            receiver: shuffled[i+1],//pego o próximo da posição atual
        })
    }

    result.push({
        giver: shuffled[total-1],//pego o último do array
        receiver: shuffled[0],//o primeiro que sorteou será o último a ser sorteado
    })

    return result
}