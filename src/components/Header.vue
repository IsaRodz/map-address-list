<template>
  <div class="header">
    <div class="row justify-between">
      <button>
        <feather type="arrow-left-circle"></feather>
      </button>
      <button @click="onClickMenu">
        <feather type="menu"></feather>
      </button>
    </div>
    <b-autocomplete
      v-model="address"
      :data="suggestions"
      :loading="loadingSuggestions"
      :open-on-focus="suggestions.length > 0"
      @typing="getSuggestions"
      @select="onSelectSuggestion"
      field="formatted_address"
      placeholder="Busca una dirección"
      clear-on-select
    >
      <template slot="empty">
        <p v-if="loadingSuggestions">Cargando...</p>
        <p v-else>No se encontraron resultados</p>
      </template>
    </b-autocomplete>
  </div>
</template>

<script>
  import useGeocode from '../useGeocode';
  import PlacesList from './PlacesList.vue';

  export default {
    components: { PlacesList },
    data() {
      return {
        address: '',
        suggestions: [],
        loadingSuggestions: false,
        timer: null,
      };
    },
    methods: {
      getSuggestions(address) {
        if (address) {
          if (this.timer) {
            clearTimeout(this.timer);
          }

          this.suggestions = [];
          this.loadingSuggestions = true;
          this.timer = setTimeout(async () => {
            try {
              const data = await useGeocode(address);
              if (data.status === 'OK') {
                this.suggestions = data.results;
              } else {
                this.suggestions = [];
              }
            } finally {
              this.loadingSuggestions = false;
            }
          }, 1000);
        }
      },
      onSelectSuggestion(place) {
        this.$emit('pick-suggestion', {
          ...place,
          title: this.address,
        });
        this.address = '';
      },
      onClickMenu() {
        this.$emit('click-menu');
      },
    },
  };
</script>

<style lang="scss">
  .header {
    background: #161616;
    color: #f9f9f9;
    padding: 1.25em;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    button {
      background: none;
      border: none;
      color: white;
      display: inline-flex;
      align-items: center;
    }

    input {
      width: 100%;
      border: none;
      border-radius: 0.25em;

      color: #fff;
      background: rgba(#fff, 0.1);
      box-shadow: none !important;
      &:focus {
        background: rgba(#fff, 0.16);
      }

      &::placeholder {
        color: #9a9a9a;
      }
    }
  }

  #places-list {
    display: none;
  }

  .row {
    display: flex;

    &.justify-between {
      justify-content: space-between;
    }
  }
</style>
