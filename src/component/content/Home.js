import React from 'react';
import TaskDash from './witget/TaskDash'
import ProjectDash from './witget/ProjectDash'
import TaskTable from './witget/TaskTable'
import ProjectTable from './witget/ProjectTable'
function Home() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <TaskDash />
        </div>
        <div className="col-md-6">
          <ProjectDash />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TaskTable />
        </div>
        <div className="col-md-6">
          <ProjectTable />
        </div>
      </div>
    </div>

  );
}

export default Home;
