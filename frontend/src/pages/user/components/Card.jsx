export default function Card({ title, sub, onClick }) {
    return (
      <div className="card" onClick={onClick}>
        <h3>{title}</h3>
        <p>{sub}</p>
      </div>
    );
  }