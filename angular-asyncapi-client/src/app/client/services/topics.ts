import { CommandObject, MetaInfoObject, MovedObject } from "../models";

export const METAINFO_TOPIC = 'metainfo';
export const ROBOT_NAME_COMMANDS_TOPIC = 'ROBOT_NAME_commands';
export const ROBOT_NAME_MOVED_TOPIC = 'ROBOT_NAME_moved';

export const ALL_TOPICS:any[][] = [
  [METAINFO_TOPIC,MetaInfoObject],
  [ROBOT_NAME_COMMANDS_TOPIC,CommandObject],
  [ROBOT_NAME_MOVED_TOPIC, MovedObject]
];
