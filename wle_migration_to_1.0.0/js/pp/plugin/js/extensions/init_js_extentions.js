import { initArrayExtension } from "./array_extension"
import { initMathExtension } from "./math_extension"

export function initJSExtensions() {
    initMathExtension();
    initArrayExtension();
}