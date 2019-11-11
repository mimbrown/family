import axios from 'axios';

export default class DataStore {
  constructor (cfg) {
    this.loadCount = 0;
    Object.assign(this, cfg);
  }
  getData (fresh) {
    if (this.data && !fresh && !this.stale) {
      return this.data;
    }
    return this.load();
  }
  async load () {
    delete this.stale;
    const { data } = await axios.get(this.url, this.config);
    this.data = data;
    return data;
  }

  get url () {
    return this._url;
  }

  set url (url) {
    this._url = url;
    this.stale = true;
  }
}
