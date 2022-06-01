const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GoodsItem {
    constructor({ title = "No name", price = "0" }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    fetchData() {
        this.list = goods;
    }

    render() {
        let goodsList = this.list.map((item) => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        })
        document.querySelector('.goods-list').innerHTML = goodsList.join('');
    }

    getSum() {
        const sumPrice = this.list.reduce((sum, item) => {
            return sum + item.price;
        }, 0);
        return sumPrice;
    }

}

const goodsList = new GoodsList(goods);
goodsList.fetchData();
goodsList.render();