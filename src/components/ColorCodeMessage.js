const ColorCodeMessage = (props) => {
  return (
    <>
      It can be represented as :{" "}
      {props.OhmDenominatedValue +
        " " +
        props.OhmDenominatedLetter +
        " with Tolerance : " +
        props.Tolerance}
      {"%"}
    </>
  );
};

export default ColorCodeMessage;
