// pages/index.tsx
import React, { Component } from 'react';
import Layout from '../components/Layout';

class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="card">
          <h2>Welcome to My Website</h2>
          <p>This is the homepage. Use the navigation above to browse.</p>
        </div>
      </Layout>
    );
  }
}

export default Home;
