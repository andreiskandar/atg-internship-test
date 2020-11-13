// import React from 'react';

// const Input = () => {
//   const onChange = (e) => {
//     dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
//   };

//   return (
//     <div>
//       <input name='wheelDiameter' onChange={onChange} value={state.wheelDiameter} placeholder='wheel diameter' />
//       <input
//         name='augerLength'
//         onChange={onChange}
//         value={state.augerLength}
//         placeholder='augerLength in ft max:25.7'
//       />
//       <label>
//         Diesel
//         <input type='radio' checked='checked' name='fuelType' value='Diesel' onChange={onChange}></input>
//         <span className='checkmark'></span>
//       </label>
//       <label>
//         Electric
//         <span className='checkmark'></span>
//         <input type='radio' name='fuelType' value='Electric' onChange={onChange}></input>
//       </label>
//       <button onClick={createSimulationReport}>Create Report</button>
//     </div>
//   );
// };

// export default Input;
