import React from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './textBlockStyles';

class TextBlock extends BaseBlock {
    static async saveData(data) {
        const curentStyles = this.convertStyleObjectToString(saveStyles.p || {});
        return `<p style="${curentStyles}">${data.text}</p>`;
    }

    modalRender() {
        return <p>{this.state.content.text}</p>;
    }

    baseRender() {
        return (
            <div style={baseStyles.container}>
                <textarea
                    value={this.state.content.text}
                    onChange={this.handleChange}
                    placeholder="Enter text"
                    style={baseStyles.textarea}
                    rows="1"
                    ref={(textarea) => this.textarea = textarea}
                    onInput={this.autoResize}
                    data-testid="textBlock-input"
                />
            </div>
        );
    }

    autoResize = () => {
        this.textarea.style.height = 'auto';
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    }
}


export default TextBlock;
