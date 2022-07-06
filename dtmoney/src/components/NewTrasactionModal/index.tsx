import Modal from 'react-modal'
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { ContainerForm, TransactionTypeContainer } from './styles';

//especificando onde o modal irá ser colocado, melhora acessibilidade
Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen,  onRequestClose }: NewTransactionModalProps ) {


  return(
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >
    <button 
      type='button' 
      onClick={onRequestClose}
      className="react-modal-close"
    >
      <img src={closeImg} alt="fechar modal" />
    </button>

    <ContainerForm>
      <h2>cadastrar transação</h2>

      <input 
        placeholder='Título'
      />

      <input 
        type='number'
        placeholder='Valor'
      />

      <TransactionTypeContainer>
        <button 
          type='button'
        >
          <img src={incomeImg} alt="entrada" />
          <span>Entrada</span>
        </button>

        <button 
          type='button'
        >
          <img src={outcomeImg} alt="Saída" />
          <span>Saída</span>
        </button>
      </TransactionTypeContainer>

      <input 
        placeholder='Categoria'
      />

      <button type='submit'>
        Cadastrar
      </button>

    </ContainerForm>
  </Modal>
  )
}