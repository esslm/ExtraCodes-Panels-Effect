import {Panel, PanelEffect} from './components';
import './App.css';

const panelsData = [
  {
    id: 1,
    title: 'This',
  },
  {
    id: 2,
    title: 'Created',
  },{
    id: 3,
    title: 'By',
  },{
    id: 4,
    title: 'Esslam',
  },{
    id: 5,
    title: '61z.',
  },{
    id: 6,
    title: 'From',
  },{
    id: 7,
    title: 'ExtraCodes',
  },{
    id: 8,
    title: 'Concept',
  },{
    id: 9,
    title: 'For',
  },{
    id: 10,
    title: '3LAWI',
  }
];

const App = () => {
  return (
    <div className="App">
      <PanelEffect>
        {panelsData.map(panel => (
          <Panel
            key={panel.id}
            title={panel.title}
          />
        ))}
      </PanelEffect>
    </div>
  );
};

export default App;
