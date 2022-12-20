import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();

  const errorNotify = (message = "Error de Servidor") => {
    $q.notify({ message, color: "negative", icon: "report_problem" });
  };

  const successNotify = (message = "Éxito") => {
    $q.notify({ message, color: "green" });
  };

  const showNotify = (message = "Error de servidor", color = "negative") => {
    $q.notify({ message, color });
  };
  return { showNotify, errorNotify, successNotify };
};
