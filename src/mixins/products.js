import axios from "axios";

export default {
	data() {
		return {
			dialog: false,
			loading: true
		}
	},
	created() {

		this.getProducts();
	},
	methods: {
		addProduct( product ) {
			if ( Object.keys(product).length > 0 ) {
				if ( this.$store.state.basket.products.length > 0 ) {

					if ( this.$store.state.basket.products.find((basketItem) => basketItem.id === product.id) === undefined ) {
						this.$store.state.basket.products.push(product);
						this.$store.state.basket.total += product.salePrice;
						this.$store.state.basket.subtotal += product.price;
					}
				} else {
					this.$store.state.basket.products.push(product);
					this.$store.state.basket.total += product.salePrice;
					this.$store.state.basket.subtotal += product.price;
				}

				this.$store.state.basket.total = parseFloat(this.$store.state.basket.total.toFixed(2));
				this.$store.state.basket.subtotal = parseFloat(this.$store.state.basket.subtotal.toFixed(2));

				localStorage.setItem('basket', JSON.stringify(this.$store.state.basket));
			}
		},
		emptyBasket() {
			this.$store.state.basket = {
				products: [],
				total: 0.0,
				subtotal: 0.0
			};
			localStorage.removeItem('basket');
		},
		deleteItem( id ) {
			let total = 0.0;
			let subtotal = 0.0;

			this.$store.state.basket.products = this.$store.state.basket.products.filter((product) => {
				if (product.id !== id) {
					total += product.salePrice;
					subtotal += product.price;

					return product;
				}
			});
			this.$store.state.basket.total = parseFloat(total.toFixed(2));
			this.$store.state.basket.subtotal = parseFloat(subtotal.toFixed(2));

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
					this.sortProducts();
					this.$store.state.loading = false;
				}
			}
		},
		sortProducts() {
			let products = this.$store.state.products;

			let filters = {
				search: this.$store.state.searchInput,
				category: this.$store.state.category,
				sale: this.$store.state.sale,
				sort: this.$store.state.sort
			};

			if (filters.search !== '') {
				products = products.filter((product) => product.title.toLowerCase().includes(filters.search));
			}
			if (filters.category !== 'all') {
				products = products.filter((product) => product.term === filters.category);
			}
			if (filters.sale === 'onSale') {
				products = products.filter((product) => product.sale > 0);
			}

			if (filters.sort === 'asc') {
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