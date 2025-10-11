import { useContext } from "react";
import { MouseMenuItemContext } from "../../components/composites/MouseMenu/Context/MouseMenuItemContext";

export const useMouseMenuItem = () => {
  return useContext(MouseMenuItemContext);
};
