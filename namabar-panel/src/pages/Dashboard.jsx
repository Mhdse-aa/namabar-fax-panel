export default function Dashboard() {
  return (
    <div className="app-layout">

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>پیشخوان</h1>
            <p>خوش آمدید. از این بخش می‌توانید وضعیت فکس‌ها را مدیریت کنید.</p>
          </div>
        </header>

        <section className="dashboard-grid">
          <div className="stat-card">
            <span>فکس‌های دریافتی</span>
            <strong>۰</strong>
          </div>

          <div className="stat-card">
            <span>فکس‌های ارسالی</span>
            <strong>۰</strong>
          </div>

          <div className="stat-card">
            <span>در انتظار ارسال</span>
            <strong>۰</strong>
          </div>
        </section>
      </main>
    </div>
  );
}
