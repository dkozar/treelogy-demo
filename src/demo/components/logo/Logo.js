import React, { Component } from "react";
import "./Logo.css";

export default class Logo extends Component {
  render() {
    return (
      <div className="flex-parent-centered transparent-for-clicks">
        <div className="logo">
          <div className="logo-title">Treelogy</div>
          <div className="logo-subtitle">[ demo app ]</div>
        </div>
      </div>
    );
  }
}
