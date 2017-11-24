'use strict';
// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
var request = require('request');

// Extension activation when one of the events in package.json -> activationEvents happens.
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.validateCIYaml', () => {
        validateCIYaml();
    });

    context.subscriptions.push(disposable);
}

/**
 * Validate YAML in current editor
 * 
 * @returns bool
 */
function validateCIYaml() {
    // Get YAML as text
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return false; // No open text editor
    }
    
    let text = editor.document.getText();
    
    // Send text to validation
    let config = vscode.workspace.getConfiguration('gitlab-ci-validator');
    let url = config.get('gitLabURL') + '/api/v4/ci/lint';

    request.post(url, {
        body: {content: text},
        json: true,
        rejectUnauthorized: !config.get('ignoreCertificateErrors')
    }, function(error, response, body) {
        let valid = true;
        let errormessage = '';

        if(error) {
            // Trouble with the HTTP request
            valid = false;
            errormessage = 'Error calling GitLab API (' + url + '): ' + error.message;
        } 

        // Check response from GitLab API for general trouble
        if(valid && 'error' in body) {
            valid = false;
            errormessage = 'Error with your YAML file: ' + body.error;
        }
    
        // Check response from GitLab API for specific trouble
        if(valid) {
            let status = 'status' in body ? body.status : 'invalid';

            if(status != 'valid') {
                valid = false;
                errormessage = 'Error in your YAML: ' + body.errors.join(', ');
            }
        }

        // Show result of validation
        if(valid) {
            vscode.window.showInformationMessage('GitLab CI YAML valid.');
        } else {
            vscode.window.showErrorMessage(errormessage);
        }
    });

    return true;
}
