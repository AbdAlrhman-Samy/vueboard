import { ref, watchEffect, type Ref, toValue } from "vue";

export const useFetch = <T>(url: string): Response<T> => {
  const data = ref<any>(null);
  const error = ref<T | null>(null);
  const isLoading = ref<boolean>(false);
  // Used to cancel the fetch request (I'll use it when component is unmounted)
  let controller: AbortController | null = null;

  controller = new AbortController();
  isLoading.value = true;

  fetch(toValue(url), { signal: controller.signal })
    .then((res) => res.json())
    .then((res) => {
      data.value = res;
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      isLoading.value = false;
    });

  const cancel = () => {
    if (controller) {
      controller.abort();
      console.log("Fetch aborted");
    }
  };

  return {
    data,
    error,
    isLoading,
    cancel,
  };
};

interface Response<T> {
  data: Ref<T | null>;
  error: Ref<any>;
  isLoading: Ref<boolean>;
  cancel: () => void;
}
