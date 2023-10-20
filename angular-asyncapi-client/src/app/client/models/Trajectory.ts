import Point from './Point';
class Trajectory {
  private _points?: Point[];

  constructor(points?: Point[], publisher_id?: string) {
    this._points = points;
    this._publisher_id = publisher_id;
  }

  get points(): Point[] | undefined {
    return this._points;
  }
  set points(points: Point[] | undefined) {
    this._points = points;
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
      points: this.points,
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): Trajectory {
    let result: Trajectory = new Trajectory();

    try {
      result.points = value['points'];
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default Trajectory;
