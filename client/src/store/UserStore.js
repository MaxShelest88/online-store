import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    //   mobx будет следить за изменениями этих переменных
    //   и при изменении компоненты будут перерендываться
    makeAutoObservable(this);
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  //   computed функции
  // вызываюстя в том случае, когда переменная, которая используется внутри была изменена
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
