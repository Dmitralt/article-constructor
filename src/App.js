import React from 'react';
import ArticleConstructor from './components/ArticleConstructor';
import './App.css';

function App() {
  return (
    <div className="App" data-testid="article-constructor">
      <h1>Articles constructor</h1>
      <ArticleConstructor />
    </div>
  );
}

export default App;

