import React from 'react';
import '../css/Control.css'
function Control() {
    return (
        <div>
            <aside className="control-sidebar control-sidebar-dark control-box">
                <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
                    <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home"></i></a></li>
                    <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears"></i></a></li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
                    <div className="tab-pane" id="control-sidebar-home-tab">
                        
                    </div>
                    <div className="tab-pane" id="control-sidebar-settings-tab">
                        
                    </div>
                </div>
            </aside>
            <div className="control-sidebar-bg"></div>
        </div>
    );
}

export default Control;
