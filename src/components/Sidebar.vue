<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .sidebar {
    background: #212121;
    color: #f9f9f9;

    @media (min-width: 768px) {
      width: 300px;
    }
  }
</style>
