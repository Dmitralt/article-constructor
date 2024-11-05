import React, { useState } from 'react';
import HeaderBlock from './blocks/HeaderBlock/HeaderBlock';
import TextBlock from './blocks/TextBlock/TextBlock';
import ImageTextBlock from './blocks/ImageTextBlock/ImageTextBlock';
import Modal from './modal/Modal';

const ArticleConstructor = () => {
    const [blocks, setBlocks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addBlock = (type) => {
        setBlocks([...blocks, { type, content: '' }]);
    };

    const updateBlock = (index, newContent) => {
        const newBlocks = [...blocks];
        newBlocks[index].content = newContent;
        setBlocks(newBlocks);
    };

    const renderBlock = (block, index) => {
        switch (block.type) {
            case 'header':
                return (
                    <HeaderBlock
                        key={index}
                        content={{ text: block.content }}
                        mode='base'
                        onChange={(text) => updateBlock(index, text)}
                    />
                );
            case 'text':
                return (
                    <TextBlock
                        key={index}
                        content={{ text: block.content }}
                        onChange={(text) => updateBlock(index, text)}
                    />
                );
            case 'image-right':
            case 'image-left':
                return (
                    <ImageTextBlock
                        key={index}
                        content={{
                            text: block.content.text || '',
                            image: block.content.image || '',
                            imageOnRight: block.type === 'image-left'
                        }}
                        mode='base'
                        onChangeText={(text) => updateBlock(index, { ...block.content, text })}
                        onChangeImage={(image) => updateBlock(index, { ...block.content, image })}
                    />
                );
            default:
                return null;
        }
    };

    const renderBlockForView = (block, index) => {
        switch (block.type) {
            case 'header':
                return <HeaderBlock
                    key={index}
                    content={{ text: block.content }}
                    onChange={(text) => updateBlock(index, text)}
                    mode='modal'
                />;
            case 'text':
                return <TextBlock
                    key={index}
                    content={{ text: block.content }}
                    onChange={(text) => updateBlock(index, text)}
                    mode='modal'
                />;
            case 'image-left':
            case 'image-right':
                return <ImageTextBlock
                    key={index}
                    content={{
                        text: block.content.text || '',
                        image: block.content.image || '',
                        imageOnRight: block.type === 'image-left'
                    }}
                    onChangeText={(text) => updateBlock(index, { ...block.content, text })}
                    onChangeImage={(image) => updateBlock(index, { ...block.content, image })}
                    mode='modal'
                />;
            default:
                return null;
        }
    };

    const generateHTMLFile = async () => {
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Generated Article</title>
                <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                h1 { font-size: 24px; }
                p { font-size: 16px; margin-bottom: 10px; }
                img { max-width: 500px; max-height: auto; display: block; margin-bottom: 10px; }
                .image-left { display: flex; align-items: center; justify-content: flex-start; }
                .image-right { display: flex; align-items: center; justify-content: flex-end; }
                </style>
            </head>
            <body>
            `;

        for (const block of blocks) {
            if (block.type === 'header') {
                htmlContent += await HeaderBlock.saveData({ text: block.content });
            } else if (block.type === 'text') {
                htmlContent += await TextBlock.saveData({ text: block.content });
            } else if (block.type === 'image-left' || block.type === 'image-right') {
                htmlContent += await ImageTextBlock.saveData({
                    type: block.type,
                    image: block.content.image,
                    text: block.content.text
                });
            }
        }
        htmlContent += `
        </body>
        </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'article.html';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h3 style={styles.sidebarTitle}>Add Block</h3>
                <button style={styles.sidebarButton} onClick={() => addBlock('header')}>Add Header</button>
                <button style={styles.sidebarButton} onClick={() => addBlock('text')}>Add Text</button>
                <button style={styles.sidebarButton} onClick={() => addBlock('image-left')}>Image Block Left</button>
                <button style={styles.sidebarButton} onClick={() => addBlock('image-right')}>Image Block Right</button>

                <button
                    style={styles.previewButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    Preview
                </button>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.articleWindow}>
                    {blocks.length === 0 ? (
                        <p style={styles.placeholderText}>Start adding blocks to build your article...</p>
                    ) : (
                        blocks.map((block, index) => renderBlock(block, index))
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={styles.modalContent}>
                    {blocks.map((block, index) => renderBlockForView(block, index))}
                    <button style={styles.downloadButton} onClick={generateHTMLFile}>
                        Download
                    </button>
                </div>
            </Modal>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        height: 'auto',
        position: 'relative',
    },
    sidebar: {
        width: '220px',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
    },
    sidebarTitle: {
        marginBottom: '20px',
        fontSize: '18px',
        color: '#fff',
    },
    sidebarButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    previewButton: {
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',

        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    mainContent: {
        flexGrow: 1,
        padding: '20px',
        boxSizing: 'border-box',
    },
    articleWindow: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        minHeight: '400px',
    },
    placeholderText: {
        color: '#888',
        fontSize: '18px',
        textAlign: 'center',
        marginTop: '40px',
    },
    modalContent: {
        padding: '20px',
        textAlign: 'center',
    },
    downloadButton: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#ffc107',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default ArticleConstructor;
