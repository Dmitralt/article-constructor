export const baseStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '15px',
        maxWidth: '500px',
        margin: '0 auto',
    },
    imageContainer: {
        width: '100%',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '15px',
    },
    fileInput: {
        marginBottom: '20px',
        padding: '8px',
        backgroundColor: '#e9ecef',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#495057',
        outline: 'none',
    },
    iframe: {
        width: '100%',
        height: '400px',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
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
        maxWidth: '300px',
        maxHeight: '300px',
        objectFit: 'cover',
        margin: '0 auto',
    },
    clear: {
        clear: 'both',
    },
    iframe: {
        width: '100%',
        height: '400px',
        border: 'none',
    },
};



export const modalStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
        padding: '20px',
        maxWidth: '90%',
        margin: '20px auto',
        overflow: 'hidden',
    },
    iframe: {
        width: '100%',
        height: '400px',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
};
