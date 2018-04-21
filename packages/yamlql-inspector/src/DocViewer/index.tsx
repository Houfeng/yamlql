import * as React from 'react';
import * as classNames from 'classnames';
import './index.less';

const DockPanel = require('react-dock-panel');

export interface IDocViewerProps {
  visible?: boolean;
}

export default class DocViewer extends React.Component<IDocViewerProps, any> {

  render() {
    const { visible } = this.props;
    const names = classNames('doc-viewer', { visible, hidden: !visible });
    return <DockPanel className={names}>
      <DockPanel dock="top" className="search-box">
        <input autoFocus={true} />
        <i className="fa fa-search"></i>
      </DockPanel>
      <DockPanel dock="fill" className="content-box">
        <ul>
          <li>xxxxxxx</li>
          <li>yyyyyyy</li>
        </ul>
      </DockPanel>
    </DockPanel>;
  }

}