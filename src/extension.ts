// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {htmlToHs} from 'html-to-hyperscript';
import * as assert from 'assert';

export async function processor(style: 'react' | 'hyperscript'){
	if (vscode.window.activeTextEditor !== undefined) {  
		const svg = vscode.window.activeTextEditor.document.getText(); 
		let convert = htmlToHs({tabSize: 4});
		let result = convert(svg);
		if (style === 'react') {
			const regex = /{[\s\S]*?"attributes":[\s]*?{([\s\S]*?)}[\s\S]*?}/gm;
			result = result.replace(regex, '{$1}').replace(/"([a-z]*)-([a-z]*)":/g, function (g: string, p1: string, p2: string) { return `"${p1}${p2[0].toUpperCase()}${p2.substring(1)}":` });;
		}
		const textDoc = await vscode.workspace.openTextDocument(  
			{
					content: result,
					language: 'ts'
			}
		);

		await vscode.window.showTextDocument(textDoc, vscode.ViewColumn.Beside);  
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let reactDisposable = vscode.commands.registerCommand('html-to-hs-vscode-extension.toReactHyperscript', async () => {
		processor('react');
	});

	context.subscriptions.push(reactDisposable);

	let hsDisposable = vscode.commands.registerCommand('html-to-hs-vscode-extension.toHyperscript', async () => {
		processor('hyperscript');
	});

	context.subscriptions.push(hsDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
