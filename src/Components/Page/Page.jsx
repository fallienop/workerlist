import React, { useState, useEffect } from 'react';
import style from './Page.module.css';

const Page = () => {
  const [workerData, setWorkerData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [departmentData, setDepartmentData] = useState('');
  const [selectedData, setSpecificData] = useState([]);

  useEffect(() => {
    const getDataPromise = async () => {
      try {
        const response = await fetch('https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood');
        const data = await response.json();
        setWorkerData(data);
        setSpecificData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getDataPromise();
  }, []);

  useEffect(() => {
    let workers = workerData.filter((x) => x.name.toLowerCase().includes(searchData.toLowerCase()));

    workers = workers.filter((x) => {
      if (departmentData === '') {
        return true;
      } else {
        return x.department === departmentData;
      }
    });

    setSpecificData(workers);
  }, [searchData, departmentData, workerData]);

  const selectEditor = (e) => {
    if (e.target.value === 'all') {
      e.target.value = '';
    }
    setDepartmentData(e.target.value);
  };

  const searchEngine = (e) => {
    let value = e.target.value;
    setSearchData(value);
  };

  return (
    <div className={style.main}>
      <h1>Workers</h1>

      <input onChange={searchEngine} type="text" />

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>
              <select onChange={selectEditor} name="department" id="department">
                <option value="" hidden>
                  Departments
                </option>
                <option value="all">All</option>
                <option value="Management">Management</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Security">Security</option>
              </select>
            </th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>{worker.department}</td>
              <td>{worker.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
