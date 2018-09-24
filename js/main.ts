import "@babel/polyfill";
import "whatwg-fetch";
import Application from "./application";

/** Отладочный триггер */
const IS_DEBUG_MODE = true;

Application.start(IS_DEBUG_MODE);
