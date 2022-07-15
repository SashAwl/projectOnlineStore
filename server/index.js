import express from 'express';
import cors from 'cors';
import { writeFile, readFile } from 'fs/promises';
import bodyParser from 'body-parser';

const BASKET = './public/basket-goods.json';
const GOODS = './public/goods.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const readBasket = () => readFile(BASKET, 'utf-8')
    .then((stringFile) => {
        return JSON.parse(stringFile)
    });

const readGoods = () => readFile(GOODS, 'utf-8')
    .then((stringFile) => {
        return JSON.parse(stringFile)
    });

const getReforBasket = () => {
    return Promise.all([readBasket(), readGoods()])
        .then(([basketList, goodsList]) => {
            return basketList.map((basketItem) => {
                const goodsItem = goodsList.find(({ id_product: _goodsId }) => {
                    return _goodsId === basketItem.id_product
                });
                return {
                    ...basketItem,
                    ...goodsItem
                }
            });
        })
    return result;
}

app.post('/goods', (res, req) => {
    readBasket().then((basket) => {

        const basketItem = basket.find(item => item.id_product === res.body.id_product)

        if (!basketItem) {
            basket.push({
                id_product: res.body.id_product,
                count: 1
            })
        } else {
            basket = basket.map(basketItem => {
                if (basketItem.id_product === res.body.id_product) {
                    return {
                        ...basketItem,
                        count: basketItem.count + 1
                    }
                } else {
                    return basketItem
                }
            })
        }
        writeFile(BASKET, JSON.stringify(basket)).then(() => {
            getReforBasket()
        }).then((result) => {
            req.send(result)
        });
    });
});

app.get('/basket', (res, req) => {
    getReforBasket().then((result) => {
        req.send(JSON.stringify(result))
    })
});

app.listen('8000', () => {
    console.log('server is starting!');
})
