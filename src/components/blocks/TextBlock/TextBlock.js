import React from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './textBlockStyles';

class TextBlock extends BaseBlock {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            textareaHeight: 'auto',
        };
    }

    static async saveData(data) {
        const curentStyles = this.convertStyleObjectToString(saveStyles.p || {});
        return `<p style="${curentStyles}">${data.text.replace(/\n/g, '<br>')}</p>`;
    }

    modalRender() {
        return <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.content.text}</p>;
    }

    baseRender() {
        return (
            <div style={baseStyles.container}>
                <label style={baseStyles.label}>Text Input:</label>
                <textarea
                    value={this.state.content.text}
                    onChange={this.handleChange}
                    placeholder="Enter text"
                    style={{ ...baseStyles.textarea, height: this.state.textareaHeight }}
                    rows="1"
                    ref={(textarea) => this.textarea = textarea}
                    onInput={this.autoResize}
                    data-testid="textBlock-input"
                />
            </div>
        );
    }

    componentDidMount() {
        this.setTextareaHeight();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.content.text !== this.state.content.text) {
            this.setTextareaHeight();
        }
    }

    setTextareaHeight = () => {
        if (this.textarea) {
            this.textarea.style.height = 'auto';
            this.textarea.style.height = `${this.textarea.scrollHeight}px`;
            this.setState({ textareaHeight: `${this.textarea.scrollHeight}px` });
        }
    }

    autoResize = () => {
        this.setTextareaHeight();
    }
}

export default TextBlock;
