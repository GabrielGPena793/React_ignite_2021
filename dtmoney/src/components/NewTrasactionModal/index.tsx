import { FormEvent, useState } from 'react';
import Modal from 'react-modal'

import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

import { ContainerForm, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

//especificando onde o modal irá ser colocado, melhora acessibilidade
Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen,  onRequestClose }: NewTransactionModalProps ) {

  const { createTransaction } = useTransactions();

  const [ type, setType ] = useState("deposit");
  const [ title, setTitle ] = useState('');
  const [ amount, setAmount ] = useState(0);
  const [ category, setCategory ] = useState("");


  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();
    
    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    onRequestClose()
    resetFields()
  }

  function resetFields(){
    setTitle("")
    setType("deposit")
    setAmount(0)
    setCategory("")
  }

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

    <ContainerForm onSubmit={handleCreateNewTransaction}>
      <h2>cadastrar transação</h2>

      <input 
        placeholder='Título'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <input 
        type='number'
        placeholder='Valor'
        value={amount}
        onChange={event => setAmount(Number(event.target.value))}
      />

      <TransactionTypeContainer>
        <RadioBox 
          type='button'
          onClick={() => setType("deposit")}
          isActive={type === "deposit"}
          activeColor="green"
        >
          <img src={incomeImg} alt="entrada" />
          <span>Entrada</span>
        </RadioBox>

        <RadioBox 
          type='button'
          onClick={() => setType("withdraw")}
          isActive={type === "withdraw"}
          activeColor="red"
        >
          <img src={outcomeImg} alt="Saída" />
          <span>Saída</span>
        </RadioBox>
      </TransactionTypeContainer>

      <input 
        placeholder='Categoria'
        value={category}
        onChange={event => setCategory(event.target.value)}
      />

      <button type='submit'>
        Cadastrar
      </button>

    </ContainerForm>
  </Modal>
  )
}