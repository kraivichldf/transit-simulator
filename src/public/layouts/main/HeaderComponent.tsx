import { Component } from "react";
import "./MainLayout.scss";
export default class HeaderComponent extends Component {
  render() {
    return (
      <div className="header">
        <nav>
          <ul>
            <li>
              <a href="/">Map</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}