import { useMemo, useState } from 'react';
import { uploadDocument } from '../api/storageService';
import { sendFax } from '../api/faxService';

const SendFaxPage = () => {
  const [file, setFile] = useState(null);
  const [targetNumber, setTargetNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fileName = useMemo(() => file?.name || 'فایلی انتخاب نشده است', [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !targetNumber.trim()) {
      setMessage({ type: 'error', text: 'لطفاً شماره مقصد و فایل را کامل کنید.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const fileId = await uploadDocument(file);

      const result = await sendFax({
        to: targetNumber.trim(),
        file_id: fileId,
        description: 'ارسال شده از پنل وب',
      });

      setMessage({
        type: 'success',
        text: `فکس با موفقیت در صف ارسال قرار گرفت. شناسه: ${result.value.fax.id}`,
      });
      setFile(null);
      setTargetNumber('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'خطا در ارسال فکس',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">ارسال فکس جدید</h1>
          <p className="mt-2 text-sm text-slate-500">
            شماره مقصد و فایل را وارد کنید تا فکس برای ارسال آماده شود.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
            <h2 className="text-base font-semibold text-slate-800">فرم ارسال فکس</h2>
            <p className="mt-1 text-sm text-slate-500">
              اطلاعات زیر را با دقت تکمیل کنید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-6">
            {message && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                  message.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="targetNumber" className="block text-sm font-medium text-slate-700">
                  شماره مقصد
                </label>
                <input
                  id="targetNumber"
                  type="text"
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(e.target.value)}
                  placeholder="مثلاً 02112345678"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-right text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">فایل فکس</span>

                <label className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-slate-400 hover:bg-slate-100">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-700">انتخاب فایل</div>
                    <div className="truncate text-xs text-slate-500">{fileName}</div>
                  </div>

                  <span className="shrink-0 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900">
                    مرور
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setTargetNumber('');
                  setMessage(null);
                }}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                پاک کردن فرم
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'در حال ارسال...' : 'ارسال فکس'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendFaxPage;
