import React from "react"

type Props = {
    value:string,
  
}
const Heading :React.FC<Props>= ({
    value,

}) => {
  return (
    <h1 className={` text-4xl my-10 text-white font-bold`}>{value}</h1>
  )
}

export default Heading