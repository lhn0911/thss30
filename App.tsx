import React, { useState, useEffect } from 'react';
import Jobs from './components/Jobs';

export default function App() {
    const [name, setName] = useState<string>("");
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("jobs");
        if (data) {
            const parsedData = JSON.parse(data);
            if (JSON.stringify(parsedData) !== JSON.stringify(jobs)) {
                setJobs(parsedData);
            }
        }
    }, [jobs]);
    

    const handleClick = () => {
        const newJob = {
            name: name,
            id: Math.floor(Math.random() * 9999999),
            status: false,
        };

        const updatedJobs = [...jobs, newJob];
        setJobs(updatedJobs);
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
        setName(""); 
    };

    return (
        <>
            <h2>Danh sách công việc</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
            <button onClick={handleClick}>Thêm</button>
            <Jobs jobs={jobs} />
            <p>Danh sách việc đã hoàn thành</p>
        </>
    );
}
