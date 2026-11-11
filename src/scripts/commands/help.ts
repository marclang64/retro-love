import type { CommandResult } from "../types/command";
import { commandType } from "../app/constants";
import { dom } from "../ui/dom";

export async function HELP(): Promise<CommandResult> {
  const chr = (code: number) => String.fromCharCode(code);

  const heading = (text: string) => `${chr(31)}${chr(312)} ${text} ${chr(319)}`;

  dom.clearOutput();

  const output = [
    heading("RETRO LOVE BASIC - HELP"),
    "",
    heading("COMMANDS"),
    "PRINT  - DISPLAY TEXT OR VALUES",
    "LET    - ASSIGN A VARIABLE",
    "INPUT  - REQUEST USER INPUT",
    "IF     - CONDITIONAL EXECUTION",
    "GOTO   - JUMP TO A PROGRAM LINE",
    "LIST   - SHOW STORED PROGRAM",
    "RUN    - EXECUTE STORED PROGRAM",
    "NEW    - CLEAR STORED PROGRAM AND VARIABLES",
    "CLR    - CLEAR STORED VARIABLES",
    "REM    - ADD COMMENT",
    "LOAD   - LOAD A BASIC PROGRAM",
    "EXIT   - RETURN TO STARTUP SCREEN",
    "HELP   - DISPLAY THIS HELP",
    "",
    heading("PROGRAMMING"),
    "USE LINE NUMBERS TO STORE COMMANDS.",
    "ENTER COMMANDS WITHOUT LINE NUMBERS",
    "TO EXECUTE THEM IMMEDIATELY.",
    "PRESS CTRL+C TO INTERRUPT A PROGRAM.",
    "",
    heading("PETSCII"),
    "CHR$(147) - CLEAR SCREEN",
    "CHR$(28)  - RED TEXT",
    "",
    heading("RETRO LOVE EXTENSIONS"),
    "CHR$(256) - OPEN CENTERED CONTAINER",
    "CHR$(257) - CLOSE CONTAINER",
    "CHR$(301-316) - BACKGROUND COLORS",
    "CHR$(317) - RESET BACKGROUND",
    "CHR$(318) - RESET TEXT COLOR",
    "CHR$(319) - RESET BOTH COLORS",
    "",
  ].join("\n");

  dom.outputLine(output);

  return { type: commandType.DEFAULT, value: null };
}
