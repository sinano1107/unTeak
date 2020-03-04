export class Now {
  uid: string;
  campusId: number;
  time: number;

  constructor(uid: string, campusId: number, time: number) {
    this.uid = uid;
    this.campusId = campusId;
    this.time = time;
  }

  deserialize() {
    let obj = Object.freeze({uid: this.uid, campusId: this.campusId, time: this.time});
    return Object.assign({}, obj);
  }
}
