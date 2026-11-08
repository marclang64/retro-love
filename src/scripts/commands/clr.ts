import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";
import * as storage from "../app/storage";

export async function CLR(): Promise<CommandResult> {
  storage.clearVariableStorage();

  return { type: commandType.DEFAULT, value: null };
}
