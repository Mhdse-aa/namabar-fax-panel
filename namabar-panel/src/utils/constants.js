export const ROUTES = {
  login: '/signin',
  dashboard: '/',
  inbox: '/faxes/inbox',
  outbox: '/faxes/sent',
  sendFax: '/faxes/send',
};

export const FAX_STATUS = {
  waiting_to_send: 'در صف ارسال',
  sending: 'در حال ارسال',
  delivered: 'تحویل شده',
  failed: 'ناموفق',
  archived: 'بایگانی شده',
};

export const FAX_TYPE = {
  incoming: 'دریافتی',
  outgoing: 'ارسالی',
};
