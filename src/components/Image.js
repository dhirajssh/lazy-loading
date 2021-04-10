import React from 'react'

function Image({name}) {
  return (
    <div>
      <img src={`https://avatars.dicebear.com/api/male/${name}.svg?background=%230000ff`} style={{width:"100%", borderRadius:"20px"}} alt=""/>
    </div>
  )
}

export default Image
