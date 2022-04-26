import useStores from "./useStores";

export default function useConfig() {
  const { config } = useStores();
  return config;
}