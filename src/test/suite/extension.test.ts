import * as assert from 'assert';
import * as path from 'path';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

const testFolderLocation = '../../../testFiles/';
suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test we can open test file', async() => {

    const uri = vscode.Uri.file(
      path.join(__dirname, testFolderLocation, 'test.svg')
		);

		const document = await vscode.workspace.openTextDocument(uri);
		const editor = await vscode.window.showTextDocument(document);
		assert.notStrictEqual(vscode.window.activeTextEditor, undefined);
		assert.strictEqual(vscode.window.visibleTextEditors.length, 1);

		// Have not yet figured how to test this... how to switch the activeTextEditor manually?
		// const result = await vscode.commands.executeCommand('html-to-hs-extension.toReactHyperscript')
		// assert.strictEqual(vscode.window.visibleTextEditors.length, 2)
		// const svg1 = await (vscode.window.activeTextEditor as any).document.getText(); 
		// assert.strictEqual(false, /"attributes"/.test(svg1))
		// const svg2 = await (vscode.window.activeTextEditor as any).document.getText()
		// assert.strictEqual(true, /"attributes"/.test(svg2))

		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
