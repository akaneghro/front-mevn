<template>
  <q-page padding>
    <q-btn @click="access">Acceder</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} - {{ expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");

const expiresIn = ref("");

const access = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "alberto4@test.com",
      password: "123123",
    });
    console.log(res.data);

    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;

    setTime();
  } catch (e) {
    console.log(e);
  }
};

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

const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refresh");

    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (e) {
    console.log(e);
  }
};

const setTime = () => {
  setTimeout(() => {
    refreshToken();
  }, expiresIn.value * 1000 - 600);
};

refreshToken();
</script>
