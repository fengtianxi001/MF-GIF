<template>
  <div class="base-logo">
    <img :src="logo_image" alt="logo" />
    <span class="name">MF-GIF</span>
  </div>
</template>
<script setup lang="ts">
  import logo_image from "@/assets/images/logo.png"
</script>
<style lang="scss" scoped>
  @import "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap";

  .base-logo {
    display: flex;
    align-items: center;

    img {
      width: 28px;
      height: 28px;
      margin-right: 8px;
    }

    .name {
      color: var(--color-text-1);
      font-weight: bold;
      font-size: 24px;
      font-family: "Permanent Marker", cursive;
    }
  }
</style>
