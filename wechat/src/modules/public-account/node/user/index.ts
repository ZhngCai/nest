/** @format */

// 问卷用户
class SuvUser {
  info: CFQueryParams;
  constructor() {
    this.info = { sid: "" };
  }
  init() {
    this.info = { sid: "" };
  }
  setInfo(params: CFQueryParams) {
    this.info = params;
  }
}

const User = new SuvUser();
export default User;
