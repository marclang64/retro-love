import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";
import { dom } from "../ui/dom";

export async function EXIT(): Promise<CommandResult> {
  dom.startupScreen();

  return { type: commandType.DEFAULT, value: null };
}
