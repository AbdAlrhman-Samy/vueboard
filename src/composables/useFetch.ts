import { ref, type Ref } from "vue";

export const useFetch = <T>(url: string): Response<T> => {
  const data = ref<any>(null);
  const error = ref<T | null>(null);
  const isLoading = ref<boolean>(false);
  let controller: AbortController | null = null;


  const fetchData = async (url: string) => {
    controller = new AbortController();
    isLoading.value = true;

    await fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        data.value = res;
        error.value = null;
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          error.value = err;
          console.log("useFetch Error: ", err);
        }
      })
      .finally(() => {
        isLoading.value = false;
      });

    controller = null;
  };

  // Used for pagination (Should there be a better way?)
  const refetch = (refetchUrl: string) => {
    isLoading.value = true;
    fetchData(refetchUrl);
  };

  // Used to cancel the fetch request when the component is unmounted (Do I need this?)
  const cancel = () => {
    if (controller) {
      controller.abort();
    }
  };

  fetchData(url);

  return {
    data,
    error,
    isLoading,
    cancel,
    refetch,
  };
};

interface Response<T> {
  data: Ref<T | null>;
  error: Ref<any>;
  isLoading: Ref<boolean>;
  cancel: () => void;
  refetch: (url: string) => void;
}
