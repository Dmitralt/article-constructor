
export const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxSizing: 'border-box',
    },
    closeButton: {
        float: 'right',
        marginBottom: '10px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    content: {
        paddingTop: '20px',
    },
};