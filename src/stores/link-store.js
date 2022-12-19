import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
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
    }
  };

  const getLinks = async () => {
    try {
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
    }
  };

  getLinks();

  return { createLink, links };
});
