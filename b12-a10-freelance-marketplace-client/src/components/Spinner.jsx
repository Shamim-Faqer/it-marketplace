export default function Spinner({ fullScreen = false }) {
  return (
    <div className={fullScreen ? "spinner-wrap spinner-wrap-full" : "spinner-wrap"}>
      <div className="spinner" />
    </div>
  );
}
