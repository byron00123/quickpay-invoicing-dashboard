import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  companyName: string;
  logoUrl: string;
  brandColor: string;
}

const initialState: SettingsState = {
  companyName: "",
  logoUrl: "",
  brandColor: "#3b82f6",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCompanyName(state, action: PayloadAction<string>) {
      state.companyName = action.payload;
    },
    setLogo(state, action: PayloadAction<string>) {
      state.logoUrl = action.payload;
    },
    setBrandColor(state, action: PayloadAction<string>) {
      state.brandColor = action.payload;
    },
  },
});

export const { setCompanyName, setLogo, setBrandColor } =
  settingsSlice.actions;

export default settingsSlice.reducer;
