export default {
	methods: {
		searchRequest( event ) {
			this.$store.state.searchInput = event.target.value;
		},
		categoryTrigger( value ) {
			this.$store.state.category = value;
		},
		saleTrigger( value ) {
			this.$store.state.sale = value;
		},
		sortTrigger( value ) {
			this.$store.state.sort = value;
		},
		applyFilters() {
			this.$emit('filtersApplied', true);
		}
	}
}