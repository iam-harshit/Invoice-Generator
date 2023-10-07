import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearInvoices } from "../utils/invoiceSlice";
import InvoiceModal from "./InvoiceModal";
import { Link, useNavigate } from "react-router-dom";
import {
  setInvoiceToEdit,
  deleteInvoices,
  setInvoiceToView,
  clearInvoiceToView,
  copyInvoice,
} from "../utils/invoiceSlice";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import noDataFound from "../asset/no-data-found.png";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineCopy } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Invoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceItems = useSelector((state) => state.invoice.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const invoiceToView = useSelector((state) => state.invoice.invoiceToView);

  const renderTooltip = (props) => <Tooltip {...props}>{props}</Tooltip>;

  const clearInvoiceHandler = () => {
    dispatch(clearInvoices());
  };

  const copyInvoiceHandler = (invoiceNumber) => {
    dispatch(copyInvoice(invoiceNumber));
  };

  const viewInvoice = (invoice) => {
    dispatch(setInvoiceToView(invoice));
    setIsModalOpen(true);
  };

  const deleteInvoiceHandler = (invoiceNumber) => {
    dispatch(deleteInvoices(invoiceNumber));
  };

  return (
    <div className="w-full md:w-8/12 lg:w-6/12 m-auto mt-10 pb-10 ">
      <Row className="mx-4 mb-4 align-items-center">
        <Col>
          <h1 className="font-bold text-xl md:text-2xl">List of Invoices</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={clearInvoiceHandler}
            className="mb-3 mr-6 me-4"
          >
            Clear all invoices
          </Button>
          <Link to="/invoice-form" className="btn btn-primary mb-3 mr-2">
            + Create an invoice
          </Link>
        </Col>
      </Row>

      {invoiceItems.length === 0 ? (
        <div className="text-center p-4">
          <img
            src={noDataFound}
            alt="No data found"
            className="img-fluid custom-img md:w-8/12 m-auto"
          />
        </div>
      ) : (
        <ListGroup variant="flush">
          {invoiceItems.map((item) => (
            <ListGroup.Item key={item?.invoiceNumber}>
              <Row>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center"
                ></Col>
                <Col xs={8}>
                  <div
                    variant="link"
                    className="invoice-text"
                    onClick={() => {
                      setSelectedInvoice(item);
                      setIsModalOpen(true);
                    }}
                  >
                    Invoice #{item?.invoiceNumber}
                  </div>
                  <span className="sub-text">
                    Total amount - ${item?.total}
                  </span>
                </Col>
                <Col xs={2} className="d-flex justify-content-end">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("View")}
                  >
                    <Button
                      variant="link"
                      className="p-0 icon-btn"
                      onClick={() => viewInvoice(item)}
                    >
                      <LuEye className="icon-style" size="1.5rem" />
                    </Button>
                  </OverlayTrigger>
                  &nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Copy")}
                  >
                    <Button
                      variant="link"
                      className="p-0 icon-btn"
                      onClick={() => copyInvoiceHandler(item.invoiceNumber)}
                    >
                      <AiOutlineCopy className="icon-style" size="1.5rem" />
                    </Button>
                  </OverlayTrigger>
                  &nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Edit")}
                  >
                    <Button
                      variant="link"
                      className="p-0 icon-btn"
                      onClick={() => {
                        dispatch(setInvoiceToEdit(item));
                        navigate("/invoice-form");
                      }}
                    >
                      <BiEdit className="icon-style" size="1.5rem" />
                    </Button>
                  </OverlayTrigger>
                  &nbsp;
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Delete")}
                  >
                    <Button
                      variant="link"
                      className="p-0 icon-btn"
                      onClick={() => deleteInvoiceHandler(item.invoiceNumber)}
                    >
                      <AiOutlineDelete className="icon-style" size="1.5rem" />
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {invoiceToView && (
        <InvoiceModal
          showModal={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
            dispatch(clearInvoiceToView());
          }}
          info={invoiceToView}
          items={invoiceToView.items}
          currency={invoiceToView.currency}
          subTotal={invoiceToView.subTotal}
          taxAmmount={invoiceToView.taxAmmount}
          discountAmmount={invoiceToView.discountAmmount}
          total={invoiceToView.total}
        />
      )}
    </div>
  );
};

export default Invoice;
