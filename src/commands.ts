import * as vscode from 'vscode';
import { toggleSelectedKeyword } from './textManipulation';

export default function commandsToRegister(): vscode.Disposable[] {

  let commands: vscode.Disposable[] = [];

  // The commands have been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let makeBold = vscode.commands.registerCommand('latex-utils.makeBold', () => {

    toggleSelectedKeyword('textbf');

  });
  commands.push(makeBold);

  let makeItalic = vscode.commands.registerCommand('latex-utils.makeItalic', () => {

    toggleSelectedKeyword('textit');

  });
  commands.push(makeItalic);

  let makeUnderline = vscode.commands.registerCommand('latex-utils.makeUnderline', () => {

    toggleSelectedKeyword('underline');

  });
  commands.push(makeUnderline);

  return commands;
}