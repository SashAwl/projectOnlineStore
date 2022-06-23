const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const URL_PRODUCTS = `${BASE_URL}/catalogData.json`


function service(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        const loadHandler = () => {
            resolve(JSON.parse(xhr.response));
        }

        xhr.onload = loadHandler;
        xhr.send();
    })

}

class GoodsItem {
    constructor({ product_name = "No name", price = "0" }) {
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    list = [];
    listFiltered = [];
    fetchData() {
        return service(URL_PRODUCTS).then((data) => {
            this.list = data;
            this.listFiltered = data;
        });
    }

    filter(str) {
        this.listFiltered = this.list.filter(({ product_name }) => {
            return (new RegExp(str, "i")).test(product_name);
        })
    }

    render() {
        let goodsList = this.listFiltered.map((item) => {
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

URL_BASKETGOODS = `${BASE_URL}/getBasket.json`

class BasketGoods {
    list = [];
    fetchBasket() {
        service(URL_BASKETGOODS).then((data) => {
            this.list = data;
        })
    }
}

const goodsList = new GoodsList();
goodsList.fetchData().then(() => {
    goodsList.render();
});

const basketGoods = new BasketGoods();
basketGoods.fetchBasket();

document.getElementsByClassName("search-button")[0].addEventListener('click', () => {
    const input = document.getElementsByClassName("search-value")[0];

    goodsList.filter(input.value);
    goodsList.render();
})