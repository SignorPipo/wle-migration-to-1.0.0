import { Globals } from "../../pp/globals";

export function isMobile(engine = Globals.getMainEngine()) {
    return /Mobi/i.test(Globals.getWindow(engine).navigator.userAgent);
}

export function isDesktop(engine = Globals.getMainEngine()) {
    return !isMobile(engine);
}

export let BrowserUtils = {
    isMobile,
    isDesktop
};