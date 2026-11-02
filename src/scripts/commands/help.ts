import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";
import { dom } from "../ui/dom";

export async function HELP(): Promise<CommandResult> {
  let output = "TBD";
  dom.outputLine(output);

  return { type: commandType.DEFAULT, value: null };
}
