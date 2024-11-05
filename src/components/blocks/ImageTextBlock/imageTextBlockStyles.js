
export const baseStyles = {
    container: (imageOnRight) => ({
        display: 'flex',
        flexDirection: imageOnRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginBottom: '10px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '10px',
    }),
    textContainer: (imageOnRight) => ({
        flex: imageOnRight ? '1' : 'auto',
        marginRight: imageOnRight ? '0' : '10px',
        marginLeft: imageOnRight ? '10px' : '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }),
    imageContainer: (imageOnRight) => ({
        flex: '0 0 300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: imageOnRight ? 'flex-end' : 'flex-start',
    }),
    image: (imageOnRight) => ({
        maxWidth: '300px',
        maxHeight: '300px',
        objectFit: 'cover',
    }),
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        marginBottom: '10px',
        resize: 'none',
        overflow: 'hidden',
    },
    fileInput: {
        marginBottom: '10px',
    },
};
export const saveStyles = {
    container: {
        display: 'block',
        marginBottom: '10px',
        overflow: 'auto',
    },
    image: (floatDirection) => ({
        maxWidth: '300px',
        maxHeight: '300px',
        objectFit: 'cover',
        float: floatDirection,
        margin: '0 10px',
    }),
    text: {
        margin: '0 10px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
    },
    clear: {
        clear: 'both',
    },
};
export const modalStyles = {
    container: (imageOnRight) => ({
        display: 'block',
        marginBottom: '10px',
        overflow: 'auto',
    }),
    image: (imageOnRight) => ({
        maxWidth: '300px',
        maxHeight: '300px',
        objectFit: 'cover',
        margin: '0 10px',
        float: imageOnRight ? 'left' : 'right',
    }),
    text: {
        margin: '0 10px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
    },
};