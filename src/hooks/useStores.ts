import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";
import stores from "~/stores";

export default function useStores() {
  return useContext(MobXProviderContext) as typeof stores;
}