'use strict';
// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
var request = require('request');

// Extension activation when one of the events in package.json -> activationEvents happens.
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.validateCIYaml', () => {
        var success = validateCIYaml();

        // Display a message box to the user
        vscode.window.showInformationMessage(success ? 'YAML valid.' : 'Error: YAML invalid.');
    });

    context.subscriptions.push(disposable);
}

// Validate current YAML
function validateCIYaml() {
    // Get YAML as text
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return false; // No open text editor
    }
    
    var text = editor.document.getText();
    
    // Send text to validation
    request.post('https://gitlab.com/api/v4/ci/lint', {
        body: JSON.stringify({content: text}),
        json: true
    }, function(error, response, body) {
        vscode.window.showInformationMessage(body);
    })

    return true;
}
