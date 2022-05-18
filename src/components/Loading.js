import React from 'react'

const Loading = () => {
  return (
    <div style={{ position: "relative" }}>
        <h2 style={{ 
            position: "fixed", 
            top: "50%", 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            }}
            className="text-white text-2xl"
            >
                Loading...
        </h2>
    </div>
  )
}

export default Loading