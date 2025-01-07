import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5em',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            height: '40px',
            width: 'auto',
            marginRight: '10px',
          }}
        />
        <span
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Plan My Trip
        </span>
      </div>
      <Button>Sign In</Button>
    </div>
  )
}

export default Header
