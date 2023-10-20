import CommandsSignal from './CommandsSignal';
import Client from './Client';
import Point from './Point';
import Trajectory from './Trajectory';
class CommandObject {
  private _signal: CommandsSignal;
  private _client?: Client;
  private _error?: boolean;
  private _point?: Point;
  private _trajectory?: Trajectory;

  constructor(
    signal: CommandsSignal = CommandsSignal.ARM_CHECK_STATUS,
    client?: Client,
    error?: boolean,
    point?: Point,
    trajectory?: Trajectory,
    publisher_id?: string
  ) {
    this._signal = signal;
    this._client = client;
    this._error = error;
    this._point = point;
    this._trajectory = trajectory;
    this._publisher_id = publisher_id;
  }

  get signal(): CommandsSignal {
    return this._signal;
  }
  set signal(signal: CommandsSignal) {
    this._signal = signal;
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

  get point(): Point | undefined {
    return this._point;
  }
  set point(point: Point | undefined) {
    this._point = point;
  }

  get trajectory(): Trajectory | undefined {
    return this._trajectory;
  }
  set trajectory(trajectory: Trajectory | undefined) {
    this._trajectory = trajectory;
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
      client: this.client?.toJSON(),
      error: this.error,
      point: this.point?.toJSON(),
      trajectory: this.trajectory?.toJSON(),
      publisher_id: this.publisher_id,
    };
  }

  public static from_json(value: any): CommandObject {
    let result: CommandObject = new CommandObject();

    try {
      result.signal = value['signal'];
      result.client = Client.from_json(value['client']);
      result.error = value['error'];
      result.point = Point.from_json(value['point']);
      result.trajectory = Trajectory.from_json(value['trajectory']);
      result.publisher_id = value['publisher_id'];
    } catch (_) {}

    return result;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
export default CommandObject;
