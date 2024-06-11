import './App.css';
import Header from './components/header';

function App() {
  return (
    <div className="w-full p-8">
      <main>
        <h1 className="text-5xl font-bold text-main-purple px-8 my-8">
          Restaurant Reservation Viewer
        </h1>
        <section className="mx-auto my-8 px-12 w-1/2">
          <Header />
        </section>
        <section className="mx-auto my-8">
          <div></div>
        </section>
        <section className="mx-auto my-8">
          <aside></aside>
        </section>
      </main>
    </div>
  );
}

export default App;
