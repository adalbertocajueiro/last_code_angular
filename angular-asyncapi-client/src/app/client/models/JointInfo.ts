class JointInfo {
  private _minimum?: number;
  private _maximum?: number;

  constructor(minimum?: number, maximum?: number, publisher_id?: string) {
    this._minimum = minimum;
    this._maximum = maximum;
    this._publisher_id = publisher_id;
  }

  get minimum(): number | undefined {
    return this._minimum;
  }
  set minimum(minimum: number | undefined) {
    this._minimum = minimum;
  }

  get maximum(): number | undefined {
    return this._maximum;
  }
  set maximum(maximum: number | undefined) {
    this._maximum = maximum;
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
      minimum: this.minimum,
      maximum: this.maximum,
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): JointInfo {
    let result: JointInfo = new JointInfo();

    try {
      result.minimum = value['minimum'];
      result.maximum = value['maximum'];
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default JointInfo;
