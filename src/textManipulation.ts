import * as vscode from "vscode";

// Manipulation of text

export function toggleSelectedKeyword(keyword: string): void {

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
    console.log("Found match", match[1]);

    let matchPosition = line.range.start.translate(0, match.index);

    let matchRange = new vscode.Range(matchPosition, matchPosition.translate(0, match[0].length));
    let insideText = match[1];

    if (matchRange.contains(selection)) {
      console.log('Tag found!');
      // Remove keyword
      editor.edit(((editBuilder) => {
        editBuilder.replace(matchRange, insideText);
      }));
      return;
    }
  }

  // Add keyword
  editor.edit(((editBuilder) => {
    editBuilder.replace(selection, `\\${keyword}{${text}}`);
  }));
}