import Client from './Client';
import Point from './Point';
class MovedObject {
  private _client?: Client;
  private _error?: boolean;
  private _content?: Point;

  constructor(
    client?: Client,
    error?: boolean,
    content?: Point,
    publisher_id?: string
  ) {
    this._client = client;
    this._error = error;
    this._content = content;
    this._publisher_id = publisher_id;
  }

  get client(): Client | undefined {
    return this._client;
  }
  set client(client: Client | undefined) {
    this._client = client;
  }

  get error(): boolean | undefined {
    return this._error;
  }
  set error(error: boolean | undefined) {
    this._error = error;
  }

  get content(): Point | undefined {
    return this._content;
  }
  set content(content: Point | undefined) {
    this._content = content;
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
      client: this.client?.toJSON(),
      error: this.error,
      content: this.content?.toJSON(),
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): MovedObject {
    let result: MovedObject = new MovedObject();

    try {
      result.client = Client.from_json(value['client']);
      result.error = value['error'];
      result.content = Point.from_json(value['content']);
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default MovedObject;
