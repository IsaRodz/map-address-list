<template>
  <div class="app-container">
    <app-header @pick-suggestion="addPlace" @click-menu="onClickMenu" />
    <gmap-map :center="mapCenter" :zoom="14" style="flex: 1">
      <gmap-marker
        v-for="place of places"
        :key="place.place_id"
        :position="place.geometry.location"
        @click="onClickPlace(place)"
        :icon="icon"
      />
    </gmap-map>
    <vue-bottom-sheet ref="list" :overlay="false">
      <places-list :places="places" @click-place="onClickPlace" />
    </vue-bottom-sheet>
    <vue-bottom-sheet ref="detail" :overlay="false">
      <place-detail :selected-place="selectedPlace" />
    </vue-bottom-sheet>
  </div>
</template>

<script>
  import VueBottomSheet from '@webzlodimir/vue-bottom-sheet';
  import AppHeader from './components/Header';
  import PlaceDetail from './components/PlaceDetail.vue';
  import PlacesList from './components/PlacesList.vue';
  import icon from './assets/icon.png';

  export default {
    name: 'App',
    components: {
      AppHeader,
      VueBottomSheet,
      PlaceDetail,
      PlacesList,
    },
    data() {
      return {
        icon,
        selectedPlace: {},
        bottomSheet: null,
        places: [],
        mapCenter: {
          lat: -12.046374,
          lng: -77.042793,
        },
      };
    },
    methods: {
      addPlace(place) {
        if (place && place.place_id) {
          const alreadyAdded = this.places.some(x => x.place_id === place.place_id);

          if (!alreadyAdded) {
            this.places.push(place);
            this.mapCenter = place.geometry.location;
          } else {
            this.$buefy.snackbar.open({
              message: 'Esta dirección ya estaba guardada',
              type: 'is-warning',
            });
          }
        }
      },
      onClickPlace(place) {
        this.mapCenter = place.geometry.location;
        this.selectedPlace = place;
        this.$refs.detail.open();
      },
      onClickMenu() {
        this.$refs.list.open();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .app-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
