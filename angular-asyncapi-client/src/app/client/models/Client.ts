class Client {
  private _id?: string;

  constructor(id?: string, publisher_id?: string) {
    this._id = id;
    this._publisher_id = publisher_id;
  }

  get id(): string | undefined {
    return this._id;
  }
  set id(id: string | undefined) {
    this._id = id;
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
      id: this.id,
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): Client {
    let result: Client = new Client();

    try {
      result.id = value['id'];
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default Client;
