import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";

export async function REM(): Promise<CommandResult> {
  return { type: commandType.DEFAULT, value: null };
}
