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
    ]
  ];

  for (let cmd of wrapperCommands) {

    let newCommand = vscode.commands.registerCommand(`latex-utils.${cmd[1]}`, () => {
      toggleSelectedKeyword(cmd[0]);
    });

    commands.push(newCommand);
  }

  let wrapCommand = vscode.commands.registerCommand('latex-utils.wrapCommand', () => {
    vscode.window.showInputBox({
      placeHolder: "command",
      prompt: "Please enter the command to wrap"
    })
      .then(command => {
        if (command) {
          toggleSelectedKeyword(command);
        }
      });
  });

  commands.push(wrapCommand);

  return commands;
}