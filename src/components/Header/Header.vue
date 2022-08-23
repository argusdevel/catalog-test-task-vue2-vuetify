<template>
    <div class="header-wrap">
        <span class="app-title">
            S—Shop
        </span>

        <router-link to="/catalog">
            Catalog
        </router-link>

        <div>
            <router-link to="/profile">
                Profile
            </router-link>

            <span class="basket-trigger-wrap" @click="openBasket">
                Basket({{ $store.state.basket.products.length }})
            </span>
        </div>
    </div>
</template>

<script>
import './Header.scss'

export default {
    name: "Header",
    methods: {
        openBasket() {
            this.$emit('openBasket', true);
        }
    }
}
</script>
