import '../css/components/Box.css'
export default function Box(props) {
  // console.log(props.freeze)
  return (
    // <div className={'box' + props.selected ? 'selected' : ''}>

    <div
      className={'box ' + (props.freeze === true ? 'freeze' : '')}
      onClick={() => props.handelFreeze(props.id)}
    >
      {props.num}
    </div>
  )
}
