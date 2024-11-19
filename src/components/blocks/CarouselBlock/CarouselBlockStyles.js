export const baseStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        width: '100%',
        maxWidth: '300px',
        margin: 'auto',
        overflow: 'hidden',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '300px',
        objectFit: 'cover',
    },
    fileInput: {
        marginBottom: '10px',
    },
    carousel: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    },
    carouselInner: {
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
    },
    carouselItem: {
        minWidth: '100%',
        boxSizing: 'border-box',
    },
    carouselControl: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 'none',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
    },
    prev: {
        left: '0px',
    },
    next: {
        right: '0px',
    },
};




export const saveStyles = {
    container: {
        display: 'block',
        marginBottom: '10px',
        overflow: 'auto',
        textAlign: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover',
    },
    clear: {
        clear: 'both',
    },
    button: {
        display: 'inline-block',
        margin: '10px',
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
    },
};

export const modalStyles = {
    container: {
        display: 'block',
        marginBottom: '10px',
        overflow: 'auto',
        textAlign: 'center',
    },
    image: {
        maxWidth: '300px',
        maxHeight: '300px',
        objectFit: 'cover',
        margin: '0 auto',
    },
};
