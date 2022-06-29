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

URL_BASKETGOODS = `${BASE_URL}/getBasket.json`

class BasketGoods {
    list = [];
    fetchBasket() {
        service(URL_BASKETGOODS).then((data) => {
            this.list = data;
        })
    }
}

window.onload = () => {
    const app = new Vue({
        el: "#root",
        data: {
            list: [],
            searchValue: '',
            isVisibleCart: false,
        },

        mounted() {
            service(URL_PRODUCTS).then((data) => {
                this.list = data;
            });
        },

        methods: {
            openCart() {
                this.isVisibleCart = true;
            },

            closeCart() {
                this.isVisibleCart = false;
            }
        },

        computed: {
            getSum() {
                const sumPrice = this.list.reduce((sum, item) => {
                    return sum + item.price;
                }, 0);
                return sumPrice;
            },

            filter() {
                return this.list.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.searchValue, "gui"));
                })
            }
        }
    });
}
