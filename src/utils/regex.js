export const escapeRegExpString = (str) =>
    (str && str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) || "";

export const searchTest = (key, testString, props = "ig") =>
    new RegExp(key, props).test(testString);
