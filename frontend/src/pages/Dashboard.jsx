import React from 'react';
import QueryPage from "../components/QueryPage";
import ExplainPage from '../components/ExplainPage';
import ValidatePage from '../components/ValidatePage';

const Dashboard = () => {
  return (
    <>
    <div className="flex flex-col gap-5 justify-center items-center m-10">
        <div className="my-5">
            <h1 className="text-primary text-3xl">Dashboard</h1>
        </div>
        <div className="tabs tabs-border justify-center">
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Query" />
            <div className="tab-content border-base-300 bg-base-100 p-10"><QueryPage /></div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Explain" defaultChecked />
            <div className="tab-content border-base-300 bg-base-100 p-10"><ExplainPage /></div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Validate" />
            <div className="tab-content border-base-300 bg-base-100 p-10"><ValidatePage /></div>
        </div>
    </div>
    </>
  );
}

export default Dashboard