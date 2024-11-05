import React from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './headerBlockStyles';
class HeaderBlock extends BaseBlock {
    static async saveData(data, styles = {}) {
        const curentStyles = this.convertStyleObjectToString(saveStyles.h1 || {});
        return `<h1 style="${curentStyles}">${data.text}</h1>`;
    }
    modalRender() {
        return <h1>{this.state.content.text}</h1>;
    }

    baseRender() {
        return (
            <div style={baseStyles.container}>
                <label style={baseStyles.label}>Header Input:</label>
                <input
                    type="text"
                    value={this.state.content.text}
                    onChange={this.handleChange}
                    placeholder="need text"
                    style={baseStyles.input}
                    ref={(input) => this.input = input}
                    onInput={this.autoResize}
                    data-testid="header-input"
                />
            </div>


        );
    }

    autoResize = () => {
        this.input.style.height = 'auto';
        this.input.style.height = `${this.input.scrollHeight}px`;
    }
}


export default HeaderBlock;
