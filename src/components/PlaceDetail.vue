<template>
  <div>
    <div class="media is-align-items-center">
      <figure class="media-right">
        <div class="image is-64x64">
          <img src="../assets/place.png" alt="" />
        </div>
      </figure>
      <div class="media-content ml-3">
        <h1 class="is-capitalized is-size-4 is-size-5-mobile">
          {{ selectedPlace.title }}
        </h1>
        <p class="is-size-7-mobile">{{ selectedPlace.formatted_address }}</p>
      </div>
    </div>
    <div class="grid col-4">
      <div class="badge has-background-warning"></div>
      <div class="badge has-background-danger"></div>
      <div class="badge is-teal"></div>
      <div class="badge has-background-light"></div>
    </div>
    <grid class="grid col-2">
      <div class="badge has-background-light"></div>
      <div class="badge has-background-light"></div>
    </grid>
  </div>
</template>

<script>
  export default {
    props: {
      selectedPlace: {
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    margin: 26px 10px;
    gap: 7px;
    &.col-4 {
      grid-template-columns: repeat(4, 1fr);
    }
    &.col-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .badge {
    height: 35px;
    width: 100%;
  }

  .is-teal {
    background: #009688;
  }
</style>
