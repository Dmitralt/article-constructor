import React, { Component } from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './ScriptBlockStyles';

class ScriptBlock extends BaseBlock {
    constructor(props) {
        super(props);
        this.state = {
            content: {
                html: props.content?.html || ''
            },
        };
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const htmlContent = event.target.result;
            this.setState((prevState) => ({
                content: {
                    ...prevState.content,
                    html: htmlContent,
                },
            }));
            if (this.props.onChangeContent) {
                this.props.onChangeContent(htmlContent);
            }
        };
        reader.readAsText(file);
    };

    static async saveData(data) {
        const curentStyles = saveStyles;
        return `
            <div style="${this.convertStyleObjectToString(curentStyles.container)}">
                <iframe srcdoc="${data.html.replace(/"/g, '&quot;')}" style="${this.convertStyleObjectToString(curentStyles.iframe)}" sandbox="allow-scripts allow-same-origin"></iframe>
                <div style="${this.convertStyleObjectToString(curentStyles.clear)}"></div>
            </div>
        `;
    }


    modalRender() {
        const { html } = this.state.content;
        return (
            <div style={modalStyles.container}>
                <iframe
                    srcDoc={html}
                    style={modalStyles.iframe}
                    sandbox="allow-scripts allow-same-origin"
                    title="Modal HTML Content"
                />
            </div>
        );
    }


    baseRender() {
        const { html } = this.state.content;
        return (
            <div style={baseStyles.container}>
                <div style={baseStyles.fileInputContainer}>
                    <input
                        type="file"
                        accept=".html"
                        onChange={this.handleFileChange}
                        style={baseStyles.fileInput}
                    />
                </div>
                <iframe
                    srcDoc={html}
                    style={baseStyles.iframe}
                    sandbox="allow-scripts allow-same-origin"
                    title="Base HTML Content"
                />
            </div>
        );
    }

}

export default ScriptBlock;

