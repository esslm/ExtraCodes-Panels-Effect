# Interactive Panel Effect Documentation

A modern, interactive panel layout with smooth highlight effects that follow mouse movement.

## Table of Contents

- [CSS Variables and Styling](#css-variables-and-styling)
- [Core Components](#core-components)
- [Usage Example](#usage-example)
- [How It Works](#how-it-works)
- [Key CSS Classes](#key-css-classes)
- [Project Structure](#project-structure)

## CSS Variables and Styling

Global CSS variables are defined in `App.css`:

```css
:root {
  --panel-gap: 1rem; /* Space between panels */
  --panel-padding: 2rem; /* Internal padding of panels */
  --panel-bg: #2a2a2a; /* Panel background color */
  --panel-radius: 0.5rem; /* Panel corner roundness */
  --panel-min-height: 10rem; /* Minimum panel height */
  --gradient-start: rgba(59, 130, 246, 0.1); /* Highlight gradient start */
  --gradient-end: rgba(147, 51, 234, 0.1); /* Highlight gradient end */
  --border-color: rgba(255, 255, 255, 0.1); /* Panel border color */
}
```

## Core Components

### PanelEffect Component

The main container managing the interactive highlight effect.

#### Key Features:

1. **Panel Size Management**

   - Automatically calculates panel sizes on mount and window resize
   - Uses `useRef` to maintain reference to container element
   - Updates panel dimensions dynamically

2. **Mouse Interaction**

   ```javascript
   const calculateDistance = (mouseX, mouseY, rect) => {
     // Calculates distance between mouse and panel centers
     // Used for determining highlight size and position
   };
   ```

3. **Highlight Effect**

   - Size interpolation based on distance:
     - Full size when mouse is close (< 50px)
     - Minimum size (40%) when far (> 200px)
     - Smooth interpolation between these values

4. **Event Handling**
   - `mousemove`: Updates highlight position
   - `mouseenter`: Shows highlight
   - `mouseleave`: Hides highlight
   - `resize`: Recalculates panel sizes

### Panel Layout

```javascript
{
  Array.isArray(children) ? (
    children.map((child, index) => (
      <div key={index} className="panel">
        {child}
      </div>
    ))
  ) : (
    <div className="panel">{children}</div>
  );
}
```

- Supports both single and multiple panels
- Automatically wraps content in panel containers
- Uses CSS Grid for responsive layout

## Usage Example

```javascript
function App() {
  return (
    <PanelEffect>
      {panelsData.map((panel) => (
        <Panel key={panel.id} title={panel.title} />
      ))}
    </PanelEffect>
  );
}
```

## How It Works

### 1. Initialization

- Component mounts and calculates initial panel sizes
- Sets up event listeners for mouse and window resize

### 2. Mouse Movement

- As user moves mouse, the component:
  - Calculates distances to all panels
  - Finds closest panel
  - Updates highlight size and position
  - Snaps to panel if close enough (< 50px)

### 3. Responsive Behavior

- Grid layout adjusts to screen size
- Panel sizes recalculate on window resize
- Highlight effect scales proportionally

### 4. Performance Considerations

- Uses `useRef` for DOM references
- Efficient distance calculations
- Smooth animations via CSS transitions

## Key CSS Classes

```css
.panel-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Grid layout for panels */
}

.floating-highlight {
  /* Animated highlight that follows mouse */
  position: absolute;
  pointer-events: none;
  transition: width 0.2s, height 0.2s;
}
```

## Project Structure

```
extracodes-panels-effect/
├── README.md
├── package.json
├── public/
│   ├── index.html
│   └── ...
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.jsx
    └── components/
        ├── index.jsx
        ├── Panel/
        │   ├── Panel.jsx
        │   └── Panel.css
        └── PanelEffect/
            ├── PanelEffect.jsx
            └── PanelEffect.css
```

### Key Files

- `src/App.jsx`: Main application component and panel data
- `src/App.css`: Global styles and CSS variables
- `src/components/Panel/Panel.jsx`: Individual panel component
- `src/components/PanelEffect/PanelEffect.jsx`: Interactive panel effect logic
- `src/components/index.jsx`: Component exports

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Esslam (61z.)
