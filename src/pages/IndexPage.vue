<template>
  <q-page padding>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();

//userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://quasar.dev/",
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
</script>
