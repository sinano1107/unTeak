export class Now {
  uid: string;
  campusId: number;

  constructor(uid: string, campusId: number) {
    this.uid = uid;
    this.campusId = campusId;
  }

  deserialize() {
    let obj = Object.freeze({uid: this.uid, campusId: this.campusId});
    return Object.assign({}, obj);
  }
}
