import React, { Component } from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './imageTextBlockStyles';
class ImageTextBlock extends BaseBlock {
    constructor(props) {
        super(props);
        this.state = {
            content: {
                image: props.content?.image || '',
                text: props.content?.text || '',
                imageOnRight: props.content?.imageOnRight || false,
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

    handleTextChange = (e) => {
        const text = e.target.value;
        this.setState((prevState) => ({
            content: {
                ...prevState.content,
                text,
            },
        }));
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }
    };

    autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    static async saveData(data) {
        const base64Image = await ImageTextBlock.getBase64FromUrl(data.image);
        const floatDirection = data.type === 'image-left' ? 'left' : 'right';
        const curentStyles = saveStyles;

        return `
        <div style="${this.convertStyleObjectToString(curentStyles.container)}">
            <img src="${base64Image}" alt="Image" style="${this.convertStyleObjectToString(curentStyles.image(floatDirection))}" />
            <p style="${this.convertStyleObjectToString(curentStyles.text)}">${data.text}</p>
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
        const { text, image, imageOnRight } = this.state.content;
        return (
            <div style={modalStyles.container(imageOnRight)}>
                <img
                    src={image}
                    alt="Image"
                    data-testid="imageTextBlock-image"
                    style={modalStyles.image(imageOnRight)}
                />
                <p style={modalStyles.text}>{text}</p>
            </div>
        );
    }

    baseRender() {
        const { text, image, imageOnRight } = this.state.content;
        return (
            <div style={baseStyles.container(imageOnRight)}>
                <div style={baseStyles.textContainer(imageOnRight)}>
                    <textarea
                        value={text}
                        onChange={this.handleTextChange}
                        placeholder="Enter text"
                        style={baseStyles.textarea}
                        rows="1"
                        onInput={this.autoResize}
                        data-testid="imageTextBlock-textarea"
                    />
                </div>

                <div style={baseStyles.imageContainer(imageOnRight)}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                        style={baseStyles.fileInput}
                    />
                    {image && <img src={image} alt="Selected" style={baseStyles.image(imageOnRight)} />}
                </div>

            </div>
        );
    }
}




export default ImageTextBlock;
