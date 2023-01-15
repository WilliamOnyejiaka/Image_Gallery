
class LocalStorage {
  static setValue(name:string, value:string):void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  static getValue(name:string):any {
    return JSON.parse(localStorage.getItem(name)!);
  }
}

export default LocalStorage;
