import "./Settings.css";

const Settings = ({ settings, onSettingsChange }) => {
  const cardCounts = [4, 16, 32];
  const backgrounds = ["#ecf0f1", "#d5e4f1", "#f9d5d5", "#d5f9e4"];

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="setting-section">
        <h3>Number of Cards</h3>
        <div className="card-options">
          {cardCounts.map((count) => (
            <button
              key={count}
              onClick={() =>
                onSettingsChange({ ...settings, cardCount: count })
              }
              className={`option-button ${
                settings.cardCount === count ? "active" : ""
              }`}
            >
              {count} cards
            </button>
          ))}
        </div>
      </div>

      <div className="setting-section">
        <h3>Background Color</h3>
        <div className="color-options">
          {backgrounds.map((color) => (
            <button
              key={color}
              onClick={() =>
                onSettingsChange({ ...settings, background: color })
              }
              className={`color-button ${
                settings.background === color ? "active" : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
