export enum Rank {
    Common,
    Rare,
    SSR
}

export enum Person {
    Peem,
    Kittiphotot
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function RandomRank() {
    let rank = Rank.Common;

    const randomSSR = getRandomInt(5, 50) //1/100;
    if (randomSSR == 5) {
        rank = Rank.SSR
    }
    else {
        const randomRare = getRandomInt(3, 10) //1/10;
        if (randomRare == 3) {
            rank = Rank.Rare
        }
    }

    return rank;
}

export function RandomPerson() {
    const randomNum = getRandomInt(1, 2);
    if (randomNum == 1) {
        return Person.Peem
    }
    else {
        return Person.Kittiphotot
    }
}
 
export function RandomRareType() {
    const randomNum = getRandomInt(1, 2);
    return randomNum
}

export function RandomSSRType() {
    const randomNum = getRandomInt(1, 4);
    return randomNum
}