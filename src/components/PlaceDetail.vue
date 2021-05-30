<template>
  <div class="container">
    <div class="media is-align-items-center mb-5">
      <div v-if="!isMobile" class="back-button" @click="goBack">
        <feather type="arrow-left-circle"></feather>
      </div>
      <figure class="media-right" :class="{ 'ml-0': !isMobile }">
        <div class="image is-64x64">
          <img src="../assets/place.png" alt="" />
        </div>
      </figure>
      <div class="media-content" :class="{ 'ml-3': isMobile }">
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
    <div class="grid col-2">
      <div class="badge has-background-light"></div>
      <div class="badge has-background-light"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectedPlace: {
        required: true,
      },
      isMobile: {
        default: false,
      },
    },
    methods: {
      goBack() {
        this.$emit('press-back');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
  }
  .grid {
    display: grid;
    margin: 7px 0;
    gap: 7px;
    &.col-4 {
      grid-template-columns: repeat(4, 1fr);
    }
    &.col-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .back-button {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .badge {
    height: 35px;
    width: 100%;
  }

  .is-teal {
    background: #009688;
  }
</style>
