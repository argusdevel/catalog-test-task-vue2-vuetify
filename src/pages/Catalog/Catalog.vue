<template>
    <v-app id="inspire" class="catalog-wrap">
        <v-main>
            <v-row>
                <v-col cols="12" xs="10">
                    <v-row class="cust-row" no-gutters>
                        <v-col>
                            <Header @openBasket="dialog = true"></Header>
                        </v-col>
                    </v-row>

                    <v-row class="cust-row" no-gutters>
                        <v-col>
                            <Options @filtersApplied="sortProducts"></Options>
                        </v-col>
                    </v-row>

                    <v-row class="cust-row" no-gutters>
                        <v-col>
                            <Content @added="addProduct"></Content>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="pa-0">
                            <Footer></Footer>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-dialog v-model="dialog" content-class="basket-wrap">

                <div class="nav-wrap">
                    <router-link to="/profile">
                        Profile
                    </router-link>

                    <span class="ml-11">
                        Basket({{ $store.state.basket.products.length }})
                    </span>
                </div>

                <template v-if="$store.state.basket.products.length > 0">

                    <div class="price-wrap">
                        <div class="price-row title">
                            <span>Total</span>
                        </div>

                        <div class="price-row">
                            <span>Subtotal:</span>
                            <span>${{ $store.state.basket.subtotal }}</span>
                        </div>

                        <div class="price-row">
                            <span>Sale:</span>
                            <span>${{ ($store.state.basket.subtotal - $store.state.basket.total).toFixed(2) }}</span>
                        </div>

                        <div class="price-row">
                            <span>Content</span>
                            <span class="empty-basket-button" @click="emptyBasket">Remove all</span>
                        </div>
                    </div>

                    <div class="total-wrap">
                        <span>Order total:</span>
                        <span>${{ $store.state.basket.total }}</span>
                    </div>

                    <div class="items-wrap">
                        <div
                            v-if="$store.state.basket.products.length > 0"
                            class="item-wrap"
                            v-for="item in $store.state.basket.products"
                            :key="item.id"
                        >
                            <img :src="item.imgUrl" alt="" width="100" height="100">

                            <div class="description-wrap">
                                <span>{{ item.title }}</span>
                                <span>${{ item.salePrice }}</span>
                                <span @click="deleteItem(item.id)">Remove</span>
                            </div>
                        </div>
                    </div>

                    <v-btn>
                        Checkout

                        <v-icon size="16">
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
                </template>

                <template v-else>
                    <div class="empty-wrap">
                        Basket is empty
                    </div>
                </template>
            </v-dialog>
        </v-main>
    </v-app>
</template>

<script>
import './Catalog.scss'
import products from "@/mixins/products";

export default {
    name: "Catalog",
    mixins: [products]
}
</script>