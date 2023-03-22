export let ExtensionUtils = {
    assignProperties: function (fromReference, toReference, enumerable = false, writable = true, configurable = true) {
        let ownPropertyNames = Object.getOwnPropertyNames(fromReference);
        for (let ownPropertyName of ownPropertyNames) {
            Object.defineProperty(toReference, ownPropertyName, {
                value: fromReference[ownPropertyName],
                enumerable: enumerable,
                writable: writable,
                configurable: configurable
            });
        }
    }
};