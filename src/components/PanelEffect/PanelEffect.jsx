import { useEffect, useRef, useState } from 'react';
import './PanelEffect.css';

const PanelEffect = ({ children }) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updatePanelSize = () => {
      const panel = container.querySelector('.panel');
      if (panel) {
        const rect = panel.getBoundingClientRect();
        setPanelSize({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updatePanelSize();

    window.addEventListener('resize', updatePanelSize);

    const calculateDistance = (mouseX, mouseY, rect) => {
      const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
      const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const panels = container.getElementsByClassName('panel');
      let minDistance = Infinity;
      let closest = null;
      
      Array.from(panels).forEach(panel => {
        const panelRect = panel.getBoundingClientRect();
        const relativeRect = {
          left: panelRect.left - rect.left,
          right: panelRect.right - rect.left,
          top: panelRect.top - rect.top,
          bottom: panelRect.bottom - rect.top,
          width: panelRect.width,
          height: panelRect.height
        };
        
        const distance = calculateDistance(mouseX, mouseY, relativeRect);
        
        if (distance < minDistance) {
          minDistance = distance;
          closest = {
            distance,
            x: relativeRect.left + relativeRect.width / 2,
            y: relativeRect.top + relativeRect.height / 2,
            width: relativeRect.width,
            height: relativeRect.height
          };
        }
      });

      let size = panelSize;
      if (closest) {
        const maxDistance = 200; 
        const minSize = 0.4;
        
       
        const sizeMultiplier = closest.distance < 50 ? 1 :
          closest.distance > maxDistance ? minSize : 
          minSize + (1 - minSize) * (1 - (closest.distance - 50) / (maxDistance - 50)); // Interpolate

        size = {
          width: closest.width * sizeMultiplier,
          height: closest.height * sizeMultiplier
        };
      }

      if (closest && closest.distance < 50) {
        setMousePosition({
          x: closest.x,
          y: closest.y,
          width: size.width,
          height: size.height,
          snapped: true
        });
      } else {
        setMousePosition({
          x: mouseX,
          y: mouseY,
          width: size.width,
          height: size.height,
          snapped: false
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', updatePanelSize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [panelSize]);

  return (
    <div className="panel-container" ref={containerRef}>
      {isHovering && (
        <div 
          className={`floating-highlight ${mousePosition.snapped ? 'snapped' : ''}`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: `${mousePosition.width * 0.95}px`,
            height: `${mousePosition.height * 0.95}px`,
          }}
        />
      )}
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div key={index} className="panel">
              {child}
            </div>
          ))
        : <div className="panel">
            {children}
          </div>
      }
    </div>
  );
};

export default PanelEffect;
