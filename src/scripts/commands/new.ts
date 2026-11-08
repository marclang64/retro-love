import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";
import * as storage from "../app/storage";

export async function NEW(): Promise<CommandResult> {
  storage.clearAllStorage();

  return { type: commandType.DEFAULT, value: null };
}
