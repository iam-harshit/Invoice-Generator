import { useNavigate, useLocation } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';

function InvoiceFormWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  return <InvoiceForm navigate={navigate} location={location} />;
}

export default InvoiceFormWrapper;
