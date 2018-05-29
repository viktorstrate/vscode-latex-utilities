import * as vscode from 'vscode';

export function handleTextChangeEvent (event: vscode.TextDocumentChangeEvent) {
  if (event.contentChanges.find(x => x.text.includes('\n')) === undefined) {
    return;
  }

  if (event.contentChanges.length !== 1) {
    return;
  }

  let e = vscode.window.activeTextEditor;
  if (e === undefined) {
    return;
  }

  let editor = e;

  let newLinePos = event.contentChanges[0].range.end.translate(1, 0);
  let newLine = event.document.lineAt(newLinePos);

  if (newLine.text.trim().length !== 0) {
    return;
  }

  let pattern = /\\begin{itemize}((?:.|\n)*)\\end{itemize}/g;

  let match;
  while (match = pattern.exec(event.document.getText())) {

    let contentStart = event.document.positionAt(match.index + 15);
    let contentEnd = event.document.positionAt(match.index + 15 + match[1].length);

    let matchRange = new vscode.Range(contentStart, contentEnd);

    if (matchRange.contains(event.contentChanges[0].range)) {
      editor.edit(editBuilder => {
        editBuilder.insert(event.contentChanges[0].range.end.translate(1, 0), '\\item ');
      });
    }

  }

}