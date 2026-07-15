import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Outbox() {
  const navigate = useNavigate();

  const [faxes, setFaxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const [search, setSearch] = useState('');


  const fetchSentFaxes = async () => {
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
            'filters[1][value]': 'outgoing',
            'filters[2][column_name]': 'archived_at',
            'filters[2][operand]': 'IsNull',
            'orders[0][column_name]': 'id',
            'orders[0][value]': 'desc',
            'orders[1][column_name]': 'id',
            'orders[1][value]': 'desc',
        },
        });


        setFaxes(response.data?.value?.data || []);
    } catch (error) {
        console.error('خطا در دریافت فکس‌های ارسالی:', error);
    } finally {
        setLoading(false);
    }
    };


  useEffect(() => {
    fetchSentFaxes();
    }, [page, count]);


  return (
    <div className="page-container">
      {/* نوار هشدار اتمام اعتبار */}
      <div className="alert-banner">
        <div className="alert-content">
          <span className="alert-icon">⚠️</span>
          <span className="alert-message">
            اعتبار بسته شما خاتمه یافته برای ارسال فکس می‌بایست بسته جدید خریداری فرمایید.
          </span>
        </div>
        <button className="btn-buy-package">خرید بسته جدید</button>
      </div>

      <div className="page-header">
        <div className="header-title-wrapper">
          <h1 className="page-title">فکس‌های ارسالی</h1>
          <p className="page-subtitle">لیست فکس‌های ارسالی شما</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-actions-sent">
          <div className="right-actions">
            <button onClick={fetchSentFaxes} className="btn-refresh" title="به‌روزرسانی">🔄</button>
            <button className="btn-delete-disabled" disabled>🗑️</button>
            <button 
                className="btn-send-fax"
                onClick={() => navigate('/faxes/send')}
                >
                ✉️ ارسال فکس
            </button>

          </div>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="جستجو (توضیحات)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>دریافت کننده</th>
                <th>وضعیت</th>
                <th>تعداد تلاش‌ها</th>
                <th>تعداد برگه</th>
                <th>ایجاد شده در</th>
                <th>ارسال شده در</th>
                <th>توضیحات</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">در حال بارگذاری...</td>
                </tr>
              ) : faxes.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data-text">داده‌ای موجود نیست</td>
                </tr>
              ) : (
                faxes.map((fax) => (
                  <tr key={fax.id}>
                    <td>{fax.receiver}</td>
                    <td>{fax.status}</td>
                    <td>{fax.attempts}</td>
                    <td>{fax.pages}</td>
                    <td>{new Date(fax.created_at).toLocaleDateString('fa-IR')}</td>
                    <td>{fax.sent_at ? new Date(fax.sent_at).toLocaleDateString('fa-IR') : '-'}</td>
                    <td>{fax.description || '-'}</td>
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
