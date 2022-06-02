class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.cost = this.calculatePrice();
        this.calories = this.calculateCalories();
        this.mayonnaise = false;
        this.condiment = false;
    }

    getSize() {
        if (this.size === 'small')
            return {
                size: 'smallHamburger',
                cost: 50,
                calories: 20,
            }
        else if (this.size === 'big')
            return {
                size: 'bigHamburger',
                cost: 100,
                calories: 40,
            }
        else {
            console.log('Нет гамбургера такого размера')
            return {}
        }
    }

    getStuffing() {
        if (this.stuffing === 'cheese')
            return {
                stuffing: 'cheese',
                cost: 10,
                calories: 20,
            }
        else if (this.stuffing === 'salad')
            return {
                stuffing: 'salad',
                cost: 20,
                calories: 5,
            }
        else if (this.stuffing === 'potato')
            return {
                stuffing: 'potato',
                cost: 15,
                calories: 10,
            }
        else {
            console.log('Нет гамбургера с такой начинкой');
            return {}
        }
    }

    addMayonnaise() {
        this.mayonnaise = true;
        return {
            topping: 'mayonnaise',
            cost: 20,
            calories: 5,
        }
    }

    addCondiment() {
        this.condiment = true;
        return {
            topping: 'condiment',
            cost: 15,
            calories: 0,
        }
    }

    removeMayonnaise() {
        this.mayonnaise = false;
    }

    removeCondiment() {
        this.condiment = false;
    }

    calculatePrice() {
        let resultSum = this.getSize().cost + this.getStuffing().cost;
        if (this.mayonnaise === true) resultSum += this.addMayonnaise().cost;
        if (this.condiment === true) resultSum += this.addCondiment().cost;
        this.cost = resultSum;
        return resultSum;
    }

    calculateCalories() {
        let resultCall = this.getSize().calories + this.getStuffing().calories;
        if (this.mayonnaise === true) resultCall += this.addMayonnaise().calories;
        if (this.condiment === true) resultCall += this.addCondiment().calories;
        this.callories = resultCall;
        return resultCall;
    }
}

const hamb = new Hamburger('small', 'cheese');
hamb.addCondiment();
hamb.calculatePrice();
hamb.calculateCalories();
