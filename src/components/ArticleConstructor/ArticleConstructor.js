import React, { useState } from 'react';
import HeaderBlock from '../blocks/HeaderBlock/HeaderBlock';
import TextBlock from '../blocks/TextBlock/TextBlock';
import ImageTextBlock from '../blocks/ImageTextBlock/ImageTextBlock';
import ImageBlock from '../blocks/ImageBlock/ImageBlock';
import CarouselBlock from '../blocks/CarouselBlock/CarouselBlock';
import ScriptBlock from '../blocks/ScriptBlock/ScriptBlock';
import Modal from '../modal/Modal';
import styles from './ArticleConstructorStyles';
import generateHTMLContent from './htmlTemplate';

const ArticleConstructor = () => {
    const [blocks, setBlocks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requireConfirmation, setRequireConfirmation] = useState(true);

    const removeBlockWithConfirmation = (index) => {
        if (!requireConfirmation || window.confirm('Are you sure you want to delete this block?')) {
            removeBlock(index);
        }
    };

    const addBlock = (type) => {
        setBlocks([...blocks, { type, content: '' }]);
    };


    const removeBlock = (index) => {
        setBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
    };

    const updateBlock = (index, newContent) => {
        setBlocks((prevBlocks) =>
            prevBlocks.map((block, i) => i === index ? { ...block, content: newContent } : block)
        );
    };
    const moveBlockUp = (index) => {
        if (index === 0) return;

        setBlocks((prevBlocks) => {
            const newBlocks = [...prevBlocks];
            [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
            return newBlocks;
        });
    };

    const moveBlockDown = (index) => {
        if (index === blocks.length - 1) return;

        setBlocks((prevBlocks) => {
            const newBlocks = [...prevBlocks];
            [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
            return newBlocks;
        });
    };
    const renderBlock = (block, index) => {
        return (
            <div key={index} style={styles.blockContainer}>
                <div style={{ flex: 1 }}>
                    {(() => {
                        switch (block.type) {
                            case 'header':
                                return (
                                    <HeaderBlock
                                        content={{ text: block.content }}
                                        mode="base"
                                        onChange={(text) => updateBlock(index, text)}
                                    />
                                );
                            case 'text':
                                return (
                                    <TextBlock
                                        content={{ text: block.content }}
                                        onChange={(text) => updateBlock(index, text)}
                                    />
                                );
                            case 'image-left':
                            case 'image-right':
                                return (
                                    <ImageTextBlock
                                        content={{
                                            text: block.content.text || '',
                                            image: block.content.image || '',
                                            imageOnRight: block.type === 'image-left',
                                        }}
                                        mode="base"
                                        onChangeText={(text) =>
                                            updateBlock(index, { ...block.content, text })
                                        }
                                        onChangeImage={(image) =>
                                            updateBlock(index, { ...block.content, image })
                                        }
                                    />
                                );
                            case 'image':
                                return (
                                    <ImageBlock
                                        content={{ image: block.content.image || '' }}
                                        mode="base"
                                        onChangeImage={(image) =>
                                            updateBlock(index, { ...block.content, image })
                                        }
                                    />
                                );
                            case 'carousel':
                                return (
                                    <CarouselBlock
                                        content={{ images: block.content.images || [] }}
                                        mode="base"
                                        onChangeImage={(images) =>
                                            updateBlock(index, { ...block.content, images })
                                        }
                                    />
                                );
                            case 'script':
                                return (
                                    <ScriptBlock
                                        content={{ html: block.content.html || '' }}
                                        mode="base"
                                        onChangeContent={(html) =>
                                            updateBlock(index, { ...block.content, html })
                                        }
                                    />
                                );
                            default:
                                return null;
                        }
                    })()}
                    <button
                        style={styles.deleteButton}
                        onClick={() => removeBlockWithConfirmation(index)}
                    >
                        ✖
                    </button>
                </div>
                <div style={styles.buttonContainer}>
                    <button
                        style={styles.moveButtonUp}
                        onClick={() => moveBlockUp(index)}
                    >
                        ▲
                    </button>
                    <button
                        style={styles.moveButtonDown}
                        onClick={() => moveBlockDown(index)}
                    >
                        ▼
                    </button>
                </div>
            </div>
        );
    };

    const renderBlockForView = (block, index) => {
        return (
            <div key={index} style={styles.blockContainer}>
                {(() => {
                    switch (block.type) {
                        case 'header':
                            return (
                                <HeaderBlock
                                    content={{ text: block.content }}
                                    onChange={(text) => updateBlock(index, text)}
                                    mode='modal'
                                />
                            );
                        case 'text':
                            return (
                                <TextBlock
                                    content={{ text: block.content }}
                                    onChange={(text) => updateBlock(index, text)}
                                    mode='modal'
                                />
                            );
                        case 'image-left':
                        case 'image-right':
                            return (
                                <ImageTextBlock
                                    content={{
                                        text: block.content.text || '',
                                        image: block.content.image || '',
                                        imageOnRight: block.type === 'image-left'
                                    }}
                                    onChangeText={(text) => updateBlock(index, { ...block.content, text })}
                                    onChangeImage={(image) => updateBlock(index, { ...block.content, image })}
                                    mode='modal'
                                />
                            );
                        case 'image':
                            return (
                                <ImageBlock
                                    content={{ image: block.content.image || '' }}
                                    onChangeImage={(image) => updateBlock(index, { ...block.content, image })}
                                    mode='modal'
                                />
                            );
                        case 'carousel':
                            return (
                                <CarouselBlock
                                    content={{ images: block.content.images || [] }}
                                    onChangeImage={(images) => updateBlock(index, { ...block.content, images })}
                                    mode='modal'
                                />
                            );
                        case 'script':
                            return (
                                <ScriptBlock
                                    content={{ html: block.content.html || '' }}
                                    mode='modal'
                                    onChangeContent={(html) => updateBlock(index, { ...block.content, html })}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    };

    const generateHTMLFile = async () => {
        const htmlContent = await generateHTMLContent(blocks);
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
                <button style={styles.sidebarButton} onClick={() => addBlock('image')}>Image</button>
                <button style={styles.sidebarButton} onClick={() => addBlock('carousel')}>carousel</button>
                <button style={styles.sidebarButton} onClick={() => addBlock('script')}>script</button>

                <label style={styles.confirmationLabel}>
                    <input
                        type="checkbox"
                        checked={requireConfirmation}
                        onChange={() => setRequireConfirmation(!requireConfirmation)}
                    />
                    Require confirmation on delete
                </label>

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

export default ArticleConstructor;
