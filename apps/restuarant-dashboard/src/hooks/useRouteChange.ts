import { useAtom } from "jotai";
import { activeItem } from "../app/configs/constants";

const useRouteChange = () => {
  const [activeRoute, setActiveRoute] = useAtom(activeItem);
  return { activeRoute, setActiveRoute };
};
export default useRouteChange;
