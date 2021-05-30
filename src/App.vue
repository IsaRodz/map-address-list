<template>
  <div class="app-container">
    <sidebar>
      <app-header
        :places="places"
        @pick-suggestion="addPlace"
        @click-menu="onClickMenu"
      />
      <div v-if="!isMobile" class="p-3">
        <place-detail
          v-if="selectedPlace.place_id"
          :selected-place="selectedPlace"
          :is-mobile="isMobile"
          @press-back="selectedPlace = {}"
        />
        <places-list v-else :places="places" @click-place="onClickPlace" />
      </div>
    </sidebar>
    <gmap-map :center="mapCenter" :zoom="14" style="flex: 1">
      <gmap-marker
        v-for="place of places"
        :key="place.place_id"
        :position="place.geometry.location"
        @click="onClickPlace(place)"
        :icon="icon"
      />
    </gmap-map>
    <vue-bottom-sheet ref="list" :overlay="false" max-height="50%">
      <places-list :places="places" @click-place="onClickPlace" />
    </vue-bottom-sheet>
    <vue-bottom-sheet ref="detail" :overlay="false">
      <place-detail :selected-place="selectedPlace" :is-mobile="isMobile" />
    </vue-bottom-sheet>
  </div>
</template>

<script>
  import VueBottomSheet from '@webzlodimir/vue-bottom-sheet';
  import Sidebar from './components/Sidebar';
  import AppHeader from './components/Header';
  import PlaceDetail from './components/PlaceDetail.vue';
  import PlacesList from './components/PlacesList.vue';
  import icon from './assets/icon.png';

  export default {
    name: 'App',
    components: {
      Sidebar,
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
        isMobile: false,
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
        if (this.isMobile) {
          this.$refs.detail.open();
        }
      },
      onClickMenu() {
        this.$refs.list.open();
      },
    },
    mounted() {
      if (window.innerWidth < 768) {
        this.isMobile = true;
      }
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth < 768;
      });
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
