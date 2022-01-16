import PropTypes from "prop-types";
import { ButtonStyled } from "./Button.styled";
const Button = ({ onClickButton }) => {
  return <ButtonStyled onClick={onClickButton}>Load more</ButtonStyled>;
};

Button.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default Button;
