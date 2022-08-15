<template>
    <div class="content-wrap">
        <template v-if="$store.state.loading">
            <span class="content-title">
                Total:

                <v-progress-circular
                    v-if="$store.state.loading"
                    indeterminate
                    :size="30"
                    width="5"
                    color="primary"
                    class="ml-2"
                ></v-progress-circular>
            </span>
        </template>

        <template v-else>
            <span class="content-title">
                Total: {{ $store.state.sortedProducts.length }}
            </span>
        </template>

        <div class="items-wrap">
            <div
                v-if="$store.state.sortedProducts.length > 0"
                class="item-wrap"
                v-for="item in  $store.state.sortedProducts"
                :key="item.id"
            >
                <img :src="item.imgUrl" alt="">

                <div v-if="item.sale" class="sale-wrap">
                    Sale -{{ item.sale }}%
                </div>

                <span class="item-title">{{ item.title }}</span>

                <div class="item-price">
                    <span class="default">${{ item.salePrice }}</span>

                    <span v-if="item.sale" style='color:#000000;text-decoration:line-through'>
                        <span class="sale">${{ item.price }}</span>
                    </span>
                </div>

                <template v-if="$store.state.basket.length > 0 && $store.state.basket.find((product) => product.id === item.id)">
                    <v-btn @click="itemClicked(item)" class="added" outlined>
                        <span>
                            Added
                        </span>

                        <v-icon size="16" class="ml-auto" color="#000000">
                            mdi-check
                        </v-icon>
                    </v-btn>
                </template>

                <template v-else>
                    <v-btn @click="itemClicked(item)" class="not-added">
                        <span>
                            Add to basket
                        </span>

                        <v-icon size="16" class="ml-auto" color="#FFFFFF">
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import './Content.scss'

export default {
    name: "Content",
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        itemClicked( item ) {

            this.$emit( 'added', item );
        }
    }
}
</script>
