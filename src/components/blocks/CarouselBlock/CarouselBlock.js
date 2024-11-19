import React, { Component } from 'react';
import BaseBlock from '../BaseBlock/BaseBlock';
import { baseStyles, modalStyles, saveStyles } from './CarouselBlockStyles';

class CarouselBlock extends BaseBlock {
    constructor(props) {
        super(props);
        this.state = {
            images: props.content?.images || [],
            currentSlide: 0,
        };
    }

    handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        this.setState((prevState) => ({
            images: [...prevState.images, ...imageUrls],
            currentSlide: 0,
        }));
        if (this.props.onChangeImage) {
            this.props.onChangeImage(imageUrls);
        }
    };

    componentDidMount() {
        this.initializeCarousel();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.images.length !== this.state.images.length) {
            this.initializeCarousel();
        }
    }

    initializeCarousel() {
        const carousels = document.querySelectorAll('.carousel-inner');
        carousels.forEach((carouselInner) => {
            const carouselItems = carouselInner.querySelectorAll('.carousel-item');
            const prevButton = carouselInner.closest('.carousel').querySelector('.carousel-control.prev');
            const nextButton = carouselInner.closest('.carousel').querySelector('.carousel-control.next');
            let currentSlide = 0;

            const updateSlide = () => {
                if (carouselInner) {
                    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
            };

            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    currentSlide = (currentSlide > 0) ? currentSlide - 1 : carouselItems.length - 1;
                    updateSlide();
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    currentSlide = (currentSlide < carouselItems.length - 1) ? currentSlide + 1 : 0;
                    updateSlide();
                });
            }

            updateSlide();
        });
    }

    autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    static async saveData(data) {

        if (!data || !Array.isArray(data.images)) {
            console.error("Error: data.images is not defined or not an array");
            return '';
        }


        const curentStyles = saveStyles || {
            container: {},
            image: {},
            clear: {},
            button: {},
        };

        // Convert images to base64
        const base64Images = await Promise.all(data.images.map(img => CarouselBlock.getBase64FromUrl(img)));

        // Generate a unique ID for this carousel instance
        const carouselId = `carousel_${Math.random().toString(36).substring(2, 9)}`;

        return `
            <div id="${carouselId}" style="${this.convertStyleObjectToString(curentStyles.container)}" class="carousel-container">
                <div class="carousel-image-container" style="position: relative; overflow: hidden; width: 300px; height: 300px; margin: 0 auto;">
                    ${base64Images.map((img, index) => `
                        <img src="${img}" alt="Image" style="${this.convertStyleObjectToString(curentStyles.image)}; position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: ${index === 0 ? 'block' : 'none'};" class="carousel-image" data-index="${index}" />
                    `).join('')}
                </div>
                <button onclick="${carouselId}_prevImage()" style="${this.convertStyleObjectToString(curentStyles.button)}">Prev</button>
                <button onclick="${carouselId}_nextImage()" style="${this.convertStyleObjectToString(curentStyles.button)}">Next</button>
                <div style="${this.convertStyleObjectToString(curentStyles.clear)}"></div>
            </div>
    
            <script>
                (function() {
                    let currentIndex = 0;
                    const totalImages = ${base64Images.length};
                    const carouselElement = document.getElementById('${carouselId}');
                    const images = carouselElement.querySelectorAll('.carousel-image');
    
                    function showImage(index) {
                        images.forEach((img, i) => {
                            img.style.display = i === index ? 'block' : 'none';
                        });
                    }
    
                    window.${carouselId}_nextImage = function() {
                        currentIndex = (currentIndex + 1) % totalImages;
                        showImage(currentIndex);
                    }
    
                    window.${carouselId}_prevImage = function() {
                        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                        showImage(currentIndex);
                    }
                })();
            </script>
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
        const { images } = this.state;
        return (
            <div style={modalStyles.container}>
                <div className="carousel" style={baseStyles.carousel}>
                    <div className="carousel-inner" style={baseStyles.carouselInner}>
                        {images.map((image, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} style={baseStyles.carouselItem} key={index}>
                                <img src={image} alt={`Image ${index + 1}`} style={modalStyles.image} />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control prev" style={{ ...baseStyles.carouselControl, ...baseStyles.prev }}>❮</button>
                    <button className="carousel-control next" style={{ ...baseStyles.carouselControl, ...baseStyles.next }}>❯</button>
                </div>
            </div>
        );
    }

    baseRender() {
        const { images } = this.state;
        return (
            <div style={baseStyles.container}>
                <div style={baseStyles.imageContainer}>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={this.handleImageChange}
                        style={baseStyles.fileInput}
                    />
                </div>
                <div className="carousel" style={baseStyles.carousel}>
                    <div className="carousel-inner" style={baseStyles.carouselInner}>
                        {images.map((image, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} style={baseStyles.carouselItem} key={index}>
                                <img src={image} alt={`Selected ${index + 1}`} style={baseStyles.image} />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control prev" style={{ ...baseStyles.carouselControl, ...baseStyles.prev }}>❮</button>
                    <button className="carousel-control next" style={{ ...baseStyles.carouselControl, ...baseStyles.next }}>❯</button>
                </div>
            </div>
        );
    }
}

export default CarouselBlock;
