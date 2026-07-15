import { useState, useEffect } from 'react';
import api from '../api/client';

export default function Inbox() {
  const [faxes, setFaxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);

  const fetchInboxFaxes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/faxes', {
        params: {
            page,
            count,
            'filters[0][column_name]': 'fax_broadcast_id',
            'filters[0][operand]': 'IsNull',
            'filters[1][column_name]': 'type',
            'filters[1][operand]': 'IsEqualTo',
            'filters[1][value]': 'incoming',
            'filters[2][column_name]': 'archived_at',
            'filters[2][operand]': 'IsNull',
            'orders[0][column_name]': 'id',
            'orders[0][value]': 'desc',
            'orders[1][column_name]': 'id',
            'orders[1][value]': 'desc',
        },
        });


      if (response.data && response.data.value) {
        setFaxes(response.data.value.data || []);
      }
    } catch (error) {
      console.error('خطا در دریافت فکس‌های دریافتی:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInboxFaxes();
  }, [page, count]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <h1 className="page-title">فکس‌های دریافتی</h1>
          <p className="page-subtitle">لیست فکس‌های ارسال شده به شما</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-actions">
          <button onClick={fetchInboxFaxes} className="btn-refresh" title="به‌روزرسانی">
            🔄
          </button>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ارسال کننده</th>
                <th>دریافت کننده</th>
                <th>ایجاد شده در</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">در حال بارگذاری...</td>
                </tr>
              ) : faxes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data-text">داده‌ای موجود نیست</td>
                </tr>
              ) : (
                faxes.map((fax) => (
                  <tr key={fax.id}>
                    <td>{fax.sender}</td>
                    <td>{fax.receiver}</td>
                    <td>{new Date(fax.created_at).toLocaleDateString('fa-IR')}</td>
                    <td>
                      <span className={`status-badge ${fax.status}`}>
                        {fax.status_text || fax.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-action">مشاهده</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* صفحه‌بندی (Pagination) */}
        <div className="table-pagination">
          <div className="pagination-arrows">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              className="page-btn"
            >
              ◀
            </button>
            <span className="page-number">{page}</span>
            <button 
              onClick={() => setPage(p => p + 1)}
              className="page-btn"
            >
              ▶
            </button>
          </div>
          <div className="pagination-rows">
            <span>ردیف در صفحه:</span>
            <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
              <option value={5}>۵</option>
              <option value={10}>۱۰</option>
              <option value={20}>۲۰</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
