import PropTypes from 'prop-types';
import { memo, useRef, useEffect, useState } from 'react';
import { COLOR } from '../../../constants/color';
import { FIRST, SECOND, THIRD, FOURTH } from '../../../constants/inputName';
import { TransparentInput } from '../../commons/input/TransparentInput';
import CardSelectionModal from '../cardSelectionModal/CardSelectionModal';
import Styled from './CardNumberInput.style';

const transparentInputStyles = {
  [FIRST]: {
    color: COLOR.MINT,
    paddingLeft: '14%',
    textAlign: 'center',
    width: '32%',
  },
  [SECOND]: {
    color: COLOR.MINT,
    textAlign: 'center',
    width: '18%',
  },
  [THIRD]: {
    color: COLOR.MINT,
    textAlign: 'center',
    width: '18%',
    fontSize: '24px',
  },
  [FOURTH]: {
    color: COLOR.MINT,
    paddingRight: '14%',
    textAlign: 'center',
    width: '32%',
    fontSize: '24px',
  },
};

const FULL_INPUT_LENGTH = 4;

const isValidCardNumberInput = cardNumber => {
  return Object.values(cardNumber).every(cardNumber => cardNumber.length === FULL_INPUT_LENGTH && !isNaN(cardNumber));
};

const CardNumberInput = memo(
  ({ cardNumber, selectedCardInfo, setCardNumber, isValidCardNumber, setValidCardNumber, setSelectedCardInfo }) => {
    const [isModalOpened, setModalOpen] = useState(false);

    const $secondInput = useRef(null);
    const $ThirdInput = useRef(null);
    const $FourthInput = useRef(null);

    const isSelectedCardInfo = !!selectedCardInfo.id;

    useEffect(() => {
      const isValidInput = isValidCardNumberInput(cardNumber) && isSelectedCardInfo;
      setValidCardNumber(isValidInput);
    }, [setValidCardNumber, cardNumber, isSelectedCardInfo]);

    useEffect(() => {
      if (isSelectedCardInfo) {
        $ThirdInput.current.disabled = false;
        $ThirdInput.current.focus();
      }
    }, [isSelectedCardInfo]);

    const handleInputChange = ({ target }) => {
      if (target.value.length > FULL_INPUT_LENGTH) return;

      setCardNumber(prevState => ({ ...prevState, [target.name]: target.value }));

      if (target.value.length !== FULL_INPUT_LENGTH) return;

      if (target.name === FIRST) {
        $secondInput.current.disabled = false;
        $secondInput.current.focus();

        return;
      }

      if (target.name === SECOND) {
        setModalOpen(true);

        return;
      }

      if (target.name === THIRD) {
        $FourthInput.current.disabled = false;
        $FourthInput.current.focus();
      }
    };

    const handleInputClick = () => {
      cardNumber[FIRST].length === FULL_INPUT_LENGTH &&
        cardNumber[SECOND].length === FULL_INPUT_LENGTH &&
        !isSelectedCardInfo &&
        setModalOpen(true);
    };

    return (
      <>
        <div>
          <Styled.InputLabelContainer>?????? ?????? {isValidCardNumber && '??????'}</Styled.InputLabelContainer>
          <Styled.InputContainer isValidInput={isValidCardNumber} onClick={handleInputClick}>
            <TransparentInput
              name={FIRST}
              type="number"
              min="0"
              max="9999"
              value={cardNumber[FIRST]}
              onChange={handleInputChange}
              styles={transparentInputStyles[FIRST]}
              autoFocus
            />
            {cardNumber[FIRST].length === FULL_INPUT_LENGTH && <Styled.Dash>-</Styled.Dash>}
            <TransparentInput
              name={SECOND}
              type="number"
              min="0"
              max="9999"
              value={cardNumber[SECOND]}
              onChange={handleInputChange}
              innerRef={$secondInput}
              styles={transparentInputStyles[SECOND]}
              disabled
            />
            {cardNumber[SECOND].length === FULL_INPUT_LENGTH && <Styled.Dash>-</Styled.Dash>}
            <TransparentInput
              name={THIRD}
              type="password"
              minLength={FULL_INPUT_LENGTH}
              maxLength={FULL_INPUT_LENGTH}
              value={cardNumber[THIRD]}
              onChange={handleInputChange}
              innerRef={$ThirdInput}
              styles={transparentInputStyles[THIRD]}
              disabled
            />
            {cardNumber[THIRD].length === FULL_INPUT_LENGTH && <Styled.Dash>-</Styled.Dash>}
            <TransparentInput
              name={FOURTH}
              type="password"
              minLength={FULL_INPUT_LENGTH}
              maxLength={FULL_INPUT_LENGTH}
              value={cardNumber[FOURTH]}
              onChange={handleInputChange}
              innerRef={$FourthInput}
              styles={transparentInputStyles[FOURTH]}
              disabled
            />
          </Styled.InputContainer>
        </div>
        {isModalOpened && (
          <CardSelectionModal closeModal={() => setModalOpen(false)} setSelectedCardInfo={setSelectedCardInfo} />
        )}
      </>
    );
  }
);

CardNumberInput.defaultProps = {
  cardNumber: { [FIRST]: '', [SECOND]: '', [THIRD]: '', [FOURTH]: '' },
  selectedCardInfo: { id: null, name: '', color: COLOR.LIGHT_GRAY },
  isValidCardNumber: false,
};

CardNumberInput.propTypes = {
  cardNumber: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedCardInfo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf([null])]),
    name: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  setCardNumber: PropTypes.func.isRequired,
  isValidCardNumber: PropTypes.bool.isRequired,
  setValidCardNumber: PropTypes.func.isRequired,
  setSelectedCardInfo: PropTypes.func.isRequired,
};

export default CardNumberInput;
