import React, { Component } from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './imageBlockStyles';
class ImageBlock extends BaseBlock {
    constructor(props) {
        super(props);
        this.state = {
            content: {
                image: props.content?.image || ''
            },
        };
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        this.setState((prevState) => ({
            content: {
                ...prevState.content,
                image: imageUrl,
            },
        }));
        if (this.props.onChangeImage) {
            this.props.onChangeImage(imageUrl);
        }
    };


    autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    static async saveData(data) {
        const base64Image = await ImageBlock.getBase64FromUrl(data.image);
        const curentStyles = saveStyles;
        return `
        <div style="${this.convertStyleObjectToString(curentStyles.container)}">
            <img src="${base64Image}" alt="Image" style="${this.convertStyleObjectToString(curentStyles.image)}" />
            <div style="${this.convertStyleObjectToString(curentStyles.clear)}"></div>
        </div>
    `;
    }


    static async getBase64FromUrl(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    modalRender() {
        const { image } = this.state.content;
        return (
            <div style={modalStyles.container}>
                <img
                    src={image}
                    alt="Image"
                    data-testid="imageBlock"
                    style={modalStyles.image}
                />
            </div>
        );
    }

    baseRender() {
        const { image } = this.state.content;
        return (
            <div style={baseStyles.container}>

                <div style={baseStyles.imageContainer}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                        style={baseStyles.fileInput}
                    />
                    {image && <img src={image} alt="Selected" style={baseStyles.image} />}
                </div>

            </div>
        );
    }
}




export default ImageBlock;
