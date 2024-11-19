import HeaderBlock from '../blocks/HeaderBlock/HeaderBlock';
import TextBlock from '../blocks/TextBlock/TextBlock';
import ImageTextBlock from '../blocks/ImageTextBlock/ImageTextBlock';
import ImageBlock from '../blocks/ImageBlock/ImageBlock';
import CarouselBlock from '../blocks/CarouselBlock/CarouselBlock';
import ScriptBlock from '../blocks/ScriptBlock/ScriptBlock';
const generateHTMLContent = async (blocks) => {
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
        else if (block.type === 'image') {
            htmlContent += await ImageBlock.saveData({
                image: block.content.image
            });
        }
        else if (block.type === 'carousel') {
            htmlContent += await CarouselBlock.saveData({
                images: block.content.images
            });
        }
        else if (block.type === 'script') {
            htmlContent += await ScriptBlock.saveData({
                html: block.content.html
            });
        }


    }

    htmlContent += `</body></html>`;
    return htmlContent;
};

export default generateHTMLContent;
