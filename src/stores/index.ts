import { useStaticRendering } from "mobx-react-lite";
import RootStore from "./RootStore";

if (process.env.SSR) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useStaticRendering(true);
}

const stores = new RootStore();

export default stores;
