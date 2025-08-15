import { useAppDispatch, useAppSelector } from "./redux";
import {
  setActiveMenu,
  toggleCollapsed,
  setCollapsed,
  updateUser,
} from "../store/sidebarSlice";

export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector((state) => state.sidebar);

  const handleMenuClick = (menu: string) => {
    dispatch(setActiveMenu(menu));
  };

  const handleToggleCollapsed = () => {
    dispatch(toggleCollapsed());
  };

  const handleSetCollapsed = (collapsed: boolean) => {
    dispatch(setCollapsed(collapsed));
  };

  const handleUpdateUser = (userData: Partial<typeof sidebar.user>) => {
    dispatch(updateUser(userData));
  };

  return {
    ...sidebar,
    handleMenuClick,
    handleToggleCollapsed,
    handleSetCollapsed,
    handleUpdateUser,
  };
};
