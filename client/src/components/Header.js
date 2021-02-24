import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div id="main-header" className="w-100 position-absolute bg-gradient-info pb-8 pt-md-8">
        <section className="section section-hero section-shaped">
          <div className="shape shape-style-1">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
          </div>
        </section>
      </div>
    );
  }
}

export default Header;