/** @format */

export const nodeEnvStorage: CFEnvStorage = {
  set: (key: string, value: string): void => {
    return;
  },
  async setVital(key: string, value: string): Promise<void> {
    return;
  },
  get: (key: string): string => {
    return "";
  },
  async getVital(key: string): Promise<string> {
    return "";
  },
  remove: (key: string): void => {
    return;
  },
  async removeVital(key: string): Promise<void> {
    return;
  },
};
