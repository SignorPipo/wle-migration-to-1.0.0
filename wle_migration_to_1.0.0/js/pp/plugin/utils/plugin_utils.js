import { JSUtils } from "../../cauldron/js/utils/js_utils";

export function injectProperties(fromReference, toReference, enumerable = true, writable = true, configurable = true, keepOriginalDescriptorAttributes = true, bindThisAsFirstParam = false, prefix = null) {
    let ownPropertyNames = Object.getOwnPropertyNames(fromReference);
    for (let ownPropertyName of ownPropertyNames) {
        let enumerableToUse = enumerable;
        let writableToUse = writable;
        let configurableToUse = configurable;

        if (keepOriginalDescriptorAttributes) {
            let originalDescriptor = Object.getOwnPropertyDescriptor(toReference, ownPropertyName);
            if (originalDescriptor != null) {
                enumerableToUse = originalDescriptor.enumerable;
                writableToUse = originalDescriptor.writable;
                configurableToUse = originalDescriptor.configurable;
            }
        }

        let adjustedPropertyName = ownPropertyName;
        if (prefix != null) {
            if (adjustedPropertyName.length > 0 && adjustedPropertyName[0] == adjustedPropertyName[0].toUpperCase()) {
                adjustedPropertyName = prefix.toUpperCase() + adjustedPropertyName;
            } else {
                adjustedPropertyName = prefix + adjustedPropertyName;
            }
        }

        let adjustedProperyValue = fromReference[ownPropertyName];
        if (bindThisAsFirstParam && JSUtils.isFunction(adjustedProperyValue)) {
            let originalFunction = fromReference[ownPropertyName];
            adjustedProperyValue = function () {
                return originalFunction(this, ...arguments);
            }

            Object.defineProperty(adjustedProperyValue, "name", {
                value: adjustedPropertyName
            });
        }

        Object.defineProperty(toReference, adjustedPropertyName, {
            value: adjustedProperyValue,
            enumerable: enumerableToUse,
            writable: writableToUse,
            configurable: configurableToUse
        });
    }
}

export let PluginUtils = {
    injectProperties
};