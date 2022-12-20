import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";
import { useQuasar } from "quasar";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();

  const $q = useQuasar();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      $q.loading.show();

      const res = await api({
        url: "/links",
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });

      links.value.push(res.data.newLink);
    } catch (e) {
      if (e.response) {
        throw e.response.data;
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("Error", e);
      }
    } finally {
      $q.loading.hide();
    }
  };

  const getLinks = async () => {
    try {
      $q.loading.show();

      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      links.value = res.data.links.map((item) => {
        return {
          longLink: item.longLink,
          nanoLink: item.nanoLink,
          _id: item._id,
        };
      });
    } catch (e) {
      if (e.response) {
        throw e.response.data;
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("Error", e);
      }
    } finally {
      $q.loading.hide();
    }
  };

  const removeLink = async (_id) => {
    try {
      $q.loading.show();

      await api({
        url: `links/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      links.value = links.value.filter((item) => item._id !== _id);
    } catch (e) {
      if (e.response) {
        throw e.response.data;
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("Error", e);
      }
    } finally {
      $q.loading.hide();
    }
  };

  const updateLink = async (newLink) => {
    try {
      $q.loading.show();

      await api({
        url: `links/${newLink._id}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink: newLink.longLink,
        },
      });

      links.value = links.value.map((item) =>
        item._id === newLink._id ? newLink : item
      );
    } catch (e) {
      if (e.response) {
        throw e.response.data;
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("Error", e);
      }
    } finally {
      $q.loading.hide();
    }
  };

  getLinks();

  return { createLink, removeLink, updateLink, links };
});
