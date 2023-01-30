// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
/// <reference path = "../../types/index.d.ts" />

import * as fs from "fs";

window.fs = fs;

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  const alist = document.querySelectorAll("a");

  alist.forEach(ele => {
    ele.target = "_self";
  });
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
