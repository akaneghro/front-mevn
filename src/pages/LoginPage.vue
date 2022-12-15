<template>
  <div>
    <h3>Login {{ userStore.token }}</h3>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
</script>
