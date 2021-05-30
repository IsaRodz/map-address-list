<template>
  <div ref="map"></div>
</template>

<script>
  import { Loader } from '@googlemaps/js-api-loader';
  const GOOGLE_MAP_KEY = 'AIzaSyDHLHpUVR6850QajwNW4NjKJc9K4_QZQIg';

  export default {
    data() {
      return {
        map: null,
        geocoder: null,
        lat: -12.046374,
        lng: -77.042793,
      };
    },
    methods: {
      getUserLocation() {
        const onSuccess = position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        };
        const onError = error => {
          console.log(error);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      },
      geocode(address) {
        this.geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            this.map.setCenter(results[0].geometry.location);

            new google.maps.Marker({
              position: results[0].geometry.location,
              map: this.map,
              title: results[0].formatted_address,
            });
          }
        });
      },
    },
    async beforeMount() {
      this.getUserLocation();
      const loader = new Loader({
        apiKey: GOOGLE_MAP_KEY,
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        await loader.load();

        this.map = new google.maps.Map(this.$refs.map, {
          center: {
            lat: this.lat,
            lng: this.lng,
          },
          zoom: 14,
        });

        this.geocoder = new google.maps.Geocoder();
      } catch (e) {
        console.log(e);
      }
    },
  };
</script>

<style scoped>
  div {
    flex: 1;
  }
</style>
