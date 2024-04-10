import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import {
    useMaterialReactTable,
    MaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";

// Estilos para los elementos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  /* Aquí puedes agregar tus estilos para el botón */
`;



export default function FacturaModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  

  return (
    <div>
      <Button onClick={openModal}>Abrir factura</Button>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <Container>
          <h2>Factura 1</h2>
          <p>Nombre: Andres</p>
          <p>Cédula: XXXXXXXX</p>
          <div>
            
          </div>
          <div>/* Aquí puedes renderizar la lista de pagos */</div>
          <p>Estado: Facturado</p>
          <Button onClick={() => { /* Aquí puedes manejar la anulación de la factura */ }}>Anular</Button>
          <p>SubImpuesto: XXXX</p>
          <p>Impuesto: XXXX</p>
          <p>Total: XXXX</p>
        </Container>
      </Modal>
    </div>
  );
}
