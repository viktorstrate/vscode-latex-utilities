/**
 * This file handles more complex text manipulations
 */

import * as vscode from "vscode";

export function toggleSelectedKeyword(keyword: string, outerBraces?: boolean): undefined | 'added' | 'removed' {

  console.log("Toggle selected keyword called");

  let editor = vscode.window.activeTextEditor;

  if (editor === undefined) {
    return;
  }

  let { selection, document } = editor;
  let text = document.getText(selection);

  let line = document.lineAt(selection.anchor);

  let pattern = new RegExp(`\\\\${keyword}{(.*?)}`, 'g');

  let match;

  while (match = pattern.exec(line.text)) {

    let matchPosition = line.range.start.translate(0, match.index);

    let matchRange = new vscode.Range(matchPosition, matchPosition.translate(0, match[0].length));
    let insideText = match[1];

    if (matchRange.contains(selection)) {
      // Remove keyword
      editor.edit(((editBuilder) => {
        editBuilder.replace(matchRange, insideText);
      }));
      return 'removed';
    }
  }

  // Add keyword
  if (text.length > 0) {

    editor.edit(((editBuilder) => {
      if (outerBraces === true) {
        editBuilder.replace(selection, `{\\${keyword} ${text}}`);
      } else {
        editBuilder.replace(selection, `\\${keyword}{${text}}`);
      }
    }));

  } else {

    let snippet: vscode.SnippetString;

    if (outerBraces === true) {
      snippet = new vscode.SnippetString(`{ \\${keyword} $1}`);
    } else {
      snippet = new vscode.SnippetString(`\\${keyword}{$1}`);
    }

    editor.insertSnippet(snippet, selection.start);

  }

  return 'added';
}