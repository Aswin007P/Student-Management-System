export default function LoadingSpinner() {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
         style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 9999 }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}