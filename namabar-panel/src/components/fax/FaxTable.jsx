import PropTypes from 'prop-types';
import { formatTimestamp } from '../../utils/format';

export default function FaxTable({ title, items }) {
  return (
    <div className="table-card">
      <h2>{title}</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>نوع</th>
            <th>از</th>
            <th>به</th>
            <th>وضعیت</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          {items.map((fax) => (
            <tr key={fax.id}>
              <td>{fax.id}</td>
              <td>{fax.type === 'incoming' ? 'دریافتی' : 'ارسالی'}</td>
              <td>{fax.from || '-'}</td>
              <td>{fax.to || '-'}</td>
              <td>{fax.status || '-'}</td>
              <td>{formatTimestamp(fax.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FaxTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      status: PropTypes.string,
      created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
