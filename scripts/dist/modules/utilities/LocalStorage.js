class LocalStorage {
    static setValue(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }
    static getValue(name) {
        return JSON.parse(localStorage.getItem(name));
    }
}
export default LocalStorage;
