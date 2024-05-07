const Modal = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 md:w-1/2 w-full rounded-lg shadow-lg">
                <div className="flex justify-end w-full top-0">
                    <button onClick={onClose} className="">
                        <svg width="20px" height="20px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><line x1="8.06" y1="8.06" x2="55.41" y2="55.94" /><line x1="55.94" y1="8.06" x2="8.59" y2="55.94" /></svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal
