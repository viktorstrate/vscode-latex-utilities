import * as vscode from 'vscode';
import { toggleSelectedKeyword } from './textManipulation';

export default function commandsToRegister(): vscode.Disposable[] {

  // The commands have been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let commands: vscode.Disposable[] = [];

  const wrapperCommands = [
    [
      'textbf',
      'wrapBold'
    ], [
      'textit',
      'wrapItalic'
    ], [
      'underline',
      'wrapUnderline'
    ], [
      'emph',
      'wrapEmphasize'
    ]
  ];

  for (let cmd of wrapperCommands) {

    let newCommand = vscode.commands.registerCommand(`latex-utils.${cmd[1]}`, () => {
      toggleSelectedKeyword(cmd[0]);
    });

    commands.push(newCommand);
  }

  const wrapCustom = (outerBraces: boolean) => {
    return () => {
      vscode.window.showInputBox({
        placeHolder: "command",
        prompt: "Please enter the command to wrap"
      })
        .then(command => {
          if (command) {
            toggleSelectedKeyword(command, outerBraces);
          }
        });
    };
  };

  let wrapCommand = vscode.commands.registerCommand('latex-utils.wrapCommand', wrapCustom(false));

  let wrapCommandOuter = vscode.commands.registerCommand('latex-utils.wrapCommandOuterBraces', wrapCustom(true));

  commands.push(wrapCommand);
  commands.push(wrapCommandOuter);

  return commands;
}