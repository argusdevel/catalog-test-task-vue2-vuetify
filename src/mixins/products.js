import axios from "axios";

export default {
	data() {
		return {
			dialog: false,
			total: 0.0,
			subtotal: 0.0,

			loading: true
		}
	},
	created() {

		this.getProducts();
	},
	methods: {
		addProduct( product ) {
			if ( Object.keys(product).length > 0 ) {
				if ( this.$store.state.basket.length > 0 ) {
					let addedProduct = this.$store.state.basket.find((basketItem) => basketItem.id === product.id);

					if ( addedProduct === undefined ) {
						this.$store.state.basket.push(product);
					}
				} else {
					this.$store.state.basket.push(product);
				}

				localStorage.setItem('basket', JSON.stringify(this.$store.state.basket));
			}
		},
		openDialog( status ) {
			this.dialog = status;

			this.total = 0.0;
			this.subtotal = 0.0;

			this.$store.state.basket.forEach((product) => {

				this.total += product.salePrice;
				this.subtotal += product.price;
			});
		},
		emptyBasket() {
			this.$store.state.basket = [];
			localStorage.removeItem('basket');

			this.total = 0.0;
			this.subtotal = 0.0;
		},
		deleteItem( id ) {

			this.total = 0;
			this.subtotal = 0;

			this.$store.state.basket = this.$store.state.basket.filter((product) => {
				if ( product.id !== id ) {
					this.total += product.salePrice;
					this.subtotal += product.price;

					return product;
				}
			});

			localStorage.setItem('basket', JSON.stringify(this.$store.state.basket));
		},
		async getProducts() {
			try {
				let response = await axios.get('api.json');
				this.$store.state.products = response.data;
			} catch (e) {
				alert('Products not found');
			} finally {
				if ( this.$store.state.products.length > 0 ) {
					this.getBasket();
					this.sortProducts(false);
					this.$store.state.loading = false;
				}
			}
		},
		sortProducts( filters ) {
			let products = this.$store.state.products;

			if ( filters ) {
				if (this.$store.state.searchInput !== '') {
					products = products.filter((product) => product.title.toLowerCase().includes(this.$store.state.searchInput));
				}

				if (this.$store.state.category !== 'all') {
					products = products.filter((product) => product.term === this.$store.state.category);
				}

				if (this.$store.state.sale === 'onSale') {
					products = products.filter((product) => product.sale > 0);
				}
			}

			if (this.$store.state.sort === 'asc') {
				products.sort((a, b) => parseFloat(a.salePrice) < parseFloat(b.salePrice) ? -1 : 1);
			} else {
				products.sort((a, b) => parseFloat(b.salePrice) < parseFloat(a.salePrice) ? -1 : 1);
			}

			this.$store.state.sortedProducts = products;
		},
		getBasket() {

			let basket = JSON.parse(localStorage.getItem('basket'));

			if ( basket ) {
				this.$store.state.basket = basket;
			}
		}
	}
}