class Point {
  private _coordinates?: number[];

  constructor(coordinates?: number[], publisher_id?: string) {
    this._coordinates = coordinates;
    this._publisher_id = publisher_id;
  }

  get coordinates(): number[] | undefined {
    return this._coordinates;
  }
  set coordinates(coordinates: number[] | undefined) {
    this._coordinates = coordinates;
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
      coordinates: this.coordinates,
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): Point {
    let result: Point = new Point();

    try {
      result.coordinates = value['coordinates'];
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default Point;
