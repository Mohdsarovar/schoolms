import React from 'react'
let dateFormate={}

dateFormate.Userdob = ({dob}) => {
    const formattedDob = new Date(dob).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  return <td>{formattedDob}</td>
}

export default dateFormate