<template>
  <ul v-if="places.length > 0" class="places-list">
    <h1 class="is-size-5 is-size-6-mobile mb-2">Lugares guardados</h1>
    <li v-for="place of places" :key="place.place_id" @click="handleClick(place)">
      <span class="is-size-7-mobile">{{ place.formatted_address }}</span>
    </li>
  </ul>
  <div v-else class="has-text-centered has-text-grey p-5">
    <feather type="archive"></feather>
    <p class="mt-2">No hay lugares para mostrar</p>
  </div>
</template>

<script>
  export default {
    props: {
      places: {
        required: true,
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handleClick(place) {
        this.$emit('click-place', place);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .places-list {
    list-style: none;
    padding: 0;

    li {
      padding: 10px 0;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      }
    }
  }
</style>
