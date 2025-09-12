import api from "../AxiosSetup/axiosSetUp";
import { SettingsType, UpdateSettinType } from "../types/types";
import { errorHandler } from "../AxiosSetup/axiosSetUp";
async function getSettings() {
  const res = await api.get("/settings");
  return res.data.settings[0] as SettingsType;
}

// We expect a newSetting object that looks like {setting: newValue}
async function updateSetting(newSetting: UpdateSettinType) {
  const res = await api.patch(`/settings/${newSetting._id}`, newSetting);
  return res.data.settings[0] as SettingsType;
}

export const getSettingsData = errorHandler(getSettings);
export const updateSettingsData = errorHandler(updateSetting);
