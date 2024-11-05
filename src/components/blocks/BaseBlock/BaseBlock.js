import React, { Component } from 'react';
import { baseStyles, modalStyles, saveStyles } from './baseBlockStyles';

class BaseBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content || {},
            mode: props.mode || 'base',
        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.content !== prevState.content || nextProps.mode !== prevState.mode) {
            return {
                content: nextProps.content,
                mode: nextProps.mode,
            };
        }
        return null;
    }

    handleChange = (e) => {
        const newValue = e.target.value;
        this.setState({ content: newValue });
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    };

    render() {
        const { mode } = this.state;
        switch (mode) {
            case 'modal':

                return this.modalRender();
            case 'base':
            default:
                return this.baseRender()
        }
    }

    static async saveData(data) {
        return `You should override this render method in child components`
    }
    static convertStyleObjectToString(styleObj) {
        return Object.entries(styleObj)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
    }

    modalRender() { return <h1> You should override this</h1> }

    baseRender() { return <h1> You should override this</h1> }

}

export default BaseBlock;


