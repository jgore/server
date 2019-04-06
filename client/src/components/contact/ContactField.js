import React from 'react'


export default ({input, label, meta: {error, touched}}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '20px'}}/>
      <div className='red-text'>
        {touched && error}
      </div>
    </div>
  )
}