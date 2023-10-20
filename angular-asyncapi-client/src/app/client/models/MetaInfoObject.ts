import MetaInfoSignal from './MetaInfoSignal';
import JointInfo from './JointInfo';
class MetaInfoObject {
  private _signal: MetaInfoSignal;
  private _reservedName?: string;
  private _joints?: JointInfo[];

  constructor(
    signal: MetaInfoSignal = MetaInfoSignal.ARM_GET_METAINFO,
    reservedName?: string,
    joints?: JointInfo[],
    publisher_id?: string
  ) {
    this._signal = signal;
    this._reservedName = reservedName;
    this._joints = joints;
    this._publisher_id = publisher_id;
  }

  get signal(): MetaInfoSignal {
    return this._signal;
  }
  set signal(signal: MetaInfoSignal) {
    this._signal = signal;
  }

  get reservedName(): string | undefined {
    return this._reservedName;
  }
  set reservedName(reservedName: string | undefined) {
    this._reservedName = reservedName;
  }

  get joints(): JointInfo[] | undefined {
    return this._joints;
  }
  set joints(joints: JointInfo[] | undefined) {
    this._joints = joints;
  }

  private _publisher_id?: string;

  get publisher_id(): string | undefined {
    return this._publisher_id;
  }

  set publisher_id(publisher_id: string | undefined) {
    this._publisher_id = publisher_id;
  }

  public toJSON() {
    return {
      signal: this.signal,
      reservedName: this.reservedName,
      joints: this.joints,
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): MetaInfoObject {
    let result: MetaInfoObject = new MetaInfoObject();

    try {
      result.signal = value['signal'];
      result.reservedName = value['reservedName'];
      result.joints = value['joints'];
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default MetaInfoObject;
