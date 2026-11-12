import { LOAD } from "../commands/load";
import { RUN } from "../commands/run";
import { commandType } from "./constants";
import { dom } from "../ui/dom";

export async function startApp(): Promise<void> {
  const program = import.meta.env.PROD ? "website" : "dev";
  const result = await LOAD(`"${program}"`);

  if (result.type === commandType.ERROR) {
    return;
  }

  const runResult = await RUN();

  if (runResult.type !== commandType.EXIT) {
    dom.resetInput(true);
  }
}
