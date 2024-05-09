import React, { useState, useEffect } from 'react';
import Job from './Job';

interface Job {
    name: string;
    id: number;
    status: boolean;
}

export default function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("jobs");
        if (data) {
            setJobs(JSON.parse(data));
        }
    }, []);

    const handleCheckboxChange = (id: number) => {
        const updatedJobs = jobs.map(job => {
            if (job.id === id) {
                return { ...job, status: !job.status };
            }
            return job;
        });
        setJobs(updatedJobs);
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    };

    const handleEdit = (id: number, newName: string) => {
        const updatedJobs = jobs.map(job => {
            if (job.id === id) {
                return { ...job, name: newName };
            }
            return job;
        });
        setJobs(updatedJobs);
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa công việc này không?")) {
            const updatedJobs = jobs.filter(job => job.id !== id);
            setJobs(updatedJobs);
            localStorage.setItem("jobs", JSON.stringify(updatedJobs));
        }
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Trạng thái</th>
                        <th>Checkbox</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((item, index) => (
                        <Job key={item.id} job={item} stt={index} handleCheckboxChange={handleCheckboxChange} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
