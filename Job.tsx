import React, { useState } from 'react';

interface Props {
    job: {
        name: string;
        id: number;
        status: boolean;
    };
    stt: number;
    handleCheckboxChange: (id: number) => void;
    handleEdit: (id: number, newName: string) => void;
    handleDelete: (id: number) => void;
}

const Job: React.FC<Props> = ({ job, stt, handleCheckboxChange, handleEdit, handleDelete }) => {
    const { name, status, id } = job;
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleSave = () => {
        handleEdit(id, newName);
        setEditing(false);
    };

    return (
        <tr>
            <td>{stt + 1}</td>
            <td>
                {editing ? (
                    <input type="text" value={newName} onChange={handleChange} />
                ) : (
                    name
                )}
            </td>
            <td>{status ? "Hoàn thành" : "Chưa hoàn thành"}</td>
            <td><input type="checkbox" checked={status} onChange={() => handleCheckboxChange(id)} /></td>
            <td>
                {editing ? (
                    <button onClick={handleSave}>Lưu</button>
                ) : (
                    <button onClick={() => setEditing(true)}>Sửa</button>
                )}
                {!editing && <button onClick={() => handleDelete(id)}>Xóa</button>}
            </td>
        </tr>
    );
};

export default Job;
