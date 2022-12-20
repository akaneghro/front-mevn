<template>
  <q-card class="q-mt-md">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions>
      <q-btn
        flat
        round
        icon="mdi-trash-can-outline"
        color="red"
        @click="deleteLink(link._id)"
      ></q-btn>
      <q-btn
        flat
        round
        icon="mdi-pencil-outline"
        @click="updateLink(link)"
      ></q-btn>
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)">COPY</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store.js";
import { useQuasar } from "quasar";
import { useNotify } from "../composables/notify.js";

const useLink = useLinkStore();

const $q = useQuasar();

const { errorNotify, successNotify } = useNotify();

defineProps({
  link: Object,
});

const deleteLink = async (_id) => {
  $q.dialog({
    title: "Eliminar",
    message: "Quieres eliminar el enlace?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useLink.removeLink(_id);
      successNotify("Link eliminado");
    } catch (e) {
      console.log(e);
      errorNotify(e.message);
    }
  });
};

const updateLink = (link) => {
  $q.dialog({
    title: "Editar",
    message: "Introduce el nuevo enlace",
    prompt: {
      model: link.longLink,
      type: "text",
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    try {
      const newLink = { ...link, longLink: data };
      await useLink.updateLink(newLink);
      successNotify("Link actualizado");
    } catch (e) {
      console.log(e);
      errorNotify(e.message);
    }
  });
};

const copyLink = async (nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}/${nanoLink}`;
    await navigator.clipboard.writeText(path);
    successNotify("Se ha copiado el Link");
  } catch (e) {
    console.log(e);
    errorNotify(e.message);
  }
};
</script>
