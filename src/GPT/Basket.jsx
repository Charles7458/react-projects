import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const FallingApplesGame = () => {
  const [apples, setApples] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [basketPosition, setBasketPosition] = useState(0);

  // Apple falling animation and collision detection
  useEffect(() => {
    let appleInterval, fallInterval;

    if (isPlaying) {
      // Interval to create a new apple every 1 second
      appleInterval = setInterval(() => {
        const newApple = {
          id: Date.now(),  // Unique ID
          x: Math.random() * (window.innerWidth - 30),  // Random horizontal position
          y: 0,  // Start at the top of the screen
          speed: 3 + Math.random() * 2,  // Random speed for falling apples
        };

        setApples((prevApples) => [...prevApples, newApple]);
      }, 1000);

      // Interval to make apples fall every 50ms
      fallInterval = setInterval(() => {
        setApples((prevApples) => {
          return prevApples
            .map((apple) => ({
              ...apple,
              y: apple.y + apple.speed,  // Increase y position to make apple fall
            }))
            .filter((apple) => apple.y < window.innerHeight);  // Remove apple if it goes off-screen
        });
      }, 50);
    }

    // Cleanup intervals when game stops
    return () => {
      clearInterval(appleInterval);
      clearInterval(fallInterval);
    };
  }, [isPlaying]);

  // Collision detection between basket and apples
  useEffect(() => {
    apples.forEach((apple) => {
      if (
        apple.y > window.innerHeight * 0.7 && // Basket's Y position is about 30% from the bottom
        apple.y < window.innerHeight * 0.8 &&  // This is the range where the basket is located
        apple.x > basketPosition - 50 &&  // Basket's left side (50px width offset)
        apple.x < basketPosition + 50  // Basket's right side (50px width offset)
      ) {
        setScore((prevScore) => prevScore + 1);  // Increment score when an apple is caught
        setApples((prevApples) => prevApples.filter((a) => a.id !== apple.id));  // Remove the apple that was caught
      }
    });
  }, [apples, basketPosition]);

  const handleDrag = (e, data) => {
    setBasketPosition(data.x);  // Update basket's x position as it is dragged
  };

  const handleStartGame = () => {
    setIsPlaying(true);  // Start the game
    setScore(0);  // Reset the score
    setApples([]);  // Clear existing apples
  };

  const handleStopGame = () => {
    setIsPlaying(false);  // Stop the game
    setApples([]);  // Clear apples when stopping
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Score Display */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: '24px',
          color: 'white',
        }}
      >
        Score: {score}
      </div>

      {/* Falling Apples */}
      {apples.map((apple) => (
        <div
          key={apple.id}
          style={{
            position: 'absolute',
            top: apple.y,
            left: apple.x,
            width: '30px',
            height: '30px',
            backgroundColor: 'red',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Draggable Basket */}
      {isPlaying && (
        <Draggable
          axis="x"  // Restrict drag to the x-axis only
          position={{ x: basketPosition, y: window.innerHeight * 0.7 }}  // Set basket at the correct vertical position
          onDrag={handleDrag}  // Track basket's x position during drag
          bounds={{ left: 0, right: window.innerWidth - 100 }}  // Restrict horizontal movement to within screen bounds
        >
          <div
            style={{
              width: '100px',
              height: '20px',
              backgroundColor: 'green',
              borderRadius: '5px',
              position: 'absolute',
              bottom: '30%',
              cursor: 'pointer',
            }}
          />
        </Draggable>
      )}

      {/* Play/Stop Button */}
      {!isPlaying ? (
        <div
          onClick={handleStartGame}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          Play
        </div>
      ) : (
        <div
          onClick={handleStopGame}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#F44336',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          Stop
        </div>
      )}
    </div>
  );
};

export default FallingApplesGame;
