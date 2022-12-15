import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);

  const expiresIn = ref(null);

  const access = async () => {
    try {
      const res = await api.post("/auth/login", {
        email: "alberto4@test.com",
        password: "123123",
      });
      console.log(res.data);

      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;

      localStorage.setItem("user", true);

      setTime();
    } catch (e) {
      console.log(e);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");

      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;

      localStorage.setItem("user", true);

      setTime();
    } catch (e) {
      console.log(e);
      localStorage.removeItem("user");
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 600);
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (e) {
      console.log(e);
    } finally {
      resetStore();
      localStorage.removeItem("user");
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  return { token, expiresIn, access, refreshToken, logout };
});
