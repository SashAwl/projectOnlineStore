const BASE_URL = "http://localhost:8000";
const URL_PRODUCTS = `${BASE_URL}/goods.json`
const URL_BASKETGOODS = `${BASE_URL}/basket`

function service(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
            if (xhr.status < 400) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(`Ошибка загрузки скрипта`));
            }
        }
        xhr.send();
    })
}

window.onload = () => {

    Vue.component('goods-item', {
        props: ['item'],
        template: '<div class="goods-item"><h3>{{ item.product_name }}</h3><p>{{ item.price }}</p></div>'
    });

    Vue.component('custom-button', {
        template: `
        <button class="cart-button" @click="$emit('click')"> <slot></slot> </button>
        `
    });

    Vue.component('basketItem', {
        props: ['item'],
        template: `
        <div class="basketItem">
        <div class="nameProduct"><h3>{{ item.product_name }}</h3><p>{{ item.price }} руб.</p></div>
        <div class="countProduct"><p>{{ item.count }} шт.</p>
        <div><button class="countButton">+</button>
        <button class="countButton">-</button></div>
        </div>
        </div>
        `
    });

    Vue.component('basket', {
        data: () => {
            return {
                basketGoodsItem: []
            }
        },
        template: `
        <div class="cartArea"> 
            <div class="openCart">
                <span>Корзина </span>
                <div @click="$emit('click')"><i class="fa fa-window-close" aria-hidden="true"></i></div>
            </div>
            <div>
                <p v-if="!basketGoodsItem"> Ваша корзина пуста </p>
                <basketItem v-if="basketGoodsItem" v-for="item in basketGoodsItem" v-bind:item='item'>
                </basketItem>
            </div>
        </div>
        `,
        mounted() {
            service(URL_BASKETGOODS)
                .then((data) => {
                    this.basketGoodsItem = data;
                })
        }
    });

    Vue.component('search', {
        model: {
            prop: 'searchValue',
        },
        props: {
            searchValue: String,
        },

        template: `
        <input type="text" class="search-value" 
        placeholder="Искать подходящие товары" 
        v-bind:searchValue="searchValue" 
        @input="$emit('input',$event.target.value)" >
        `
    });

    Vue.component('error', {
        template: `
        <div class="error">
        <slot></slot>
        <div @click="$emit('click')"><i class="fa fa-window-close" aria-hidden="true"></i></div>
        </div>  
        `
    });

    const app = new Vue({
        el: "#root",
        data: {
            list: [],
            basketGoodsItem: [],
            isVisibleCart: false,
            searchValue: '',
            isVisibleError: false,
        },

        mounted() {
            service(URL_PRODUCTS).then(
                (data) => this.list = data,
                (error) => {
                    this.closeError();
                    setTimeout(this.closeError, 6000)
                }
            );
        },

        methods: {
            openCart() {
                this.isVisibleCart = true;
            },

            closeCart() {
                this.isVisibleCart = false;
            },

            closeError() {
                this.isVisibleError = !this.isVisibleError;
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
