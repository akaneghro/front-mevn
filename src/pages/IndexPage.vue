<template>
  <q-page padding>
    <AddLink></AddLink>
    <div v-for="link in useLink.links" :key="link._id">
      <LinkCard :link="link"></LinkCard>
    </div>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";

const useLink = useLinkStore();
</script>
