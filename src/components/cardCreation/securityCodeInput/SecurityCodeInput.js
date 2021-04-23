import { COLOR } from '../../../constants/color';
import { TransparentInput } from '../../commons/input/TransparentInput';
import Styled from './SecurityCodeInput.style';

const SecurityCodeInput = () => (
  <>
    <Styled.InputLabelContainer>보안 코드(CVC/CVV)</Styled.InputLabelContainer>
    <Styled.InputContainer>
      <TransparentInput
        color={COLOR.MINT}
        type="password"
        minLength="3"
        maxLength="3"
        textAlign="center"
        fontSize="30px"
      />
    </Styled.InputContainer>
  </>
);

export default SecurityCodeInput;