class GoodsItem {
    constructor(image, title, description, price, id) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    render() {
        return `<div class="goods-item">
            <img src="${this.image}" alt="">
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${this.price}</p>
            <p><button data-id="${this.id}" class="buy">Купить</button></p>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        makeGETRequest(`js/prods.json`)
            .then(
                response => {
                    this.goods = JSON.parse(response);
                    cb();
                },
                error => alert(`Rejected: ${error}`)
            );
    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.img, good.title, good.description, good.price, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods-list").innerHTML = listHtml;
    }

    productBtn() {
        let btn = document.querySelectorAll('.buy');
        btn.forEach(el => {
            el.addEventListener('click', (eventBuy) => {
                let productId = el.dataset.id;
                return productId;
            })
        })
    }
}

class BasketItem {
    constructor(image, title, description, price, id, count) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.description = description;
        this.price = price;
        this.count = count;
    }

    render() {
        return `<div class="goods-item">
            <img src="${this.image}" alt="">
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${this.price}</p>
            <p>${this.count}</p>
            <p><button data-id="${this.id}" class="buy">Купить</button></p>
        </div>`;
    }
}

class Basket {
    constructor() {
        this.basket = [];
    }

    render() {
        let listHtml = "";
        if (this.basket.length === 0) {
            listHtml = `<div>Корзина пуста</div>`;
        } else {
            this.basket.forEach(basket => {
                let basketItem = new BasketItem(basket.img, basket.title, basket.description, basket.price, basket.id);
                listHtml += basketItem.render();
            });
        }
        document.querySelector(".basket").innerHTML = listHtml;
    }
}

function makeGETRequest(url) {

    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });

}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    list.productBtn();
});

let basket = new Basket();
basket.render();














