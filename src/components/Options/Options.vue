<template>
    <div class="options-wrap">
        <div class="input-wrap">
            <span class="cust-input-title">
                Search
            </span>

            <v-text-field
                clearable
                @keyup="searchRequest"
                @click:clear="$store.state.searchInput = ''"
                hide-details
                solo
            ></v-text-field>
        </div>

        <div class="select-wrap">
            <span class="cust-select-title">
                Product category
            </span>

            <v-select
                v-model="$store.state.category"
                :items="$store.state.categories"
                @change="categoryTrigger"
                solo
                hide-details
                append-icon="mdi-chevron-down"
            ></v-select>
        </div>

        <div class="select-wrap">
            <span class="cust-select-title">
                Sale
            </span>

            <v-select
                v-model="$store.state.sale"
                :items="$store.state.saleOptions"
                @change="saleTrigger"
                solo
                hide-details
                append-icon="mdi-chevron-down"
            ></v-select>
        </div>

        <div class="select-wrap">
            <span class="cust-select-title">
                Sorting
            </span>

            <v-select
                v-model="$store.state.sort"
                :items="$store.state.sortOptions"
                @change="sortTrigger"
                solo
                hide-details
                append-icon="mdi-chevron-down"
            ></v-select>
        </div>

        <v-btn height="60" @click="applyFilters">
            Apply
        </v-btn>
    </div>
</template>

<script>
import './Options.scss'
import options from "@/mixins/options";

export default {
    name: "Options",
    mixins: [options]
}
</script>
