// This visual studio code extension is a simple tool that allows you to transpose the words in a line.
// If there is no current selection then all whitespace and punctuation will be the "middle tokens".
// If there is a selection then the "middle tokens" will be the selection extended on each side to include any whitespace and punctuation.
// The words to the left and right of the "middle tokens" are exchanged.
// This is meant to mimic the behavior of the transpose command in Visual Studio C++ (or at least how it used to work there).

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('"transposewordsbien" is now active.');

	const disposable = vscode.commands.registerCommand('transposewordsbien.transposeWords', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			const line = document.lineAt(selection.start.line);
			const lineText = line.text;

			// Get the text before and after the selection
			const textBeforeSelection = lineText.substring(0, selection.start.character);
			const textAfterSelection = lineText.substring(selection.end.character);

			// Find the word before selection and the stuff between
			const beforeMatch = textBeforeSelection.match(/(\w+)([\s\W]*)$/);
			// Find the word after selection and the stuff between
			const afterMatch = textAfterSelection.match(/^([\s\W]*)(\w+)/);

			if (beforeMatch && afterMatch) {
				const leftWord = beforeMatch[1];
				const rightWord = afterMatch[2];

				// Calculate ranges for both words and the middle tokens
				const leftWordStart = new vscode.Position(selection.start.line, beforeMatch.index!);
				const leftWordEnd = new vscode.Position(selection.start.line, beforeMatch.index! + leftWord.length);
				const rightWordStart = new vscode.Position(selection.start.line, selection.end.character + afterMatch.index! + afterMatch[1].length);
				const rightWordEnd = new vscode.Position(selection.start.line, selection.end.character + afterMatch.index! + afterMatch[1].length + rightWord.length);

				// Perform the swap
				editor.edit(editBuilder => {
					editBuilder.replace(new vscode.Range(leftWordStart, leftWordEnd), rightWord);
					editBuilder.replace(new vscode.Range(rightWordStart, rightWordEnd), leftWord);
				});
			}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }