import { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { FunctionGetTransactions } from "../../redux/features/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";
import "./TableData.scss";

const TableDatas = () => {
  const dispatch = useDispatch();

  const transactionsData = useSelector(
    (state) => state.transaction.transactionsData
  );

  useEffect(() => {
    dispatch(FunctionGetTransactions());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState(null);

  const handleShowModal = (transaction) => {
    setDetailTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="titleHistoryTransaction">History Transaction</h1>
      <Table className="tableTransaction" striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactionsData?.length > 0 ? (
            transactionsData?.map((transaction, i) => (
              <tr key={i}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {i + 1}
                </td>
                <td style={{ textAlign: "start", verticalAlign: "middle" }}>
                  {transaction?.items.map((item, index) => (
                    <p key={index} className="d-inline">
                      {item?.title} ({item?.quantity}),{" "}
                    </p>
                  ))}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  {transaction?.totalPrice}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <Button onClick={() => handleShowModal(transaction)}>
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">"Data not found"</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" id="modalDetailTransaction">
        <Modal.Header closeButton>
          <Modal.Title>Detail Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailTransaction && (
            <Table striped bordered hover style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>
                    {detailTransaction?.items.map((item, index) => (
                      <p key={index} className="d-inline">
                        {item?.title},{" "}
                      </p>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Total Price:</td>
                  <td>${detailTransaction.totalPrice}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TableDatas;
