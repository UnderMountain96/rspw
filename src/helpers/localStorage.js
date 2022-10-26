export const saveLocalState = (key, data) => {
    try {
        const state = JSON.stringify(data);
        localStorage.setItem(key, state);
    } catch (error) {
        console.error("[error]", error);
    }
};

export const loadLocalState = (key) => {
    try {
        let loadedData = localStorage.getItem(key);
        if (loadedData) {
            return JSON.parse(loadedData);
        }
    } catch (error) {
        return null;
    }
    return null;
};

export const removeLocalState = (key) => {
    localStorage.removeItem(key);
};