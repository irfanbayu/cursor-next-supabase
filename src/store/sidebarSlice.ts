import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  activeMenu: string;
  isCollapsed: boolean;
  user: {
    name: string;
    avatar?: string;
  };
}

const initialState: SidebarState = {
  activeMenu: "overview",
  isCollapsed: false,
  user: {
    name: "Irfan Bayu",
    avatar: undefined,
  },
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    toggleCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<SidebarState["user"]>>
    ) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setActiveMenu, toggleCollapsed, setCollapsed, updateUser } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
