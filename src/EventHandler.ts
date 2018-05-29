import * as vscode from "vscode";
import * as itemlists from './eventHandlers/itemlists';

/**
 * This class handles events for this extension
 */

export default class EventHandler {

  textChangeEvent: vscode.Disposable | undefined;

  registerEvents(): vscode.Disposable[] {

    let disposables: vscode.Disposable[] = [];

    this.shouldRegisterTextChange(vscode.window.activeTextEditor);

    disposables.push(
      vscode.window.onDidChangeActiveTextEditor(this.shouldRegisterTextChange, this)
    );

    disposables.push(
      new vscode.Disposable(this.unregisterTextChangeEvent.bind(this))
    );

    return disposables;
  }

  shouldRegisterTextChange(editor: vscode.TextEditor | undefined) {
    // Should only register text change event, if language id is latex
    if (editor !== undefined && editor.document.languageId === 'latex') {
      this.textChangeEvent = vscode.workspace.onDidChangeTextDocument(this.handleTextChange);
    } else {
      this.unregisterTextChangeEvent();
    }

  }

  unregisterTextChangeEvent() {
    if (this.textChangeEvent) {
      this.textChangeEvent.dispose();
      this.textChangeEvent = undefined;
    }
  }

  handleTextChange(event: vscode.TextDocumentChangeEvent) {
    // TODO: HER
    if (vscode.workspace.getConfiguration('latex-utils').get('automaticItemTags')) {
      itemlists.handleTextChangeEvent(event);
    }
  }

}
