import { useState, useEffect } from "react";
import { Modal, Spin } from "antd";

async function wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
}

const ModalForm = ({ open, onClose, onSave, initialValue, title }) => {
    const [name, setName] = useState(initialValue || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(initialValue || "");
    }, [initialValue]);

    const handleSave = async () => {
        setLoading(true);
        await wait(2000);
        onSave(name);
        setLoading(false);
        onClose();
        setName('');
    };

    return (
        <Modal title={title} open={open} onCancel={onClose} footer={null}>
            <Spin spinning={loading}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="mt-3">
                        <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                            Save
                        </button>
                    </div>
                </div>
            </Spin>
        </Modal>
    );
};

export default ModalForm;
