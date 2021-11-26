/** @format */

import { I18n, Core, EventHub } from "@choiceform/os-client-core";
import { nodeEnvApp } from "./env/app";
import { nodeEnvSystem } from "./env/system";
import { nodeEnvNetWork } from "./env/network";
import { nodeEnvStorage } from "./env/storage";
import User from "./user";

// 配置浏览器环境相关的工具
Core.registerEnv({
  name: ENV_NAME.NODE,
  app: nodeEnvApp,
  system: nodeEnvSystem,
  network: nodeEnvNetWork,
  storage: nodeEnvStorage,
});

export { I18n, Core, EventHub, User };
