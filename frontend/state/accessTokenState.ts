import { atom } from "recoil";

export let accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
